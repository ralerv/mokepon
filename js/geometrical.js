/* Traer elementos */
const sectionAtks = document.getElementById("info")     
const figures = document.getElementById("figures")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const sectionRepeat = document.getElementById("restart-section")      
const sectionGameplay = document.getElementById("gameplay")       
const buttonPickCh = document.getElementById("button-pick-ch")
const reset = document.getElementById("restart")
const sectionChs = document.getElementById("pick-ch")
const sectionAts = document.getElementById("pick-at")
const chrc = document.getElementById("name-ch")
const chEn = document.getElementById("name-enm")
const sectionRestart = document.getElementById("results")
const spanChAtks = document.getElementById("ch-atks")
const spanEnAtks = document.getElementById("enm-atks")
const resultado = document.getElementById("resultados")
const pickimg = document.getElementById("pick-img")
const enmimg = document.getElementById("enm-img")
const chrimg= document.createElement("img")
const lPlayer = document.getElementById("lives-ch")
const lEnm = document.getElementById("lives-enm")
const anchoMaximoMapa = 350

/* Variables */
let ataqueJugador = []
let atkEnm = []
let tAtk = []
let atk
let n
let resultadoCombate
let winsEnemie = 0
let winsPlayer = 0
let pj
let personaje = ""
let enemigo = ""
let colortext =""
let mokepones = []
let mokeponOptions
let inputHipodoge
let inputCapipepo
let inputRatigueya
let btFire
let btEarth
let btWater
let allAtksCh
let botones = []
let atksEnMokepon = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let a = 0
let fotousuario
let lienzo = mapa.getContext("2d")
let intervalo
let miMascota
let mokeponesEnemigos = []
let jugadorID = null
let enemigoID = null
let mapaBackground = new Image()
mapaBackground.src="https://raw.githubusercontent.com/platzi/curso-programacion-basica/64-imgs-personajes-fondo/programar/mokepon/assets/mokemap.png"

let anchoMapa = window.innerWidth - 20
if (anchoMapa > anchoMaximoMapa) {anchoMapa = anchoMaximoMapa - 20}
let alturaDeseada = anchoMapa * 600 / 800

mapa.width = anchoMapa
mapa.height = alturaDeseada


/* Clases */
class Mokepon {
    constructor (nombre,foto,vida, fotoMapa, id = 0, x = 10 , y = 10) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width-this.ancho)
        this.y = aleatorio(0,mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(this.mapaFoto,this.x,this.y,this.ancho,this.alto)
    }
}

let hipodoge = new Mokepon("Hipodoge","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png?raw=true",5,"https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/hipodoge.png")

let capipepo = new Mokepon("Capipepo","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png?raw=true",5,"https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/capipepo.png")

let ratigueya = new Mokepon ("Ratigueya","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png?raw=true",5,"https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/ratigueya.png")

const hipodogeAtaques = [{ nombre: "💧", id:"button-pick-water"},
                        { nombre: "💧", id:"button-pick-water"},
                        { nombre: "💧", id:"button-pick-water"},
                        { nombre: "🔥", id:"button-pick-fire"},
                        { nombre: "🌱", id:"button-pick-earth"}]

const capipepoAtaques = [{ nombre: "🌱", id:"button-pick-water"},
                        { nombre: "🌱", id:"button-pick-water"},
                        { nombre: "🌱", id:"button-pick-water"},
                        { nombre: "🔥", id:"button-pick-fire"},
                        { nombre: "💧", id:"button-pick-earth"}]

const ratigueyaAtaques = [{ nombre: "🔥", id:"button-pick-fire"},
                        { nombre: "🔥", id:"button-pick-fire"},
                        { nombre: "🔥", id:"button-pick-fire"},
                        { nombre: "💧", id:"button-pick-water"},
                        { nombre: "🌱", id:"button-pick-earth"}]

hipodoge.ataques.push(...hipodogeAtaques)
capipepo.ataques.push(...capipepoAtaques)
ratigueya.ataques.push(...ratigueyaAtaques)

mokepones.push(hipodoge,capipepo,ratigueya)

/* Funciones */
function startGame(){   /* Detectar mascota del jugador */
    mokepones.forEach((mokepon) => {
        sectionVerMapa.style.display = "none"
        mokeponOptions = ` 
            <li class="chrs">
                 <input type="radio" name="chrs" id=${mokepon.nombre}>
                 <label for=${mokepon.nombre}>${mokepon.nombre}<img src=${mokepon.foto} alt=${mokepon.nombre}></label>
            </li>
        `
        figures.innerHTML += mokeponOptions
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")
    })


    sectionAtks.style.display= "none"       /* Ocultar ataques */
    sectionRepeat.style.display= "none"      /* Ocultar boton de reinicio */
    sectionGameplay.style.display= "none"   /* Ocultar boton de reinicio */
    buttonPickCh.addEventListener("click", pickChPlayer)
    reset.addEventListener("click",restartGame)
    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then (function (res) {
            console.log(res)
            if (res.ok){
                res.text()
                    .then (function (respuesta) {
                        console.log(respuesta)
                        jugadorID = respuesta
                    })
            }
        })
}

function pickChPlayer() {   /* Detectar mascota del jugador */
    if (inputHipodoge.checked){fotousuario = hipodoge.foto; pj = inputHipodoge.id; chrc.innerHTML=inputHipodoge.id; pickChEnemy()} /* La mascota del enemigo se escogerá */
    if (inputCapipepo.checked){fotousuario = capipepo.foto; pj = inputCapipepo.id; chrc.innerHTML=inputCapipepo.id; pickChEnemy()}
    if (inputRatigueya.checked){fotousuario = ratigueya.foto; pj = inputRatigueya.id; chrc.innerHTML=inputRatigueya.id; pickChEnemy()}
    if (!inputHipodoge.checked && !inputCapipepo.checked && !inputRatigueya.checked ) {alert("ESCOGE UN PERSONAJE")}
    extraerAtaques(pj)
    iniciarMapa()
    miMascota = obtenerMascota(pj)
    pickMokepon(pj)
    }

function pickMokepon(pj){
    fetch(`http://localhost:8080/mokepon/${jugadorID}`,{
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({mokepon: pj})
    }) 
}

function obtenerMascota(mascotaJugador) {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function iniciarMapa(){
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener("keydown", pressKeyboard)
    window.addEventListener("keyup",detenerMovimiento)
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        allAtksCh = `
            <button id=${ataque.id} class="buttons BAtaque">${ataque.nombre}</button>
        `
        sectionAts.innerHTML += allAtksCh
    })
    btFire = document.getElementById("button-pick-fire")
    btEarth = document.getElementById("button-pick-earth")
    btWater = document.getElementById("button-pick-water")
    botones = document.querySelectorAll('.BAtaque')
    console.log(botones)
    secuenciaAtaque()
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                disableSomeCSSFeatures(boton)
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                disableSomeCSSFeatures(boton)
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                disableSomeCSSFeatures(boton)
            }
            enviarAtaques()
        })
    })
    }

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorID}/ataques`, {
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({ataques: ataqueJugador[a]})
    })

    obtenerAtaques()
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoID}/ataques`,)
        .then( function(res){
            if (res.ok){
                res.json()
                    .then (function({ataques}){
                        atkEnm = ataques[a]
                        combat()
                    })
            }
        })
}

function disableSomeCSSFeatures(boton){
    boton.style.background = '#112f58'
    boton.style.cursor="not-allowed"
    boton.style.boxShadow="none"
    boton.disabled=true
}

function aleatorio(min,max){ /* Numero random con rangos */
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pickChEnemy(){    /* El enemigo escoge mascota */
    sectionVerMapa.style.display = "flex"
    buttonPickCh.disabled=true;                   /* El jugador no cambia de mascota */
    sectionChs.style.display= "none"            /* Ocultar mascotas */
    
}
function asignarEnemigo(chrcEnemigo){
    chEn.innerHTML = chrcEnemigo.nombre
    atksEnMokepon = chrcEnemigo.ataques
    addPjs(fotousuario,chrcEnemigo.foto)
}

function pressKeyboard(event){
    switch (event.key) {
        case "ArrowUp": moverArriba(); break;
        case "ArrowDown": moverAbajo(); break;
        case "ArrowLeft": moverIzquierda(); break;
        case "ArrowRight": moverDerecha(); break;
        default:
            break;
    }
}

function pintarCanvas(){
    miMascota.x = miMascota.x + miMascota.velocidadX
    miMascota.y = miMascota.y + miMascota.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(mapaBackground,0,0,mapa.width,mapa.height)
    enviarPosicion(miMascota.x,miMascota.y)
    miMascota.pintarMokepon()
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        colisiones(mokepon)
    })
}

function moverDerecha(){
    miMascota.velocidadX = 5
}

function moverIzquierda(){
    miMascota.velocidadX = - 5
}

function moverAbajo(){
    miMascota.velocidadY = 5
}

function moverArriba(){
    miMascota.velocidadY = - 5
}

function detenerMovimiento(){
    miMascota.velocidadX = 0
    miMascota.velocidadY = 0
}

function enviarPosicion(x,y) {
    fetch(`http://localhost:8080/mokepon/${jugadorID}/posicion`,{
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({x, y})
    }) 
        .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge") {
                            mokeponEnemigo = new Mokepon("Hipodoge","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png?raw=true",5,"https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/hipodoge.png", enemigo.id)
                        } else if (mokeponNombre === "Capipepo") {
                            mokeponEnemigo = new Mokepon("Capipepo","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png?raw=true",5,"https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/capipepo.png", enemigo.id)
                        } else if (mokeponNombre === "Ratigueya") {
                            mokeponEnemigo = new Mokepon("Ratigueya","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png?raw=true",5,"https://raw.githubusercontent.com/platzi/curso-programacion-basica/65-clases-methods/programar/mokepon/assets/ratigueya.png", enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
        }
    })
}

function colisiones(enemigo){
    let arribaEnemigo = enemigo.y
    let abajoEnemigo = enemigo.y + enemigo.alto
    let izquierdaEnemigo = enemigo.x
    let derechaEnemigo = enemigo.x + enemigo.ancho

    let arribaMascota = miMascota.y
    let abajoMascota = miMascota.y + miMascota.alto
    let izquierdaMascota = miMascota.x
    let derechaMascota = miMascota.x + miMascota.ancho
    
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){  return  }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log("colision xd")
    enemigoID = enemigo.id
    sectionVerMapa.style.display = "none"
    sectionAtks.style.display= "flex"           /* Mostrar ataques */
    sectionGameplay.style.display= "grid"       /* mostrar gameplay */
    asignarEnemigo(enemigo)
}

function addPjs(z,t){
    chrimg.src = z;
    let enimg= document.createElement("img")
    enimg.src = t;
    pickimg.appendChild(chrimg)
    enmimg.appendChild(enimg)
}


function atkEn()                                /* El enemigo ataca */
    {
        atk = aleatorio(0,atksEnMokepon.length - 1)
        if (atksEnMokepon[atk].nombre === "🔥") {atkEnm.push("FUEGO")}
        else if (atksEnMokepon[atk].nombre === "💧") {atkEnm.push("AGUA")}
        else {atkEnm.push("TIERRA")}
        combat()
    }

function combat(){
        clearInterval(intervaloCombate)
        if (ataqueJugador[a] === atkEnm[a]) {
            resultadoCombate="Empate"
            colortext="black"
        }
        else if (ataqueJugador[a] === "FUEGO" && atkEnm[a] === "TIERRA"){
            resultadoCombate="Ganaste";
            winsPlayer++;
            colortext="#00ff00"
        }

        else if (ataqueJugador[a] === "AGUA" && atkEnm[a] === "FUEGO"){
            resultadoCombate="Ganaste";
            winsPlayer++;
            colortext="#00ff00"
        }

        else if (ataqueJugador[a] === "TIERRA" && atkEnm[a] === "AGUA"){
            resultadoCombate="Ganaste";
            winsPlayer++;
            colortext="#00ff00"
        }

        else {resultadoCombate="Perdiste"; winsEnemie++; colortext="red"}

    createMessage()
    updateLifes()
}

function updateLifes() {
    lPlayer.innerHTML=winsPlayer
    lEnm.innerHTML=winsEnemie
    if (a == 5) {
        if (winsPlayer > winsEnemie) {
            resultadoCombate="Ganaste";
            colortext="#00ff00"
        }
        else if (winsPlayer < winsEnemie) {
            resultadoCombate="Perdiste";
            colortext="red"
        }
        else if (winsPlayer == winsEnemie) {
            resultadoCombate="Empate wtf";
            colortext="black"
        }
        createMessageFinal();
    }           /* RESULTADO TOTAL */
}

function createMessage(){                     /* Crear mensaje (p) de ataque en html */
    let parrafoChrc = document.createElement("p")
    parrafoChrc.innerHTML = ataqueJugador;
    let parrafoEnm = document.createElement("p")
    parrafoEnm.innerHTML = atkEnm;
    let parrafoResultado = document.createElement("p")
    parrafoResultado.innerHTML = resultadoCombate;
    parrafoResultado.style.color = colortext;
    spanChAtks.appendChild(parrafoChrc)
    spanEnAtks.appendChild(parrafoEnm)
    resultado.appendChild(parrafoResultado)
    a++
}
    
function createMessageFinal(){                   /* Crear mensaje final (p) de ataque en html */
    sectionRepeat.style.display= "flex"         /* mostrar boton de reinicio */
    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultadoCombate
    parrafo.style.color = colortext
    sectionRestart.appendChild(parrafo)
}

function restartGame(){
    location.reload()
}

window.addEventListener("load", startGame)