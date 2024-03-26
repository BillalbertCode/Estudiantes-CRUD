import express from 'express'
import path from 'path'
import cors from 'cors'
import fs from 'fs'
import { assert } from 'console'; //quest for delete
import bodyParser from 'body-parser';
import crypto from 'crypto'
import data from "../database/db.json" assert {type: "json"};

export const startServer = (options) => {
    const { port, public_path = 'public' } = options
    const app = express()
    // Silenciado ya que genera una estatica
    // app.use(express.static(public_path))
    app.use(bodyParser.json());
    app.use(bodyParser.text());//quest for delete
    app.use(cors()); // desinstalar al terminar
    app.get('/', (req, res) => {
        // const indexPath = path.resolve(public_path,'index.html')
        // res.sendFile(indexPath)
        res.send("hello World")
    })
    // app.get('/Panel', (req, res) => {
    //     const indexPath = path.resolve(public_path, './PanelUsuario/index.html')
    //     res.sendFile(indexPath)
    // })
    // Registro Y busqueda del estudiante
    app.get('/estudiantes', (req, res) => {
        res.json(data)
        console.log(data.estudiantes)
    })
    app.post('/estudiantes', (req, res) => {
        // Parse the request body
        //  const body = req.body;
        //  // Modify the JSON data
        //  data.estudiantes.push(body);
        //  // Send the updated JSON data
        //  res.json(data);
        // fs.writeFile('./database/db.json', JSON.stringify(body, null, 2), (err) => {
        //     if (err) {
        //         // Handle the error
        //         res.status(500).send('Error writing file');
        //         console.log(err)
        //     } else {
        //         // Set the HTTP status code to 201
        //         res.status(201);
        //         // Send the response body
        //         res.send('Estudiante added successfully');
        //     }
        // });
        //  res.status(201)
        const body = req.body
        const id = crypto.randomUUID();
        fs.readFile('./database/db.json', 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error reading file')
                console.log(`error readFile: ${err} `)
            } else {
                const jsonData = JSON.parse(data)
                jsonData.estudiantes.push({ ...body, id })
                fs.writeFile('./database/db.json', JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error Writing file')
                        console.log(`error writeFile: ${err}`)
                    } else {
                        res.status(201)
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
    app.get('/estudiantes/:id', (req, res) => {
        const estudiantes = data.estudiantes
        const user = estudiantes.find(u => u.id === req.params.id)
        if (user) {
            res.json(user);
        } else {
            res.send('User not found');
        }
    })
    app.patch('/estudiantes/:id', (req, res) => {
        const estudiantes = data.estudiantes
        const body = req.body
        
        fs.readFile('./database/db.json', 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error reading file')
                console.log(`error readFile: ${err} `)
            } else {
                const user = estudiantes.find(u => u.id === req.params.id) = JSON.parse(data)
                
                const jsonData = JSON.parse(data)
                jsonData.estudiantes.push({ ...body, id })
                fs.writeFile('./database/db.json', JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error Writing file')
                        console.log(`error writeFile: ${err}`)
                    } else {
                        res.status(201)
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
    app.listen(port, () => {
        console.log(`escuchando desde ${port}`)
    })
}