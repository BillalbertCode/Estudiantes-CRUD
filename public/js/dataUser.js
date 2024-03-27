const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let dataUser
const materiasOutput = document.getElementById('usuMaterias');
fetch(`http://localhost:3000/estudiantes/${id}`)
    .then(response => response.json())
    .then(result => {
        dataUser = result
        console.log(dataUser.nombre)
        document.getElementById("usu").textContent = dataUser.nombre
        document.getElementById("usuId").textContent = dataUser.id
        document.getElementById("usuNombre").textContent = dataUser.nombre
        document.getElementById("usuApellido").textContent = dataUser.apellido
        document.getElementById("usuCedula").textContent = dataUser.cedula
        document.getElementById("usuCorreo").textContent = dataUser.email
        document.getElementById("usuSeccion").textContent = dataUser.seccion
        if (dataUser.materias == undefined || dataUser.materias.length <= 0) {
            materiasOutput.innerHTML = '<p class="text-center text-muted">El usuario no tiene materias</p>';
        }
        else {
            materiasOutput.innerHTML = '';
            dataUser.materias.forEach(materia => {
                materiasOutput.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-2">
                        <div class="card-body p-2">
                            <p class="card-text"><strong>Nombre:</strong><br/>  ${materia.nombre}</p>
                            <p class="card-text"><strong>Nota:</strong> <br/> ${materia.nota}</p>
                            <p class="card-text"><strong>Profesor:</strong><br/>  ${materia.profesor}</p>
                        </div>
                        <button onclick="borrarMateria('${materia.nombre}')" class="btn btn-danger btn-sm btn-block">Delete</button>
                    </div>
                </div>
                `;
            });
        }
    })
    .catch(error => {
        console.error(error)
    })
function borrarMateria(nombre) {
    // Cargar el archivo JSON
    fetch(`http://localhost:3000/estudiantes/${id}`)
        .then(response => response.json())
        .then(user => {
            // Encontrar la materia a eliminar
            const materiaIndex = user.materias.findIndex(materia => materia.nombre === nombre);

            // Si la materia existe, eliminarla
            if (materiaIndex > -1) {
                user.materias.splice(materiaIndex, 1);

                // Guardar el archivo JSON actualizado
                return fetch(`http://localhost:3000/estudiantes/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
            }
        })
        .then(() => {
            window.location.reload();
        })
}

// MOdificacion

const formModificacion = document.getElementById('modificacion-form');
const initialFormData = {
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    seccion: ''
};

let formData = {};

function handleChange(event) {
    formData[event.target.name] = event.target.value;
    console.log(formData);
}

function isFormDirty() {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
}

formModificacion.addEventListener('change', handleChange);

formModificacion.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isFormDirty()) {
        fetch(`http://localhost:3000/estudiantes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then (() =>{
                window.location.reload();
            })
            .catch((error) => console.error(error))
    }
})

// Modificacion Button
function toggleInput() {
    var btnModificar =document.getElementById("button-modificar")
    var inputs = document.getElementsByClassName("inputModificar");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].style.display === "none") {
            btnModificar.style.background = "grey"
            btnModificar.style.border = "grey"
        inputs[i].style.display = "block";
      } else {
        inputs[i].style.display = "none";
        btnModificar.style.background = "blue"
        btnModificar.style.border = "blue"

      }
    }
  }