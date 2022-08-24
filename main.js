video=" ";
status1=" ";
objects=[];
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

}
function preload(){
    video=createVideo("video.mp4");
    video.hide()
}
function gotResults(error, result){
    if (error){
        console.log(error);
    }
    else {
        console.log(result);
        objects=result;

    }
}
function draw(){
    image(video,0,0,600,500);
    if(status1!=" "){
        Object_detector.detect(video,gotResults);
        for(i=0; i<objects.length;i++ )
        {   document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("number_of_objects").innerHTML="No. Of Objects Detected Are"+objects.length;
            if(objects[i].label==search){
                document.getElementById("status").innerHTML="we found "+search;
            }
            fill("yellow");
            textSize(25);
            textStyle(BOLD);
            stroke("green");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent +"%" , objects[i].x+15, objects[i].y+25);
            noFill();

            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start(){
    Object_detector=ml5.objectDetector("cocossd",modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects"
    search=document.getElementById("search_box").value;
}
function modelLoaded(){
    console.log("Model Has Been Loaded");
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
