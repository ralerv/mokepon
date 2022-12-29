/* Variables */
let atkCh
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

/* Traer elementos */
const sectionAtks = document.getElementById("info")     
const sectionRepeat = document.getElementById("restart-section")      
const sectionGameplay = document.getElementById("gameplay")       
const buttonPickCh = document.getElementById("button-pick-ch")
const reset = document.getElementById("restart")
const sectionChs = document.getElementById("pick-ch")
const btFire = document.getElementById("button-pick-fire")
const btEarth = document.getElementById("button-pick-earth")
const btWater = document.getElementById("button-pick-water")
const inputTriangulo = document.getElementById("Triángulo")
const inputCuadrado = document.getElementById("Cuadrado")
const inputCírculo = document.getElementById("Círculo")
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



/* Funciones */
function startGame(){   /* Detectar mascota del jugador */
    sectionAtks.style.display= "none"       /* Ocultar ataques */
    sectionRepeat.style.display= "none"      /* Ocultar boton de reinicio */
    sectionGameplay.style.display= "none"   /* Ocultar boton de reinicio */
    buttonPickCh.addEventListener("click", pickChPlayer)
    reset.addEventListener("click",restartGame)
}

function pickChPlayer() {   /* Detectar mascota del jugador */
    if (inputTriangulo.checked){pj = 1; chrc.innerHTML="Hipodoge"; pickChEnemy()} /* La mascota del enemigo se escogerá, triangulo = hipodoge */
    if (inputCuadrado.checked){pj = 2; chrc.innerHTML="Capipepo"; pickChEnemy()} /* cuadrado = capipepo */
    if (inputCírculo.checked){pj = 3; chrc.innerHTML="Ratigueya"; pickChEnemy()} /* circulo = ratigueya */
    if (!inputTriangulo.checked && !inputCuadrado.checked && !inputCírculo.checked ) {alert("ESCOGE UN PERSONAJE")}
}

function aleatorio(min,max){ /* Numero random con rangos */
    return Math.floor(Math.random()*(max-min+1)+min)
}

function pickChEnemy (){    /* El enemigo escoge mascota */
    buttonPickCh.disabled=true;                   /* El jugador no cambia de mascota */
    sectionChs.style.display= "none"            /* Ocultar mascotas */
    sectionAtks.style.display= "flex"           /* Mostrar ataques */
    sectionGameplay.style.display= "grid"       /* mostrar gameplay */
    let r = aleatorio(1,3)
    if (r==1){chEn.innerHTML="Hipodoge"}
    if (r==2){chEn.innerHTML="Capipepo"}
    if (r==3){chEn.innerHTML="Ratigueya"}
    
    addPjs(pj,r)

    btFire.addEventListener("click", atkFire)
    btEarth.addEventListener("click", atkEarth)
    btWater.addEventListener("click", atkWater)
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
        case 1: b = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_hipodoge_attack.png?raw=true"; break;
        case 2: b = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_capipepo_attack.png?raw=true"; break;
        case 3: b = "https://github.com/platzi/curso-programacion-basica/blob/35-assets-mokepones/programar/mokepon/assets/mokepons_mokepon_ratigueya_attack.png?raw=true"; break;
        default:"undefined"
            break;
    }
    chrimg.src = a;
    let enimg= document.createElement("img")
    enimg.src = b;
    pickimg.appendChild(chrimg)
    enmimg.appendChild(enimg)
}

function atkFire(){atkCh="Fuego"; atkEn(); n=1}      /* Detectar ataque jugador */
function atkEarth(){atkCh="Tierra"; atkEn(); n=2}
function atkWater(){atkCh="Agua"; atkEn(); n=3}

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
    parrafoChrc.innerHTML = atkCh;
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