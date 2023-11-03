// Custom Video Player

// Variables
const container = document.querySelector(".container");
const video = document.getElementById('myVideo');
const fileInput = document.getElementById('fileInput');
const mainVideo = container.querySelector("video");
const videoTimeline = container.querySelector(".video-timeline");
const progressBar = videoTimeline.querySelector(".progress-bar");
const volumeTitle = container.querySelector(".volume");
const volumeBtn = document.querySelector(".volume span");
const volumeSlider = document.querySelector(".left input");
const currentVidTime = document.querySelector(".current-time");
const videoDuration = document.querySelector(".video-duration");
const skipBackward = document.querySelector(".skip-backward span");
const skipForward = document.querySelector(".skip-forward span");
const playPauseTitle = document.querySelector(".play-pause");
const playPauseBtn = document.querySelector(".play-pause span");
const speedBtn = document.querySelector(".playback-speed span");
const speedOptions = document.querySelector(".speed-options");
const pipBtn = document.querySelector(".pic-in-pic span");
const fullScreenTitle = document.querySelector(".fullscreen");
const fullScreenBtn = document.querySelector(".fullscreen span");
let timer;

// New File
fileInput.addEventListener('change', function() {
    const file = this.files[0];
    const objectURL = URL.createObjectURL(file);
    video.src = objectURL;
    mainVideo.play();
});

// Display Volume Range
volumeBtn.addEventListener("mousemove", () => {
    volumeSlider.style.display = "block";
    volumeSlider.style.marginLeft = "3px";  
});

// Hide Controls
const hideControls = () => {
    if(mainVideo.paused) return;
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
        volumeSlider.style.display = "none";
    }, 4000);
}

hideControls();

container.addEventListener("mousemove", () => {
    container.classList.add("show-controls");
    clearTimeout(timer);
    hideControls();   
});

// Time Format
const formatTime = time => {
    let seconds = Math.floor(time % 60),
        minutes = Math.floor(time / 60) % 60,
        hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0) {
        return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

// Video Timeline
const updateProgress = () => {
    const currentTime = mainVideo.currentTime;
    const duration = mainVideo.duration;
    const percent = (currentTime / duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentVidTime.innerText = formatTime(currentTime);
};

videoTimeline.addEventListener("mousemove", e => {
    let timelineWidth = videoTimeline.clientWidth;
    let offsetX = e.offsetX;
    offsetX = offsetX < 20 ? 20 : (offsetX > timelineWidth - 20) ? timelineWidth - 20 : offsetX;
    const progressTime = videoTimeline.querySelector("span");
    progressTime.style.left = `${offsetX}px`;
    const percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
    progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", e => {
    let timelineWidth = videoTimeline.clientWidth;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", updateProgress);

mainVideo.addEventListener("loadeddata", () => {
    videoDuration.innerText = formatTime(mainVideo.duration);
    updateProgress();
});

const draggableProgressBar = e => {
    let timelineWidth = videoTimeline.clientWidth;
    progressBar.style.width = `${e.offsetX}px`;
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    currentVidTime.innerText = formatTime(mainVideo.currentTime);
}

// Volume 
volumeSlider.addEventListener("input", e => {
    mainVideo.volume = e.target.value;
    if(e.target.value == 0) {
        volumeTitle.title = "Unmute";
        volumeBtn.textContent = 'volume_off';
    } else {
        volumeBtn.textContent = 'volume_up';
        volumeTitle.title = "Mute";
    }
});

// Mute & Unmute
const tempVolume = volumeSlider.value;

volumeBtn.addEventListener("click", () => {
    if (volumeSlider.value == 0) {
        mainVideo.volume = tempVolume;
        volumeBtn.textContent = 'volume_up';
        volumeTitle.title = "Mute";
        volumeSlider.value = mainVideo.volume;
    } else if (volumeBtn.innerHTML == 'volume_off') {
        mainVideo.volume = tempVolume;
        volumeBtn.textContent = 'volume_up';
        volumeTitle.title = "Mute";
    } else {
        mainVideo.volume = 0.0;
        volumeBtn.textContent = 'volume_off';
        volumeTitle.title = "Unmute";
    }
});

// Video Speed 
speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click", () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});

document.addEventListener("click", e => {
    if (e.target.tagName !== "SPAN" || e.target.className !== "material-symbols-rounded") {
        speedOptions.classList.remove("show");
    }
});

// Full Screen
fullScreenBtn.addEventListener("click", () => {
    container.classList.toggle("fullscreen");
    if (document.fullscreenElement) {
        fullScreenBtn.textContent = 'fullscreen';
        fullScreenTitle.title = "Full screen";
        document.exitFullscreen();
    } else {
        fullScreenBtn.textContent = 'fullscreen_exit';
        fullScreenTitle.title = "Exit Full screen";
        container.requestFullscreen();
    }
});

// Buttons Functions
speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => mainVideo.currentTime -= 10);
skipForward.addEventListener("click", () => mainVideo.currentTime += 10);
mainVideo.addEventListener("play", () => { 
    playPauseBtn.textContent = 'pause'; 
    playPauseTitle.title = 'Pause';
});

mainVideo.addEventListener("pause", () => { 
    playPauseBtn.textContent = 'play_arrow'; 
    playPauseTitle.title = 'Play';
});

// Custom Video Player

// ... (previous code)

// Pause Video with Spacebar
document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault(); // Prevent page scrolling on spacebar press
        if (mainVideo.paused) {
            mainVideo.play();
        } else {
            mainVideo.pause();
        }
    }
});

// Custom Video Player

// Variables
// (Your existing variable declarations)

// Function to toggle play/pause
function togglePlayPause() {
    if (mainVideo.paused) {
        mainVideo.play();
    } else {
        mainVideo.pause();
    }
}

// Add a click event listener to the whole video player container
container.addEventListener("click", togglePlayPause);

// Function to handle double clicks
function handleDoubleClick(e) {
    const clickX = e.clientX;
    const playerRect = container.getBoundingClientRect();
    const playerWidth = playerRect.width;

    const clickPosition = (clickX - playerRect.left) / playerWidth;

    if (e.detail === 2) {
        // Double click detected
        if (clickPosition < 0.3) {
            // Double click on the left part of the player, skip 10 seconds backward
            mainVideo.currentTime -= 10;
            addSkipSign("<<10sec", clickX, e.clientY);
        } else if (clickPosition > 0.7) {
            // Double click on the right part of the player, skip 10 seconds forward
            mainVideo.currentTime += 10;
            addSkipSign(">>10sec", clickX, e.clientY);
        }
    }
}

container.addEventListener("dblclick", handleDoubleClick);

// ... (rest of the code)



// ... (rest of the code)


playPauseBtn.addEventListener("click", () => mainVideo.paused ? mainVideo.play() : mainVideo.pause());
videoTimeline.addEventListener("mousedown", () => videoTimeline.addEventListener("mousemove", draggableProgressBar));
document.addEventListener("mouseup", () => videoTimeline.removeEventListener("mousemove", draggableProgressBar));


// Add event listener to detect keyboard inputs
document.addEventListener("keydown", (e) => {
    // Right arrow key (→) - Forward 10 seconds
    if (e.key === "ArrowRight") {
        mainVideo.currentTime += 10;
    }
    // Left arrow key (←) - Backward 10 seconds
    else if (e.key === "ArrowLeft") {
        mainVideo.currentTime -= 10;
    }
    // "k" key - Play/Pause toggle
    else if (e.key === "k") {
        togglePlayPause();
    }
    // "j" key - Forward 10 seconds
    else if (e.key === "l") {
        mainVideo.currentTime += 10;
    }
    // "l" key - Backward 10 seconds
    else if (e.key === "j") {
        mainVideo.currentTime -= 10;
    }
    // Up arrow key (↑) - Increase volume by 5%
    else if (e.key === "ArrowUp") {
        if (mainVideo.volume < 1) {
            mainVideo.volume += 0.05;
            volumeSlider.value = mainVideo.volume;
        }
    }
    // Down arrow key (↓) - Decrease volume by 5%
    else if (e.key === "ArrowDown") {
        if (mainVideo.volume > 0) {
            mainVideo.volume -= 0.05;
            volumeSlider.value = mainVideo.volume;
        }
    }
});

// Function to add a skip sign (e.g., ">>10sec" or "<<10sec") at a specified position
function addSkipSign(sign, x, y) {
    const skipSign = document.createElement("div");
    skipSign.className = "skip-sign";
    skipSign.textContent = sign;
    skipSign.style.left = x + "px";
    skipSign.style.top = y + "px";
    container.appendChild(skipSign);
    setTimeout(() => {
        container.removeChild(skipSign);
    }, 1000);
}
