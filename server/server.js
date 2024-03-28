import express from 'express'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser';
import crypto from 'crypto'

export const startServer = (options) => {
    const { port, public_path = 'public', data_base, end_point } = options
    const app = express()

    app.use(bodyParser.json());

    // Publicas
    app.use(express.static(public_path))
    app.get('/', (req, res) => {
        const indexPath = path.resolve(public_path, 'index.html')
        res.sendFile(indexPath)
    })
    app.get('/Panel', (req, res) => {
        const indexPath = path.resolve(public_path, './PanelUsuario/index.html')
        res.sendFile(indexPath)
    })

    // Registro Y busqueda del estudiante

    // read database
    app.get(`/${end_point}`, (req, res) => {
        fs.readFile(`./database/${data_base}`, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error Reading File')
            } else {
                res.json(data)
            }
        })
    })
    // Registro
    app.post(`/${end_point}`, (req, res) => {
        const body = req.body
        const id = crypto.randomUUID();

        fs.readFile(`./database/${data_base}`, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error reading file')
                console.log(`error readFile: ${err} `)
            } else {
                const jsonData = JSON.parse(data)
                // asignacion de id y cuerpo
                jsonData.estudiantes.push({ ...body, id })

                fs.writeFile(`./database/${data_base}`, JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error Writing file')
                        console.log(`error writeFile: ${err}`)
                    } else {
                        res.status(201)
                        // id identification send
                        const objeto = {
                            name: "objeto",
                            id: id
                        }
                        res.json(objeto);
                    }
                })
            }
        })
    })
    // Panel of estudiantes
    // mostrar datos del estudiante
    app.get(`/${end_point}/:id`, (req, res) => {
        const id = req.params.id;
        fs.readFile(`./database/${data_base}`, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error Reading File')
            } else {
                const jsonData = JSON.parse(data)
                const index = jsonData[end_point].findIndex(user => user.id === id)
                if (index === -1) {
                    res.status(404).json({ error: 'Estudiante not found' });
                } else {
                    res.json(jsonData[end_point][index]);
                }
            }
        })

    })
    // Modificacion de datos de usuario
    app.patch(`/${end_point}/:id`, (req, res) => {
        const id = req.params.id;
        const body = req.body;
        // lectura para encontar el usuario
        fs.readFile(`./database/${data_base}`, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send(`Error reading file: ${err}`);
            } else {
                const jsonData = JSON.parse(data);
                const index = jsonData[end_point].findIndex(user => user.id === id);

                if (index === -1) {
                    res.status(404).json({ error: 'Estudiante not found' });
                } else {
                    // almacenar las propiedades guardades del body y trasladarlas a el user
                    Object.assign(jsonData[end_point][index], body);

                    fs.writeFile(`./database/${data_base}`, JSON.stringify(jsonData, null, 2), (err) => {
                        if (err) {
                            res.status(500).send(`Error writing file: ${err}`);
                        } else {
                            res.status(200).json(jsonData[end_point][index]);
                        }
                    });
                }
            }
        });
    });
    // Creacion de materias
    app.put(`/${end_point}/:id`, (req, res) => {
        const id = req.params.id;
        const body = req.body

        fs.readFile(`./database/${data_base}`, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error reading file');
            } else {
                const jsonData = JSON.parse(data);
                const index = jsonData[end_point].findIndex(user => user.id === id);

                if (index === -1) {
                    res.status(404).json({ error: 'Estudiante not found' });
                } else {
                    // le guardamos el id ya que es un put y tener mas control sobre la id
                    body.id = id;
                    jsonData[end_point][index] = body;

                    fs.writeFile(`./database/${data_base}`, JSON.stringify(jsonData, null, 2), (err) => {
                        if (err) {
                            res.status(500).send(`Error writing file: ${err}`);
                        } else {
                            res.status(200).json(body);
                        }
                    });
                }
            }
        });
    });
    app.listen(port, () => {
        console.log(`escuchando desde ${port}`)
    })
}