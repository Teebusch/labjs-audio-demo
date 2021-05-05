// Script for recording automatically
//
// This script must be added to the "before:prepare" stage.
//
// Note: Browsers block 'unexpected' audio recordings and playback. 
// The experiment must have some interaction before recording. 
//
// author: Tobias Busch (https://github.com/Teebusch)
// date: 2021-05-05


// ***** Configuration *******************
const codec = 'audio/ogg; codecs=opus';
const stop_event = 'keypress(Space)';
// ***************************************



let setupRecorder = function(stream) {
  console.log("Preparing recorder...");
  
  let mediaRecorder = new MediaRecorder(stream);
  let chunks = []; 
 
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

    c.options.datastore.set('audio', audio);
    console.log("data stored...");

    c.end(reason = stop_event);
  }

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  }

  return(mediaRecorder);
}


let c = this;


// add event listener for ending the recording *before prepare!*
c.options.events[stop_event] = (e) => {
    console.log(e);
    if (recorder.state == 'recording') recorder.stop();
  }


// setup recorder as early as possible before run
let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
let recorder = await setupRecorder(stream);


c.waitFor('run').then(() => recorder.start())
