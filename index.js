const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

class Jugador {
    constructor(id){
        this.id = id
    }
    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }
    actualizarPosicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
    }
}

let jugadores = []

app.get("/unirse",(req,res)=>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(id)
})

app.post("/mokepon/:jugadorID",(req,res)=>{
    const jugadorID = req.params.jugadorID || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador)=> jugador.id === jugadorID)
    if (jugadorIndex >= 0) {jugadores[jugadorIndex].asignarMokepon(mokepon)}
    console.log(jugadores)
    console.log(jugadorID)
    res.end()
})

app.post("/mokepon/:jugadorID/posicion",(req,res)=>{
    const jugadorID = req.params.jugadorID || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorIndex = jugadores.findIndex((jugador)=>jugador.id === jugadorID)
    
    if (jugadorIndex >= 0) {jugadores[jugadorIndex].actualizarPosicion(x,y)}

    const enemigos = jugadores.filter((jugador) => {
        return jugadorID !== jugador.id && jugador.mokepon; // Aquí la validación
      });

    // const enemigos = jugadores.filter((jugador)=> jugadorID !== jugador.id)
    res.send({enemigos})
})

app.post("/mokepon/:jugadorID/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorID || ""
    const ataques = req.body.ataques || []
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    res.end()
})

app.post("/mokepon/:jugadorID/ataques",(req,res)=>{
    const jugadorID = req.params.jugadorID || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorID)
    res.send({ataques: jugador.ataques})
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
    console.log ("probando Node y nudos uwu")
})
