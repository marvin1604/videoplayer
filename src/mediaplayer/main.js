import {videoSources} from './video-data.js';
window.onload = inicio;

// const videos = ["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4","http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
// "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"];
var videoActual = 0;
var vid;
function inicio(){
    console.log("comenzamos");
    vid = document.querySelector("video");
    vid.src = `${videoSources[videoActual].sources}`;
    reproducir();
    //tiempo del video
    vid.onloadeddata = actualizar;
    vid.ontimeupdate = actualizar;
}
const player = document.querySelector(".play");
const videoShow = document.querySelector("#fila1");
const volumen = document.querySelector(".volumen");
const next = document.querySelector(".siguiente");
const reload = document.querySelector(".reiniciar");
const reduce = document.querySelector(".reducir");
const containerControls = document.querySelector("#fila3");
const tiempo = document.querySelector(".estado");


player.addEventListener("click", play);
videoShow.addEventListener("click", play);
volumen.addEventListener("click", volumenShow);
next.addEventListener("click", siguiente);
reload.addEventListener("click", reiniciar);
reduce.addEventListener("click", reducir);

function play(){
    if(vid.paused){
        vid.play();
        player.src="../img/pause-svgrepo-com.svg"
    }else{
        vid.pause()
        player.src="https://i.postimg.cc/wTbJgPGZ/play-button-svgrepo-com.png"
    }
}

function volumenShow(){
    if(vid.volume == 1){
        vid.volume = 0;
        volumen.src = "https://i.postimg.cc/BZDqpMBP/silence-svgrepo-com.png";
    }else{
        vid.volume = 1;
        volumen.src = "https://i.postimg.cc/QxM1Ls0c/volume-svgrepo-com.png";
    }
}

function reproducir(){
    vid.src = `${videoSources[videoActual].sources}`;
    // vid.play();
}

function siguiente(){
    videoActual++;
    if(videoActual >= videoSources.length){
        videoActual=0
    }
    reproducir();
}
function reiniciar(){
    vid.currentTime = 0;
}

function reducir(){
    if (vid.classList.contains('fullscreen')) {
        vid.classList.remove('fullscreen');
        containerControls.classList.remove('fullscreen-controls');
      } else {
        vid.classList.add('fullscreen');
        containerControls.classList.add('fullscreen-controls');
      }
}

function actualizar(){
    tiempo.innerHTML = `${convertir(vid.currentTime)} / ${convertir(vid.duration)}`

    let porcentaje = (100 * vid.currentTime) / vid.duration;

    document.querySelector(".barra2").style.width= `${porcentaje}%`
}

function convertir(segundos){
    let d = new Date(segundos*1000);
    let segundo = (d.getSeconds()<=9) ? "0" + d.getSeconds() : d.getSeconds();
    let minuto = (d.getMinutes()<=9) ? "0" + d.getMinutes() : d.getMinutes();
    return `${minuto} : ${segundo}`
}