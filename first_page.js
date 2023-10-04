const musicBox = document.querySelector(".music-box");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const music = document.querySelector("#music");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress-bar");
const musicTitle = document.querySelector("#music-title");
const cover = document.querySelector("#cover");
const volumeBar = document.querySelector(".volume-bar");
const volume = document.querySelector(".volume");
const volumeBtn = document.querySelector("#vol");
const myLinkBtn = document.querySelector("#my-link-btn");
const recomendYoutubeBtn = document.querySelector("#recomend-youtube-btn");
const recomendVideoBtn = document.querySelector("#recomend-video-btn");
const myLink = document.querySelectorAll(".my-link");
const recomendYoutube = document.querySelectorAll(".recomend-youtube");
const recomendVideo = document.querySelectorAll(".recomend-video");
const myLinkBox = document.querySelector(".my-link-box");
const recomendYoutubeBox = document.querySelector(".recomend-youtube-box");
const recomendVideoBox = document.querySelector(".recomend-video-box");


const songs = [
    'EVE online - Below The Asteroids', 'EVE online - But Still We Go On', 'Star Citizen - ArcCorp Theme', 'Starbase - Hewn from the Stars'
];
let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song){
    musicTitle.innerText = song;
    music.src = `bgm/${song}.mp3`;
    cover.src = `pic/${song}.jpg`;
}

function playSong(){
    musicBox.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');

    music.play();
}

function pauseSong(){
    musicBox.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');

    music.pause();
}

function prevSong(){
    if(songIndex === 0) songIndex = songs.length-1;
    else songIndex--;

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    if(songIndex === songs.length-1) songIndex = 0;
    else songIndex++;

    loadSong(songs[songIndex]);
    playSong();

}

function updateProgress(e){
    const {duration, currentTime} = e.target;
    const progressPercent = (currentTime / duration)*100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;

    music.currentTime = (clickX / width) *duration;
}

function setVolume(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const value = (clickX / width)
    music.volume = value;
    volume.style.width = `${value * 100}%`;

    if(value > 0.5){
        volumeBtn.querySelector('i.fa-solid').classList.remove('fa-volume-low');
        volumeBtn.querySelector('i.fa-solid').classList.add('fa-volume-high');
    }
    else{
        volumeBtn.querySelector('i.fa-solid').classList.remove('fa-volume-high');
        volumeBtn.querySelector('i.fa-solid').classList.add('fa-volume-low');
    }
}

function muteOrUnmute(){
    if(music.muted){
        volumeBtn.querySelector('i.fa-solid').classList.remove('fa-volume-xmark');
        music.muted = false;
    }
    else{
        volumeBtn.querySelector('i.fa-solid').classList.add('fa-volume-xmark');
        music.muted = true;
    }
}

playBtn.addEventListener('click',() => {
    const isPlaying = musicBox.classList.contains('play');

    if(isPlaying) pauseSong();
    else playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
music.addEventListener('ended', nextSong);
volumeBar.addEventListener('click', setVolume);
volumeBtn.addEventListener('click', muteOrUnmute);
myLinkBtn.addEventListener('click', () => {
    const isOn = myLinkBtn.classList.contains('on');
    if(!isOn){
        myLinkBtn.classList.add('on');
        myLinkBox.classList.add('on');
        recomendYoutubeBtn.classList.remove('on');
        recomendYoutubeBox.classList.remove('on');
        recomendVideoBtn.classList.remove('on');
        recomendVideoBox.classList.remove('on');
        myLink.forEach(element => element.style.display = 'block');
        recomendYoutube.forEach(element => element.style.display = 'hide');
        recomendVideo.forEach(element => element.style.display = 'hide');
    }
});
recomendYoutubeBtn.addEventListener('click', () => {
    const isOn = recomendYoutubeBtn.classList.contains('on');
    if(!isOn){
        myLinkBtn.classList.remove('on');
        myLinkBox.classList.remove('on');
        recomendYoutubeBtn.classList.add('on');
        recomendYoutubeBox.classList.add('on');
        recomendVideoBtn.classList.remove('on');
        recomendVideoBox.classList.remove('on');
        myLink.forEach(element => element.style.display = 'hide');
        recomendYoutube.forEach(element => element.style.display = 'block');
        recomendVideo.forEach(element => element.style.display = 'hide');
    }
});
recomendVideoBtn.addEventListener('click', () => {
    const isOn = recomendVideoBtn.classList.contains('on');
    if(!isOn){
        myLinkBtn.classList.remove('on');
        myLinkBox.classList.remove('on');
        recomendYoutubeBtn.classList.remove('on');
        recomendYoutubeBox.classList.remove('on');
        recomendVideoBtn.classList.add('on');
        recomendVideoBox.classList.add('on');
        myLink.forEach(element => element.style.display = 'hide');
        recomendYoutube.forEach(element => element.style.display = 'hide');
        recomendVideo.forEach(element => element.style.display = 'block');
    }
});