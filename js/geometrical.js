/* Variables */
let ataqueJugador = []
let atkEnm
let atk
let n
let resultadoCombate
let loses = 0
let wins = 0
let lifeEnm = 3
let lifePlayer = 3
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

/* Traer elementos */
const sectionAtks = document.getElementById("info")     
const figures = document.getElementById("figures")
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

let hipodoge = new Mokepon("Hipodoge","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png?raw=true",lifeEnm)

let capipepo = new Mokepon("Capipepo","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png?raw=true",lifeEnm)

let ratigueya = new Mokepon ("Ratigueya","https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png?raw=true",lifeEnm)

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
    if (inputHipodoge.checked){pj = inputHipodoge.id; chrc.innerHTML=inputHipodoge.id; } /* La mascota del enemigo se escogerá */
    if (inputCapipepo.checked){pj = inputCapipepo.id; chrc.innerHTML=inputCapipepo.id;}
    if (inputRatigueya.checked){pj = inputRatigueya.id; chrc.innerHTML=inputRatigueya.id;}
    if (!inputHipodoge.checked && !inputCapipepo.checked && !inputRatigueya.checked ) {alert("ESCOGE UN PERSONAJE")}
    extraerAtaques(pj)
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
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'   
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }
        })
    })
    pickChEnemy()
    }

function aleatorio(min,max){ /* Numero random con rangos */
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pickChEnemy (){    /* El enemigo escoge mascota */
    buttonPickCh.disabled=true;                   /* El jugador no cambia de mascota */
    sectionChs.style.display= "none"            /* Ocultar mascotas */
    sectionAtks.style.display= "flex"           /* Mostrar ataques */
    sectionGameplay.style.display= "grid"       /* mostrar gameplay */
    let r = aleatorio(0,mokepones.length-1)
    chEn.innerHTML = mokepones[r].nombre
    addPjs(1,r)
    console.log(r,mokepones)
}


function addPjs(a,b){
    switch (a) {
        case 1: a = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png?raw=true"; break;
        case 2: a = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png?raw=true"; break;
        case 3: a = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png?raw=true"; break;
        default:"undefined"
            break;
    }

    switch (b) {
        case 0: b = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png?raw=true"; break;
        case 2: b = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png?raw=true"; break;
        case 1: b = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png?raw=true"; break;
        default:"undefined"
            break;
    }
    chrimg.src = a;
    let enimg= document.createElement("img")
    enimg.src = b;
    pickimg.appendChild(chrimg)
    enmimg.appendChild(enimg)
}

function atkFire(){ataqueJugador="Fuego"; atkEn(); n=1}      /* Detectar ataque jugador */
function atkEarth(){ataqueJugador="Tierra"; atkEn(); n=2}
function atkWater(){ataqueJugador="Agua"; atkEn(); n=3}

function atkEn()                                /* El enemigo ataca */
    {
        atk = aleatorio(1,3)
        switch (atk) {
            case 1: atkEnm="Fuego"; break;
            case 2: atkEnm="Tierra"; break;
            case 3: atkEnm="Agua"; break;
            default: atkEnm="none"; break;
        }
        combat()
        createMessage()
        updateLifes()
    }

function combat(){
    if (n==atk) {resultadoCombate="Empate"; colortext="black"}
    else if (n == 1 && atk==3) {resultadoCombate="Ganaste"; lifeEnm--; colortext="#00ff00"}
    else if (n == 2 && atk==1) {resultadoCombate="Ganaste"; lifeEnm--; colortext="#00ff00"}
    else if (n == 3 && atk==2) {resultadoCombate="Ganaste"; lifeEnm--; colortext="#00ff00"}
    else {resultadoCombate="Perdiste"; lifePlayer--; colortext="red"}
}

function updateLifes() {
    lPlayer.innerHTML=lifePlayer
    lEnm.innerHTML=lifeEnm
    if (lifeEnm == 0 || lifePlayer == 0) {createMessageFinal(); blockAtkButtons()}           /* RESULTADO TOTAL */
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