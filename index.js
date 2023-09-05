var URL = `https://reqres.in/api/users`;
const btnCreate = document.getElementById("btnCreate");
const btnUpdate = document.getElementById("btnUpdate");
const btnCancel = document.getElementById("btnCancel");

const getComment = async () => {
    const response = await fetch('https://reqres.in/api/users');
    const data = await response.json();
    console.log(response);
    console.log(data.data);
    let users = "";
    Object.entries(data.data).forEach(([key, data]) => {
      users += `
      <div class="col-md-3 col-12 mb-2">
        <img src="${data.avatar}">
      </div>
      <div class="col-md-9 col-12 mb-2">
        <p class="fw-bold text-primary" style="font-size: 13px; margin-bottom: 1px;">
        ${data.first_name + ' '+ data.last_name}</p>
        <p style=" margin-bottom: 1px;">${data.email}</p>
        <button type="button" onclick="getById(${
            data.id
        })" class="btn bg-warning btn-circle "><i class="fa-solid fa-pen-to-square"></i></button>
        <button type="button" onclick="deleteComment(${data.id})" class="btn bg-danger text-white btn-circle "><i class="fa-solid fa-trash"></i></button>
      </div>
            
            <hr>
        `;
    });
    document.getElementById("users").innerHTML = users;
  };

$("#btnCreate").click(function (e) {
    e.preventDefault();
  
    const userData = {
        name: $("#name").val(),
        job: $("#job").val(),
    };
  
    fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al registrar");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        Swal.fire('Registro exitoso!');
        getComment();
        cleanForm();
      })
      .catch((error) => {
        Swal.fire('Error al registrar');
      });
  });

  const getById = async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`);
    const data = await response.json();
    console.log(response);
    console.log(data);
  
    $("#name").val(data.data.first_name);
    $("#job").val(data.data.job);
    $("#id").val(data.data.id);
  
    btnCreate.style.display = 'none';
    btnUpdate.style.visibility = 'visible';
    btnCancel.style.visibility = 'visible';
  };

  $("#btnUpdate").click(function (e) {
    e.preventDefault();
    Swal.fire({
      title: 'Seguro que quieres modificar el usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Modificar',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "PUT",
          url: "https://reqres.in/api/users/2" + $("#id").val(),
          contentType: "application/json",
          data: JSON.stringify({
            title: $("#name").val(),
            description: $("#job").val(),
          }),
        })
          .done(function (response) {
            console.log(response);
            getComment();
            cleanForm();
            cancel();
          })
          .fail(function (jqXHR, textStatus) {
            alert("Error");
          });
        Swal.fire('Modicado!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('No se modificó', '', 'info')
      }
    })
  
    
  });

  const cleanForm = () => {
    $("#name").val(''),
    $("#job").val('')
  };
  

  getComment()