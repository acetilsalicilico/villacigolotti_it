import '@barba/css'
import navbarAnimation from './components/navbar.js'
import { animationSettings } from './utils/animationVars'
import { loadGoogleMapsApi } from './utils/googlemaps'
import { gsap, ScrollTrigger, SplitText } from './utils/gsapInit'
import initMediaEffects from './utils/media-effects'
import initPageTransitions from './utils/pageTransitions'
import initParallax from './utils/parallax.js'
import { initScroll } from './utils/scroll.js'
import initTextEffects from './utils/text-effects'
// main.js

// Call the function to load the Google Maps API
loadGoogleMapsApi()

gsap.registerPlugin(ScrollTrigger, SplitText)

// Function to reinitialize Webflow scripts after Barba transition
export function resetWebflow(data) {
  let parser = new DOMParser()
  let dom = parser.parseFromString(data.next.html, 'text/html')
  let webflowPageId = dom.querySelector('html').getAttribute('data-wf-page')
  document.querySelector('html').setAttribute('data-wf-page', webflowPageId)
  if (window.Webflow) {
    window.Webflow.destroy()
    window.Webflow.ready()
    window.Webflow.require('ix2').init()
  }
}

// Function to control and restart all background videos based on shouldPlay
export function restartBackgroundVideos() {
  document.querySelectorAll('.w-background-video video').forEach((video) => {
    video.pause()
    video.currentTime = 0 // Reset video to start

    // Wait for the video to be ready to play again
    function playVideoWhenReady() {
      video
        .play()
        .then(() => {
          console.log('Video playback started successfully')
        })
        .catch((error) => {
          console.error('Error attempting to play video:', error)
        })
    }

    if (video.readyState >= 2) {
      playVideoWhenReady()
    } else {
      video.addEventListener('canplay', playVideoWhenReady, { once: true })
    }
  })
}

// Function to initialize animations and functionalities for each page
export function initPage() {
  initScroll(animationSettings)
  initTextEffects(animationSettings)
  initMediaEffects(animationSettings)
  initParallax()
}

document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions()
  //restartBackgroundVideos()
})
