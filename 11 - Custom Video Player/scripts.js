/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const muteButton = player.querySelector('.mute__button')
const fullScreenButton = player.querySelector('.full__screen')

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(){
  const icon = this.paused ? '►' : '❚ ❚';
  // console.log('Update button!')
  toggle.textContent = icon
}
//skip
function skip(){
  video.currentTime += parseFloat(this.dataset.skip)
}
//sliders
let lastVol = video.volume


function handleRangeUpdate(){
  video[this.name] =  this.value
  if(this.name === 'volume') lastVol = video.volume
}
//mute
function muteVolume(){
  if(video.volume > 0) video.volume = 0
  else video.volume =lastVol
}

function fullScreenView(){
  // if(video.volume > 0) video.volume = 0
  // else video.volume =lastVol

  player.setAttribute('class', `player fullscreen player:-webkit-full-screen`)
}

function handleProgress(){
  const percent = (video.currentTime/ video.duration) *100
  progressBar.setAttribute('style', `flex-basis: ${percent}%`)
}

function scrub(e){
  const x = e.offsetX/ progress.offsetWidth
  console.log(video.currentTime, x, video.duration)
  video.currentTime = video.duration * x
}
/*  hook up event listeners*/

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

let mousedown =false
progress.addEventListener('click', scrub)
progressBar.addEventListener('mousemove', (e) => mousedown &&scrub(e))
progressBar.addEventListener('mousedown', () => mousedown = true)
progressBar.addEventListener('mouseup', () => mousedown = false)


muteButton.addEventListener('click', muteVolume)

fullScreenButton.addEventListener('click', fullScreenView)
