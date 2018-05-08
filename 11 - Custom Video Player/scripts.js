const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Get Elements */


function togglePlay(){
  const status = (video.paused)? 'play':'pause';

  video[status]();
}


function updateButton(){
  const button = (video.paused)? '►' : '❚ ❚';
  toggle.textContent = button;
}

function skip(){

  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){

  video[this.name] = this.value;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration )  * 100;


  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){

  if(mousedown){
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;

  }


}


video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach( (btn) => btn.addEventListener('click', skip));

ranges.forEach( (range) => range.addEventListener('change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown=false);
