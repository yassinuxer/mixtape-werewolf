const audio = document.getElementById('audio');
const playlistItems = document.querySelectorAll('.playlist li');
const currentSong = document.querySelector('.current-song');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const volumeSlider = document.getElementById('volume');

let currentIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
    const song = playlistItems[index].getAttribute('data-src');
    audio.src = song;
    currentSong.textContent = playlistItems[index].textContent;

    playlistItems.forEach(i => i.classList.remove('active'));
    playlistItems[index].classList.add('active');
}

// Play / Pause
function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

audio.addEventListener('play', () => {
    isPlaying = true;
    playBtn.textContent = '⏸️';
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playBtn.textContent = '▶️';
});

// Next / Prev
function nextSong() {
    currentIndex = (currentIndex + 1) % playlistItems.length;
    loadSong(currentIndex);
    audio.play();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + playlistItems.length) % playlistItems.length;
    loadSong(currentIndex);
    audio.play();
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + '%';
});

// Seek in song
document.querySelector('.progress-container').addEventListener('click', e => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// Volume
volumeSlider.addEventListener('input', e => {
    audio.volume = e.target.value;
});

// Playlist click
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        loadSong(currentIndex);
        audio.play();
    });
});

// Button events
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Load first song
loadSong(currentIndex);