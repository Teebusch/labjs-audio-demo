[![Netlify Status](https://api.netlify.com/api/v1/badges/ec9e9d14-45c6-4d01-be27-6b310078c0de/deploy-status)](https://app.netlify.com/sites/labjs-audio-demo/deploys)

# Lab.js Audio Recording Demo

This is a demo experiment, showing how to make audio recordings in a [lab.js](https://lab.js.org/) experiment. It is inspired by a script by [Kwame Porter Robinson](https://github.com/robinsonkwame/lab-js-recording-task) and [Mozilla's Media Recording API tutorial](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API)

On each trial audio is recorded from the microphone using the [MediaRecorderAPI](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder). There's two types of trials:

- trial with a record button (optional, the recorded clip can be shown on the page). This can be used for testing audio or when timing is not critical
- trial without a record button that starts automatically and ends when the user presses a key. The key can be configured. The trial automatically progressing to the next trial after key press.

On the last screen, the data is downloaded as a `.csv` file, with the audio encoded as Base64 strings in the `audio` column. Base64 strings can be converted to individual audio files using a Python/R/JavaScript script or a website such as https://base64.guru/. 

## Demo

A demo of this experiment is available online at [labjs-audio-demo.netlify.app](https://labjs-audio-demo.netlify.app)

**Note:** Your audio will not be stored on the Netlify servers (an additional "Goodbye" screen has been inserted to prevent form submission).


## Usage

Download <a href="https://raw.githubusercontent.com/Teebusch/labjs-audio-demo/main/labjs-audio-recording-demo.study.json" download>labjs-audio-recording-demo.study.json</a>, import into lab.js and run it.

In the `process` folder there is a simple R script that will extract the audio data from the csv.


## Known Issues

- May not work correctly if other browsers / browser windows are accessing the WebAudio API (recording or playing sound) at the same time.

## Gotcha's

- The Base64 string cannot be directly decoded as Base64 without first removing the Data-URL declaration preceding the Base64-encoded data. That is, remove the following part from the string: `data:audio/ogg; codecs=opus;base64,`. 
- Excel is struggling with the Base64 encoded data, because it can easily exceed the character limit for a cell. If you open this file in Excel it might add unwanted linebreaks / rows. Better open it in a text exitor like VSCode or R. 
- Once extracted, the filetype of the audio is `.ogg`. Not all media players can play ogg files. ???[VLC](https://www.videolan.org/) is a good free audio player that can play ogg.

_Further comments and instructions in the code._

## License

The code is licensed under the MIT license. Use it as you like. No guarantees from my side! Do proper testing before using this for important experiments. If you have question or issues, [open an issue in the repository](https://github.com/Teebusch/labjs-audio-demo/issues).

The images are licensed under Creative Commons Zero (CC0) and free for personal and commercial use. No attribution required. 
The images can be found here: 

- [cat 1](https://pikwizard.com/photo/cat-feline-animal/7279b97ed27648d80e7682a516245eeb")
- [cat 2](https://pikwizard.com/photo/kitten-cat-kitty-pet/21a5050e2ff703912cdd5faabcdd9840)


