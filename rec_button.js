// Script for making recording with start/stop button
//
// This also checks whether audio recording is supported by the 
// browser. The trials don't check this again!
//
// Add this to the "before:prepare" stage and make sure there
// are HTML elements to use as buttons & to show the clip.
//
// Note: Browsers block 'unexpected' audio recordings and playback. 
// The experiment must have some interaction before recording. 

// TODO: Check which codecs are supported and adapt automatically.
// TODO: use lab.js to abort experiment instead of "alert()"
//
// author: Tobias Busch (https://github.com/Teebusch)
// date: 2021-05-05


// ***** Configuration *******************************************
// HTML ids of interface elements or `false` to deactivate
const rec_button = 'recBtn';
const clip_list = false; //'clips'; 

// Start recording when screen is shown?
const auto_start = false; 

// Store this recording in lab.js data store?
// `false` to deactivate, e.g. for test recording
const save_audio = true;  

// Audio codec to use for the recording.
// Supported codecs vary between browsers. Hopefully this one 
// works across all modern browsers.
const codec = 'audio/ogg; codecs=opus'
// ***************************************************************


let setupRecorder = function(stream) {
  console.log("Preparing recorder...");
  
  let mediaRecorder = new MediaRecorder(stream);
  let chunks = []; 
  let audioURL;
 
  mediaRecorder.onstart = function() {
    console.log("Recording started...");
  }

  mediaRecorder.onstop = async function() {
    console.log("Recording stopped...");

    blobToAudio = (blob) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(blob);
      })
    }

    const blob = new Blob(chunks, { 'type' : codec });
    let audio = await blobToAudio(blob);

    console.log(
      `Chunk length: ${ chunks.length }, blob size: ${ blob.size }.`,
      blob.size ? ' Looks ok!' : ' No sound was recorded!'
    );

    if (save_audio) {
      c.options.datastore.set('audio', audio);
      console.log("data stored...");
    }

    if (clip_list) { 
      if (audioURL) window.URL.revokeObjectURL(audioURL);
      audioURL = window.URL.createObjectURL(blob);
      updateClip(audioURL);
    }

    chunks = [];
  }

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  }

  return(mediaRecorder);
}


// add event handlers and styling to record button when ready
const activateRecButton = function(recorder) {
  const recBtn = document.getElementById(rec_button);
  recBtn.disabled = false;

  if (recorder.state == "recording") {
    recBtn.classList.add("recording")
  }
  
  recBtn.onclick = function(e) {
    e.preventDefault()

    if (recorder.state == "recording") {
      recorder.stop();
      recBtn.classList.remove("recording")
    } else {
      recorder.start();
      recBtn.classList.add("recording")
    }
  }
}


// add audioclip to interface
const updateClip = function(audioURL) {
  const clip = document.createElement('article');
  const audio = document.createElement('audio');
  audio.src = audioURL;
  audio.controls = true;
  clip.appendChild(audio);
  
  // remove old clip, only show one clip at a time
  const clipList = document.getElementById(clip_list);
  clipList.removeChild(clipList.firstChild);
  clipList.appendChild(clip);
}


let c = this;  // labjs component


if (navigator.mediaDevices.getUserMedia) {

  // setup recorder as early as possible before run
  let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  let recorder = await setupRecorder(stream);

  c.waitFor('run').then(() => { 
      if (auto_start) recorder.start();
      if (rec_button) activateRecButton(recorder);
  })

} else {
  alert('Audio recording not supported by your browser!');
}


