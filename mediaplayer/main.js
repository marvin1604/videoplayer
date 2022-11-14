import {videoSources} from './video-data.js';
window.onload = inicio;

// const videos = ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"];
var videoActual = 0;
var vid;
let titulo = document.querySelector(".title");
let descripcion = document.querySelector(".descripcion");
let containerCard = document.querySelector("#container-cards");

function inicio(){
    console.log("comenzamos");
    vid = document.querySelector("video");    
    vid.src = `${videoSources[videoActual].sources}`;
    titulo.innerHTML = `${videoSources[videoActual].title}`;
    descripcion.innerHTML = `${videoSources[videoActual].description}`;
    reproducir();
    //tiempo del video
    vid.onloadeddata = actualizar;
    vid.ontimeupdate = actualizar;
}

function barraLateral(){
    videoSources.forEach(element => {

        const card = document.createElement("div");
        card.classList = "card";
        

        const imagen = document.createElement("img");
        imagen.src = `${element.thumb}`;
        imagen.classList = "imagen-card";

        const tituloCard = document.createElement("h3");
        tituloCard.innerText = `${element.title}`;
        tituloCard.classList = "titulo-card";

        const autorCard = document.createElement("h4");
        autorCard.innerText = `${element.author}`;

        const cardInfo = document.createElement("div");
        cardInfo.classList = "cardInfo";

        card.onclick = () => {
            const index = videoSources.indexOf(element);
            console.log(index);
            videoActual = index;
            inicio();
        };

        cardInfo.append(tituloCard, autorCard);
        card.append(imagen, cardInfo);
        containerCard.appendChild(card);
    });
}

const player = document.querySelector(".play");
const videoShow = document.querySelector("#fila1");
const volumen = document.querySelector(".volumen");
const next = document.querySelector(".siguiente");
const reload = document.querySelector(".reiniciar");
const reduce = document.querySelector(".reducir");
const containerControls = document.querySelector("#fila3");
const tiempo = document.querySelector(".estado");
const volumeRange = document.querySelector("#volume-range");
const videoTime = document.querySelector("#video-time");


player.addEventListener("click", play);
videoShow.addEventListener("click", play);
next.addEventListener("click", siguiente);
reload.addEventListener("click", reiniciar);
reduce.addEventListener("click", reducir);


function play(){
    if(vid.paused){
        vid.play();
        player.src="https://cdn-icons-png.flaticon.com/512/16/16427.png"
    }else{
        vid.pause()
        player.src="https://i.postimg.cc/wTbJgPGZ/play-button-svgrepo-com.png"
    }
}

/* play y reinicio */
function reproducir(){
    vid.src = `${videoSources[videoActual].sources}`;
    vid.play();
}

function reiniciar(){
    vid.currentTime = 0;
    reproducir();
}

/* boton reiniciar */
function siguiente(){
    videoActual++;
    if(videoActual >= videoSources.length){
        videoActual=0
    }
    reproducir();
    titulo.innerHTML = `${videoSources[videoActual].title}`;
    descripcion.innerHTML = `${videoSources[videoActual].description}`;
}


/* ampliar y reducir pantalla */
function reducir(){
    if (vid.classList.contains('fullscreen')) {
        vid.classList.remove('fullscreen');
        containerControls.classList.remove('fullscreen-controls');
        } else {
        vid.classList.add('fullscreen');
        containerControls.classList.add('fullscreen-controls');
        }
}

/* control del tiempo */
function actualizar(){
    tiempo.innerHTML = `${convertir(vid.currentTime)} / ${convertir(vid.duration)}`
    let porcentaje = (100 * vid.currentTime) / vid.duration;
    videoTime.value = porcentaje;
    
}

function reloadTime(){
    vid.pause();
    let nuevoTime = (videoTime.value * vid.duration)/100;
    console.log(nuevoTime);
    vid.currentTime = nuevoTime;
    vid.play();
}

function convertir(segundos){
    let d = new Date(segundos*1000);
    let segundo = (d.getSeconds()<=9) ? "0" + d.getSeconds() : d.getSeconds();
    let minuto = (d.getMinutes()<=9) ? "0" + d.getMinutes() : d.getMinutes();
    return `${minuto} : ${segundo}`
}

/* control-volumen*/
const setInitialVolume = () => {
    vid.volume = 1;
    volumeRange.value = 100;
};
const setVolume = () => {
    vid.volume = volumeRange.value / 100;
    if (vid.volume > 0) {
        turnOnVolumeButton();
    } else {
        turnOnMuteButton();
    }
};

const turnOnVolumeButton = () => {
    volumen.src = "https://i.postimg.cc/QxM1Ls0c/volume-svgrepo-com.png";
};

const turnOnMuteButton = () => {
    volumen.src = "https://i.postimg.cc/BZDqpMBP/silence-svgrepo-com.png";
};
function volumenShow(){
    if(vid.volume == 1){
        vid.volume = 0;
        volumen.src = "https://i.postimg.cc/BZDqpMBP/silence-svgrepo-com.png";
    }else{
        vid.volume = 1;
        volumen.src = "https://i.postimg.cc/QxM1Ls0c/volume-svgrepo-com.png";
    }
}

volumeRange.addEventListener("input", setVolume);
volumen.addEventListener("click", volumenShow);
videoTime.addEventListener("input", reloadTime);
window.addEventListener("load",reproducir);
barraLateral();
setInitialVolume();