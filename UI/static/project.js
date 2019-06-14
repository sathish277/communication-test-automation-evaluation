//webkitURL is deprecated but nevertheless 
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia() 
var rec;
//Recorder.js object 
var input;
//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;
//new audio context to help us record 
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
// var submitBut = document.getElementById("submitBut");
//var pauseButton = document.getElementById("pauseButton");
//add events to those 3 buttons 
recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
// submitBut.addEventListener("click",submit_res);
function startRecording() { console.log("recordButton clicked"); 

/* Simple constraints object, for more advanced audio features see

https://addpipe.com/blog/audio-constraints-getusermedia/ */

var constraints = {
    audio: true,
    video: false
} 
/* Disable the record button until we get a success or fail from getUserMedia() */

recordButton.disabled = true;
stopButton.disabled = false;

/* We're using the standard promise based getUserMedia()

https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
    /* assign to gumStream for later use */
    gumStream = stream;
    /* use the stream */
    input = audioContext.createMediaStreamSource(stream);
    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
    rec = new Recorder(input, {
        numChannels: 1
    }) 
    //start the recording process 
    rec.record()
    console.log("Recording started");
}).catch(function(err) {
    //enable the record button if getUserMedia() fails 
    recordButton.disabled = false;
    stopButton.disabled = true;
});
}






// function pauseRecording() {
//     console.log("pauseButton clicked rec.recording=", rec.recording);
//     if (rec.recording) {
//         //pause 
//         rec.stop();
//         pauseButton.innerHTML = "Resume";
//     } else {
//         //resume 
//         rec.record()
//         pauseButton.innerHTML = "Pause";
//     }
// }

function stopRecording() {
    console.log("stopButton clicked");
    //disable the stop button, enable the record too allow for new recordings 
    stopButton.disabled = true;
    recordButton.disabled = false;
    
    //tell the recorder to stop the recording 
    rec.stop(); //stop microphone access 
    gumStream.getAudioTracks()[0].stop();

    //Recorder.forceDownload(e, "filename.wav");
    //create the wav blob and pass it on to createDownloadLink 
    rec.exportWAV(createDownloadLink);
    
}

// function submit_res(){
    
//     // rec.exportWAV(createDownloadLink);
//     rec.exportWAV(function(audio) {
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", 'http://localhost:5000/arr', true);
//     xhr.setRequestHeader("content-type", "audio/wav");
    
//     xhr.send(audio);
// });






function createDownloadLink(blob) {
    // var name='harshu';
    //     ajax({
    //       type: "POST",
    //       contentType: "application/json;charset=utf-8",
    //       url: "/your/flask/endpoint",
    //       traditional: "true",
    //       data: JSON.stringify({name}),
    //       dataType: "json"
    //       });
    
    // var $SCRIPT_ROOT = '{{ request.script_root|tojson|safe }}'; 
    // var url = URL.createObjectURL(blob);
    // var name="harshu";
    //document.getElementById('id').innerHTML=`name`;
    // $.postJSON($SCRIPT_ROOT + '/arr', {
    //     post: 'harshu'
    //     }, function(data) {
    //         console.log('nice')
    //         }
    //     );

    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET","http://localhost/arr");

    // xmlhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    // xmlhttp.send(JSON.stringify({name: "world"}));
    // window.location.href = "http://localhost:5000/arr";
serverUrl = 'http://localhost:5000/messages'

fetch(serverUrl,{
    method:"POST",
    body:blob
});


 var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('p');
    var link = document.createElement('a');
    var fin = document.createElement('p');
    var node2 = document.createTextNode('You got an accuracy of ');
    var node3 = document.createTextNode('Next Word');
    var but = document.createElement('button');
    //var para = document.createElement('p');
    var node=document.createTextNode('Listen to your recording');
    //add controls to the <audio> element 
    au.controls = true;
    au.src = url;

    paras.appendChild(node)
    link.href = url;
    link.download = new Date().toISOString() + '.wav';
    link.innerHTML = link.download;



    li.style.color='rgb(20, 10, 60)';
    au.style.paddingLeft='50px';
    au.style.paddingTop = '40px';
    
    but.style.borderWidth='4px';
    but.style.borderColor='rgb(21, 153, 242)';
    but.style.marginLeft = '600px';
    but.appendChild(node3);
    butt.appendChild(but);

    //li.appendChild(link);
    //add the li element to the ordered list 
    recordingsList.appendChild(au);
    //nextButton.appendChild(node3);
    final.appendChild(node2);
    window.location.href="http://localhost:5000/pred";

    //links.appendChild(link);
// console.log('submit clicked');
//     var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
// var theUrl = "http://localhost:5000/arr";
// xmlhttp.open("POST", theUrl);
// xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
// xmlhttp.send(JSON.stringify({ "email": "hello@user.com" }));


//  window.location.href = "http://localhost:5000/arr";


// var names='harshu'
// $.ajax({
//           type: "POST",
//           contentType: "application/json;charset=utf-8",
//           url: "http://localhost:5000/arr",
//           traditional: "true",
//           data: JSON.stringify({names}),
//           dataType: "json"
//           });

// var arr = { City: 'Moscow', Age: 25 };
// $.ajax({
//     url: 'http://localhost:5000/arr',
//     type: 'POST',
//     data: JSON.stringify(arr),
//     contentType: 'application/json; charset=utf-8',
//     dataType: 'json',
//     async: false,
    
// });
// outputData = { City: 'Moscow'};
// $.post( "/arr", {
//       canvas_data: JSON.stringify(outputData)
//     }, function(err, req, resp){
//       console.log("gud")
//     });
// var movies = {
//     'title': 'harshu',
//     'release_date':'234'
//     }

// $.ajax({
// url: Flask.url_for('array2python'),
// type: 'POST',
// data: JSON.stringify(movies),   // converts js value to JSON string
// });


// window.location.href = "http://localhost:5000/arr";


//     var au = document.createElement('audio');
//     var li = document.createElement('p');
//     var link = document.createElement('a');
//     var fin = document.createElement('p');
//     var node2 = document.createTextNode('You got an accuracy of 90%');
//     var node3 = document.createTextNode('Next Word');
//     var but = document.createElement('button');
//     var para = document.createElement('p');
//     var node=document.createTextNode('Listen to your recording');
//     add controls to the <audio> element 
//     au.controls = true;
//     au.src = url;

//     paras.appendChild(node)
//     link.href = url;
//     link.download = new Date().toISOString() + '.wav';
//     link.innerHTML = link.download;
//     add the new audio and a elements to the li element 
//     li.appendChild(au);

//     li.style.color='rgb(20, 10, 60)';
//     au.style.paddingLeft='50px';
//     au.style.paddingTop = '40px';
    
//     but.style.borderWidth='4px';
//     but.style.borderColor='rgb(21, 153, 242)';
//     but.style.marginLeft = '600px';
//     but.appendChild(node3);
//     butt.appendChild(but);

//     li.appendChild(link);
//     add the li element to the ordered list 
//     recordingsList.appendChild(au);
//     nextButton.appendChild(node3);
//     final.appendChild(node2);
//     links.appendChild(link);
};



