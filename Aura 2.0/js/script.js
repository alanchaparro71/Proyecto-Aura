/* =========================================
MEMORIA
========================================= */

window.onload = () => {

    const savedName =
    localStorage.getItem("auraName");

    const savedColor =
    localStorage.getItem("auraColor");

    if(savedName){

        document.getElementById(
        "welcome"
        ).innerHTML =
        `Hola ${savedName},
        preparé una experiencia
        diferente para vos.`;

    }

    if(savedColor){

        document.body.style.background =
        `linear-gradient(
        135deg,
        ${savedColor},
        #000
        )`;

    }

}

/* =========================================
GUARDAR DATOS
========================================= */

function saveData(){

    const name =
    document.getElementById("name").value;

    const color =
    document.getElementById("color").value;

    localStorage.setItem(
    "auraName",
    name
    );

    localStorage.setItem(
    "auraColor",
    color
    );

    alert("Memoria guardada");

}

/* =========================================
MODOS EMOCIONALES
========================================= */

function setMode(mode){

    emotions[mode]++;

    updateTopEmotions();

    const body = document.body;
    body.classList.remove(
    "cyberpunk"
    );

    switch(mode){

        case "feliz":
            body.style.background =
            "linear-gradient(135deg,#f59e0b,#facc15)";
        break;

        case "tranquilo":
            body.style.background =
            "linear-gradient(135deg,#0ea5e9,#1e3a8a)";
        break;

        case "motivado":
            body.style.background =
            "linear-gradient(135deg,#ef4444,#7f1d1d)";
        break;

        case "creativo":
            body.style.background =
            "linear-gradient(135deg,#8b5cf6,#ec4899)";
        break;

        case "misterioso":
            body.style.background =
            "linear-gradient(135deg,#1e1b4b,#312e81,#000000)";
        break;

    }

}

function updateTopEmotion(){

    let top = "Ninguno";
    let max = 0;

    for(const emotion in emotions){

        if(emotions[emotion] > max){

            max = emotions[emotion];
            top = emotion;

        }

    }

    document.getElementById(
        "topEmotion"
    ).innerText = top;

}

/* =========================================
PARTICULAS
========================================= */

document.addEventListener(
"mousemove",
(e)=>{

    const particle =
    document.createElement("div");

    particle.classList.add(
    "particle"
    );

    particle.style.left =
    e.clientX + "px";

    particle.style.top =
    e.clientY + "px";

    particle.style.background =
    `hsl(
    ${Math.random()*360},
    100%,
    70%
    )`;

    document.body.appendChild(
    particle
    );

    setTimeout(()=>{

        particle.remove();

    },1000);

});

/* =========================================
MODO OCULTO
========================================= */

let secret = [];

document.addEventListener(
"keydown",
(e)=>{

    secret.push(e.key);

    if(
    secret.join("")
    .includes("aura")
    ){

        activateCyberpunk();

        secret = [];

    }

});

function activateCyberpunk(){

    document.body.classList.add(
    "cyberpunk"
    );

    alert(
    "Modo oculto activado"
    );

}

/* =========================================
IA FICTICIA
========================================= */

const auraMessages = [

"Detecto creatividad en tu mente.",

"Tu energía digital está aumentando.",

"Bienvenido nuevamente al sistema AURA.",

"Analizando emociones humanas...",

"Modo futurista sincronizado.",

"Tu presencia altera el entorno."

];

function speakAura(){

    const randomMessage =

    auraMessages[
    Math.floor(
    Math.random()
    * auraMessages.length
    )
    ];

    document.getElementById(
    "aiMessage"
    ).innerText = randomMessage;

    const voice =
    new SpeechSynthesisUtterance(
    randomMessage
    );

    voice.lang = "es-ES";

    speechSynthesis.speak(voice);

}

/* =========================================
MATRIX
========================================= */

let matrixActive = false;

function toggleMatrix(){

    matrixActive = !matrixActive;

    document.body.classList.toggle(
    "matrix-mode"
    );

    if(matrixActive){

        startMatrix();

    }else{

        cancelAnimationFrame(
        matrixAnimation
        );

    }

}

const letters =
"アァカサタナハマヤャラワ0123456789";

let matrixAnimation;

function startMatrix(){

    const canvas =
    document.getElementById("bg");

    const ctx =
    canvas.getContext("2d");

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

    const fontSize = 16;

    const columns =
    canvas.width / fontSize;

    const drops = [];

    for(
    let x = 0;
    x < columns;
    x++
    ){

        drops[x] = 1;
    }

    function drawMatrix(){

        ctx.fillStyle =
        "rgba(0,0,0,0.08)";

        ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
        );

        ctx.fillStyle =
        "#00ff88";

        ctx.font =
        fontSize +
        "px monospace";

        for(
        let i = 0;
        i < drops.length;
        i++
        ){

            const text =
            letters[
            Math.floor(
            Math.random()
            * letters.length
            )
            ];

            ctx.fillText(
            text,
            i * fontSize,
            drops[i] * fontSize
            );

            if(
            drops[i] * fontSize >
            canvas.height &&
            Math.random() > 0.975
            ){

                drops[i] = 0;
            }

            drops[i]++;

        }

        matrixAnimation =
        requestAnimationFrame(
        drawMatrix
        );

    }

    drawMatrix();

}

/* =========================================
ESTADISTICAS
========================================= */

let clicks = 0;
let moves = 0;
let seconds = 0;

let emotions = {
    feliz: 0,
    tranquilo: 0,
    motivado: 0,
    creativo: 0,
    misterioso: 0
};

document.addEventListener(
"click",
()=>{

    clicks++;

    document.getElementById(
    "clickCount"
    ).innerText = clicks;

});

document.addEventListener(
"mousemove",
()=>{

    moves++;

    document.getElementById(
    "moveCount"
    ).innerText = moves;

});

setInterval(()=>{

    seconds++;

    document.getElementById(
    "timeCount"
    ).innerText = seconds;

},1000);

/* =========================================
DIA / NOCHE
========================================= */

function autoTheme(){

    const hour =
    new Date().getHours();

    const timeText =
    document.getElementById(
    "timeMode"
    );

    if(hour >= 6 && hour < 18){

        timeText.innerText =
        "Modo día activado";

    }else{

        timeText.innerText =
        "Modo noche activado";

    }

}

autoTheme();

/* =========================================
RECONOCIMIENTO VOZ
========================================= */

const recognition =
new webkitSpeechRecognition();

recognition.lang = "es-ES";

recognition.continuous = false;

recognition.onresult =
function(event){

    const speech =
    event.results[0][0]
    .transcript
    .toLowerCase();

    if(
    speech.includes("matrix")
    ){

        toggleMatrix();
    }

    if(
    speech.includes("feliz")
    ){

        setMode("feliz");
    }

    if(
    speech.includes("tranquilo")
    ){

        setMode("tranquilo");
    }

    if(
    speech.includes("creativo")
    ){

        setMode("creativo");
    }

    if(
    speech.includes("motivado")
    ){

        setMode("motivado");
    }

};

function startVoice(){

    recognition.start();

}

/* =========================================
FONDO ESTRELLAS
========================================= */

const canvas =
document.getElementById("bg");

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let stars = [];

for(let i=0;i<120;i++){

    stars.push({

        x:
        Math.random()
        * canvas.width,

        y:
        Math.random()
        * canvas.height,

        size:
        Math.random()*3

    });

}

function animate(){

    ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
    );

    ctx.fillStyle = "white";

    stars.forEach(star=>{

        ctx.beginPath();

        ctx.arc(
        star.x,
        star.y,
        star.size,
        0,
        Math.PI*2
        );

        ctx.fill();

        star.y += 0.3;

        if(
        star.y >
        canvas.height
        ){

            star.y = 0;
        }

    });

    requestAnimationFrame(
    animate
    );

}

animate();

window.addEventListener(
"resize",
()=>{

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

});

/* =========================================
CONTROL TECLADO
========================================= */

let posX = 0;
let posY = 0;

document.addEventListener("keydown", (e)=>{

    const container = document.querySelector(".container");

    switch(e.key){

        case "ArrowUp":
            posY -= 10;
        break;

        case "ArrowDown":
            posY += 10;
        break;

        case "ArrowLeft":
            posX -= 10;
        break;

        case "ArrowRight":
            posX += 10;
        break;

    }

    container.style.transform =
    `translate(${posX}px, ${posY}px)`;

});

let touchStartX = 0;
let touchStartY = 0;


document.addEventListener(
"touchstart",
(e)=>{

    touchStartX =
    e.changedTouches[0].screenX;

    touchStartY =
    e.changedTouches[0].screenY;

});


document.addEventListener(
"touchend",
(e)=>{

    let x =
    e.changedTouches[0].screenX;

    let y =
    e.changedTouches[0].screenY;


    if(x < touchStartX){

        setMode("tranquilo");

    }


    if(x > touchStartX){

        setMode("feliz");

    }


});