img="";
status = "";
object = [];

//id="status"

function preload(){
    img=loadImage("CaptainChurchill.png");
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status != ""){
        objectDetector.detect(video, gotDetection);
        r=random(255);
        g=random(255);
        b=random(255);
        for (i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : Object(s) Detected";
            document.getElementById("number").innerHTML="No. of objects detected: "+object.length;
            fill(r,g,b);
            percentage = floor(object[i].confidence * 100);
            text(object[i].label+" "+percentage+"%",object[i].x + 25,object[i].y + 25);
            textSize(20);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}

function modelLoaded(){
    console.log("ModelLoaded +");
    status = true;
}

function gotDetection(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        object = result;
    }
}