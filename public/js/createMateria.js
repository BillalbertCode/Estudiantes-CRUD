const materiaForm = document.getElementById('materiaForm');
const jsonOutput = document.getElementById('jsonOutput');

materiaForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const profesor = document.getElementById('profesor').value;
    const nota = parseInt(document.getElementById('nota').value);

    // Cargar el archivo JSON
    fetch(`http://localhost:3000/estudiantes/${id}`)
        .then(response => response.json())
        .then(user => {
            // Agregar la nueva materia al objeto user
            user.materias = user.materias || [];
            user.materias.push({ nombre, nota, profesor });

            // Guardar elobjeto user actualizado en el archivo JSON
            return fetch(`http://localhost:3000/estudiantes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        })
        .then (() =>{
            window.location.reload();
        })
        .catch(error => {
            jsonOutput.textContent = 'Error: ' + error.message;
        });
        

});