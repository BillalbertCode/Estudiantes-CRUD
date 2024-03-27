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
    app.use(bodyParser.json());
    app.use(bodyParser.text());//quest for delete
    app.use(cors()); // desinstalar al terminar
    // Publicas
    app.use(express.static(public_path))
    app.get('/', (req, res) => {
        const indexPath = path.resolve(public_path,'index.html')
        res.sendFile(indexPath)
        // res.sendFile(jsPath1)
        // res.sendFile(jsPath2)

    })
    app.get('/Panel', (req, res) => {
        const indexPath = path.resolve(public_path, './PanelUsuario/index.html')
        res.sendFile(indexPath)
    })

    // Registro Y busqueda del estudiante
    app.get('/estudiantes', (req, res) => {
        res.json(data)
        console.log(data.estudiantes)
    })
    app.post('/estudiantes', (req, res) => {

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
        const id = req.params.id;
        const body = req.body;
    
        fs.readFile('./database/db.json', 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send('Error reading file');
                console.log(`Error reading file: ${err}`);
            } else {
                const jsonData = JSON.parse(data);
                const index = jsonData.estudiantes.findIndex(estudiante => estudiante.id === id);
    
                if (index === -1) {
                    // Estudiante not found
                    res.status(404).json({ error: 'Estudiante not found' });
                    console.log(`Estudiante not found`);
                } else {
                    // Update the specified field
                    Object.assign(jsonData.estudiantes[index], body);
    
                    fs.writeFile('./database/db.json', JSON.stringify(jsonData, null, 2), (err) => {
                        if (err) {
                            res.status(500).send('Error writing file');
                            console.log(`Error writing file: ${err}`);
                        } else {
                            res.status(200).json(jsonData.estudiantes[index]);
                            console.log(`Updated estudiante: ${JSON.stringify(jsonData.estudiantes[index])}`);
                        }
                    });
                }
            }
        });
    });
    app.put('/estudiantes/:id', (req, res) => {
        const id = req.params.id;
      
        fs.readFile('./database/db.json', 'utf-8', (err, data) => {
          if (err) {
            res.status(500).send('Error reading file');
            console.log(`Error reading file: ${err}`);
          } else {
            const jsonData = JSON.parse(data);
            const index = jsonData.estudiantes.findIndex(estudiante => estudiante.id === id);
      
            if (index !== -1) {
              const updatedEst = req.body;
              updatedEst.id = id; // asegurarse de incluir el id
              jsonData.estudiantes[index] = updatedEst;
      
              fs.writeFile('./database/db.json', JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                  res.status(500).send('Error writing file');
                  console.log(`Error writing file: ${err}`);
                } else {
                  res.status(200).json(updatedEst);
                  console.log(`Updated estudiante: ${JSON.stringify(updatedEst)}`);
                }
              });
            } else {
              res.status(404).json({ error: 'Estudiante not found' });
              console.log(`Estudiante not found`);
            }
          }
        });
      });
    app.listen(port, () => {
        console.log(`escuchando desde ${port}`)
    })
}