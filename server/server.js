import express from 'express'
import path from 'path'

export const startServer = (options) => {
    const { port, public_path = 'public' } = options
    const app = express()
    app.use(express.static(public_path))
    app.get('/', (req, res) => {
        const indexPath = path.resolve(public_path,"index.html")
        res.sendFile(indexPath)
    })
    app.get('/Panel', (req,res) =>{
        const indexPath = path.resolve(public_path,'./PanelUsuario/index.html')
        res.sendFile(indexPath)
    })
    app.listen(port,() =>{
        console.log(`escuchando desde ${port}`)
    })
}