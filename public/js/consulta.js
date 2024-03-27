
// Fetch data when the form is submitted
document.getElementById("employeeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const empID = document.getElementById("empID").value;
    const requestOptions = {
        method: 'GET',
    };

    fetch(`http://localhost:3000/estudiantes/${empID}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            document.getElementById("result").textContent = result.nombre;
            console.log(empID)
        })
        .catch(error => {
            document.getElementById("result").textContent = "id invalida";

            console.error(error)
        })
});
document.getElementById("search").addEventListener("click", function () {
    const empID = document.getElementById("empID").value;
    const requestOptions = {
        method: 'GET',
    };
        fetch(`http://localhost:3000/estudiantes/${empID}`, requestOptions)
            .then(response => response.json())
            .then(result => {

                console.log(empID)
                document.getElementById("result").textContent = result.nombre;
                if (result.nombre != undefined && result.nombre != '') {
                    location.href = `./PanelUsuario/index.html?id=${empID}`;
                }
            })
            .catch(error => {
                document.getElementById("result").textContent = "id invalida";
                console.error(error)
            })
});