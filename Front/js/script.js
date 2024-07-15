const URL = "https://localhost:44344/api/UsersLogins?userName=fclarat&password=test"

const myHeaders = new Headers();

function login() {
    var username = document.getElementById('nombre').value
    var password = document.getElementById('password').value
    var urlLogin = 'https://localhost:44344/api/UsersLogins?userName=' + username + '&password=' + password
    fetch(urlLogin, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            if (data.token != undefined) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", data.userName)
                window.location.replace('abm.html');
            } else {
                document.getElementById('campoDeError').innerHTML = "El usuario o la contraseña son incorrectas"
            }
        })
        .catch(error => console.log(error))
}

var tokensaved = localStorage.getItem("token")
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', 'tokensaved');

function create() {
    var urlCreate = 'https://localhost:44344/api/UsersLogins/createUser'
    var rol = document.getElementById('rol-names').value
    var userName = document.getElementById('nombre').value
    var password = document.getElementById('password').value
    var tokensaved = localStorage.getItem("token")

    if (rol == 'admin') {
        rol = 1;
    } else {
        rol = 2;
    }

    let formData = new FormData();
    formData.append('rol', rol);
    formData.append('userName', userName);
    formData.append('password', password);

    fetch(urlCreate, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + tokensaved
            },
            body: formData
        }).then(Response => Response.json())
        .then(
            data => {
                document.getElementById('result').innerHTML = 'Usuario creado';
            }
        )
        .catch((error) => {
            document.getElementById('result').innerHTML = 'Usuario sin permisos';
        });
}

function Update(id, rol) {
    var urlUpdate = 'https://localhost:44344/api/UsersLogins/editUser/' + id
    var tokensaved = localStorage.getItem("token")

    if (rol == 1) {
        rol = 2
    } else {
        rol = 1
    }

    let formData = new FormData();
    formData.append('rol', rol);

    fetch(urlUpdate, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + tokensaved
            },
            body: formData
        }).then(Response => Response.json())
        .then(
            data => {
                getall();
            }
        )
        .catch((error) => {
            document.getElementById('result').innerHTML = 'Usuario sin permisos';
        });
}

function Delete(id) {
    var urlDelete = 'https://localhost:44344/api/UsersLogins/deleteUser/' + id
    var tokensaved = localStorage.getItem("token")

    fetch(urlDelete, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + tokensaved
            }
        })
        .then(Response => Response.json())
        .then(
            data => {
                getall();
            }
        ).catch((error) => {
            document.getElementById('result').innerHTML = 'Usuario sin permisos';
        });
}

function getall() {
    var urlgetAll = 'https://localhost:44344/api/UsersLogins/GetAllUsers'
    var tokensaved = localStorage.getItem("token")

    fetch(urlgetAll, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokensaved
            }
        })
        .then(Response => Response.json())
        .then(
            data => {
                document.getElementById('result').innerHTML = '';
                testJson = data;
                var fila = '<table class="table"><tr><th>Usuario</th><th>Rol</th><th>intercambiar rol</th><th>Borrar</th>';
                for (let index = 0; index < testJson.length; index++) {
                    if (testJson[index].userPriviliges[0] != undefined) { // if rol == 1???
                        fila += '<tr>' + '<td>' + testJson[index].userName + '</td>';
                        if (testJson[index].userPriviliges[0].privilegeId == 1) {
                            fila += '<td> Admin </td>';
                        } else {
                            fila += '<td> Usuario </td>';
                        }
                        fila += ' <td class="intercambiar"  OnClick="Update(' + testJson[index].id + ', ' + testJson[index].userPriviliges[0].privilegeId + ')" ><img src="images/editar.png" alt="editar" /></td> ';
                        fila += ' <td class="borrar" OnClick="Delete(' + testJson[index].id + ')"><img src="images/borrar.png" alt="borrar" /> </td> </tr>';
                    }
                }
                fila += '</table>'
                document.getElementById('container').innerHTML = fila;
                document.getElementById('container').style.backgroundColor = '#28d';
                document.getElementById('container').style.border = 'solid 10px';
            }
        )
}

function getallartic() {
    var urlgetAll = 'https://localhost:44344/api/UsersLogins/GetAllArticulos';
    var tokensaved = localStorage.getItem("token");

    fetch(urlgetAll, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + tokensaved
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerHTML = '';
            if (Array.isArray(data) && data.length > 0) {
                let tableContent = '<table class="table"><tr><th>ID</th><th>Articulo</th><th>Description</th><th>Editar</th><th>Borrar</th></tr>';
                data.forEach(item => {
                    tableContent += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.description}</td>
                        <td class="intercambiar" OnClick="Update(${item.ID})">
                            <img src="images/editar.png" alt="editar" />
                        </td>
                        <td class="borrar" OnClick="Delete(${item.ID})">
                            <img src="images/borrar.png" alt="borrar" />
                        </td>
                    </tr>
                `;
                });
                tableContent += '</table>';
                document.getElementById('container').innerHTML = tableContent;
                document.getElementById('container').style.backgroundColor = '#28d';
                document.getElementById('container').style.border = 'solid 10px';
            } else {
                document.getElementById('container').innerHTML = '<p>No articles found</p>';
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function createartic() {
    var urlCreate = 'https://localhost:44344/api/UsersLogins/createArticulo'
    var Name = document.getElementById('name').value
    var description = document.getElementById('description').value
    var tokensaved = localStorage.getItem("token")

    let formData = new FormData();
    formData.append('name', Name);
    formData.append('description', description);

    fetch(urlCreate, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + tokensaved
            },
            body: formData
        }).then(Response => Response.json())
        .then(
            data => {
                document.getElementById('result').innerHTML = 'Articulo creado';
            }
        )
        .catch((error) => {
            document.getElementById('result').innerText = 'Usuario sin permisos';
        });
}