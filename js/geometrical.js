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

/* Clases */
class Mokepon {
    constructor (nombre,foto,vida) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png?raw=true",5)

let capipepo = new Mokepon("Capipepo","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png?raw=true",5)

let ratigueya = new Mokepon ("Ratigueya","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png?raw=true",5)

hipodoge.ataques.push(
    { nombre: "💧", id:"button-pick-water"},
    { nombre: "💧", id:"button-pick-water"},
    { nombre: "💧", id:"button-pick-water"},
    { nombre: "🔥", id:"button-pick-fire"},
    { nombre: "🌱", id:"button-pick-earth"}
)

capipepo.ataques.push(
    { nombre: "🌱", id:"button-pick-earth"},
    { nombre: "🌱", id:"button-pick-earth"},
    { nombre: "🌱", id:"button-pick-earth"},
    { nombre: "💧", id:"button-pick-water"},
    { nombre: "🔥", id:"button-pick-fire"},
)

ratigueya.ataques.push(
    { nombre: "🔥", id:"button-pick-fire"},
    { nombre: "🔥", id:"button-pick-fire"},
    { nombre: "🔥", id:"button-pick-fire"},
    { nombre: "💧", id:"button-pick-water"},
    { nombre: "🌱", id:"button-pick-earth"}
)

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
}

function pickChPlayer() {   /* Detectar mascota del jugador */
    if (inputHipodoge.checked){fotousuario = hipodoge.foto; pj = inputHipodoge.id; chrc.innerHTML=inputHipodoge.id; pickChEnemy()} /* La mascota del enemigo se escogerá */
    if (inputCapipepo.checked){fotousuario = capipepo.foto; pj = inputCapipepo.id; chrc.innerHTML=inputCapipepo.id; pickChEnemy()}
    if (inputRatigueya.checked){fotousuario = ratigueya.foto; pj = inputRatigueya.id; chrc.innerHTML=inputRatigueya.id; pickChEnemy()}
    if (!inputHipodoge.checked && !inputCapipepo.checked && !inputRatigueya.checked ) {alert("ESCOGE UN PERSONAJE")}
    extraerAtaques(pj)
    console.log(pj)
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
            atkEn()
        })
    })
    }

function disableSomeCSSFeatures(boton){
    boton.style.background = '#112f58'
    boton.style.cursor="not-allowed"
    boton.style.boxShadow="none"
}

function aleatorio(min,max){ /* Numero random con rangos */
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pickChEnemy (){    /* El enemigo escoge mascota */
    sectionVerMapa.style.display = "flex"
    buttonPickCh.disabled=true;                   /* El jugador no cambia de mascota */
    sectionChs.style.display= "none"            /* Ocultar mascotas */
    //sectionAtks.style.display= "flex"           /* Mostrar ataques */
    //sectionGameplay.style.display= "grid"       /* mostrar gameplay */
    let r = aleatorio(0,mokepones.length-1)
    chEn.innerHTML = mokepones[r].nombre
    atksEnMokepon = mokepones[r].ataques
    addPjs(fotousuario,mokepones[r].foto)
    console.log(r,mokepones)
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
        blockAtkButtons()
    }           /* RESULTADO TOTAL */
}

function createMessage(){                     /* Crear mensaje (p) de ataque en html */
    let parrafoChrc = document.createElement("p")
    parrafoChrc.innerHTML = ataqueJugador[a];
    let parrafoEnm = document.createElement("p")
    parrafoEnm.innerHTML = atkEnm[a];
    let parrafoResultado = document.createElement("p")
    parrafoResultado.innerHTML = resultadoCombate;
    parrafoResultado.style.color = colortext;
    spanChAtks.appendChild(parrafoChrc)
    spanEnAtks.appendChild(parrafoEnm)
    resultado.appendChild(parrafoResultado)
    a++
}

function blockAtkButtons(){
    btFire.disabled=true
    btEarth.disabled=true
    btWater.disabled=true
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