# App of students
## info
CRUD basico de estudiantes 
Con peticiones fetch desde el Front-End y manejo de Enpoints desde el Backend
Esto en una base de datos de formato json


## Caracteristicas

- Seccion de Registro
- Busqueda de Usuarios por id
- Modificacion de usuarios
- Puedes crear varias materias (nombre de la materia, profesor, Nota) y eliminarlas
## Tecnologias 
- JavaScript ES6
- NodeJS
- Express


## Uso

### .env
- PUBLIC_PATH ubicacion de la carpeta que sea de archivos publicos (Front)
- PUERTO el puerto local en el que trabajaras
- END_POINT endpoint a usar
- DATABASE_JSON nombre de la database agregale el json
### DataBase

1. Crea un archivo para la base de datos con el nombre que le pusiste en el .env
se usa un archivo JSON agregale el .json al final //(db.json)
2. Crea el nombre del enpoint en tu env

*ejemplo del enpoint*
```{
  "estudiantes": [
    {
      "id": "9bd7",
      "nombre": "Billalbert",
      "apellido": "Martinez",
      "cedula": 30566797,
      "email": "BillalbertCode@gmail.com",
      "seccion": 1410111,
      "materias": [ 
        {
          "nombre": "Responsive Web Design",
          "nota": 10,
          "profesor": "FreeCode"
        }
      ]
    }
    ]
}
```

> Nota: se creara automaticamente la propiedad de materias, ya que eso lo controla en front