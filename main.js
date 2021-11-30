
img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('dog_cat.jpg');
  song = loadSound("music.mp3");
}


function setup() {
  canvas = createCanvas(380, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380,300);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image( video, 0, 0, 380, 300);

      if(status != "")
      {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          if(objects[i].label = "person"){
            document.getElementById("baby_detection").innerHTML = "Baby detected";
            song.stop();
          }else if(objects[i].label != "person"){
            document.getElementById("baby_detection").innerHTML = "Baby is not detected";
            song.play();
            song.setVolume(1);
            song.rate(1);
          }
          document.getElementById("status").innerHTML = "Status : Object Detected";
          fill(r, b, g);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(r, b, g);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}
