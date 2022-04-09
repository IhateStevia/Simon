const buttons = [...$("div[type='button']")];
const soundsLoc = "sounds/";
const soundButtons = [];
var gameSequence = [];
var roundSeguence = [];

initialize();


function initialize(){
  gameSequence=[];
  roundSeguence=[];
  $('body').on("keypress",function(){
    $('body').unbind();
    bindButtons();
    $("#level-title").text("Repeat the pattern");
    nextSeq();
  });
}


///sound buttons constructor
function Button(id, soundSrc,targt) {
  this.id = id;
  this.targt = targt;
  this.soundSrc = soundSrc;
  this.playSound = function() {
    (new Audio(this.soundSrc)).play();
  }
}

///create sound buttons
buttons.forEach(function(bt1) {
  soundButtons.push(new Button(bt1.id, soundsLoc + bt1.id + ".mp3",$("#" + bt1.id)));
});

///bind buttons to soundbuttons
function bindButtons(){
  soundButtons.forEach(function(bt1) {
    $("#" + bt1.id).click(function() {
      bt1.playSound();
      flash($("#" + bt1.id), 100);
      checkSeq(bt1.id,roundSeguence);
    });
  });
}

///unbind buttons
function unbindButtons(){
  soundButtons.forEach(function(bt1) {
    $("#" + bt1.id).unbind();
  });
}

///add .pressed to ellement for "time" ms
function flash(bt1, time) {
  bt1.addClass("pressed");
  setTimeout(function() {
    bt1.removeClass("pressed");
  }, time);
}

function checkSeq(input, sequence) {
  if(input===sequence[0]){
    sequence.splice(0,1);
    console.log("corret");
  }else{
    console.log("wrong");
    gameOver();
  }
  if(sequence.length==0){
    console.log("finish");
    setTimeout(function() {
      nextSeq();
    },500);
  }
}

function gameOver(){
  $("#level-title").html("Game Over! <h6> (Press Any Key to restart) </h2>")
  unbindButtons();
  initialize();
}

function nextSeq(){
  let i=Math.floor(Math.random()*soundButtons.length);
  gameSequence.push(soundButtons[i].id);
  roundSeguence=[...gameSequence];
  flash(soundButtons[i].targt, 100);
  console.log(soundButtons[i].id);
  soundButtons[i].playSound();
}

function sleep(t){
    return new Promise(resolve=>{
      setTimeout(resolve,t);
    })
}

function repeat(ra,t=500,i=0){
  if(ra.length>i){
    sleep(t).then(()=>{
      flash($("#" + ra[i]), 100);
      (new Audio(soundsLoc + ra[i] + ".mp3")).play();
      i++
      repeat(ra,t,i);
    });
  }
  return
}
