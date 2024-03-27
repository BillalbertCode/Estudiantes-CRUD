const formToJSON = (form) => {
    const elements = form.elements;
    const data = [...elements]
        .filter(({ name, value }) => name && value)
        .reduce((data, { name, value }) => {
            if (name && value) {
                if (data[name]) {
                    if (!Array.isArray(data[name])) {
                        data[name] = [data[name]];
                    }
                    data[name].push(value);
                } else {
                    data[name] = value;
                }
            }
            return data;
        }, {});
    return data;
};

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = formToJSON(form);
    const jsonData = JSON.stringify(formData);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/estudiantes');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonData);
    document.getElementById("add").textContent = "Registrado Correctamenete"

    xhr.onload = () => {
        if (xhr.status === 201) {
            const responseData = JSON.parse(xhr.responseText);
            const id = responseData.id;
            const url = `./PanelUsuario/index.html?id=${id}`;
            location.href = url;
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
});