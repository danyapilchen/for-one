const socket = io();
const instruction1 = 'Click the button above to start listening to the piece.';
const instruction2 = 'After that, you will see a flash of red light every time I send the message.'
const instruction3 = 'You may or may not receive the message for each message is addressed to only one listener at a time.';

let onButtonclick = false;
let metro = 0;
let sampler;
const $p = document.querySelector('body').querySelector('p');
const $btn = document.querySelector('body').querySelector('#activate');

$btn.addEventListener('click',(e)=>{
  
  socket.emit('client',()=>{
    onButtonclick = true;
    console.log('received');
    initTone();
  });
})
const initTone = ()=>{
  Tone.Transport.start();
  sampler = new Tone.Players(samples).toMaster();
  sampler.volume.value = -30; 
  sampler.fadeIn = 0.05;
  sampler.fadeOut = 0.05;
}
const samples ={
    'C1':'./samples/soloSample1.mp3',
    'C#1':'./samples/soloSample2.mp3',
    'D1':'./samples/soloSample3.mp3',
    'D#1':'./samples/soloSample4.mp3',
    'E1':'./samples/soloSample5.mp3',
    'F1':'./samples/soloSample6.mp3',
    'F#1':'./samples/soloSample7.mp3',
    'G1':'./samples/soloSample8.mp3',
    'G#1':'./samples/soloSample9.mp3',
    'A1':'./samples/soloSample10.mp3',
    'A#1':'./samples/soloSample11.mp3',
    'B1':'./samples/soloSample12.mp3',
    'C2':'./samples/soloSample13.mp3',
    'C#2':'./samples/soloSample14.mp3',
    'D2':'./samples/soloSample15.mp3',
    'D#2':'./samples/soloSample16.mp3',
    'E2':'./samples/soloSample17.mp3',
    'E2':'./samples/soloSample18.mp3',
    'F2':'./samples/soloSample19.mp3',
    'F#2':'./samples/soloSample20.mp3',
    'G2':'./samples/soloSample21.mp3',
    'G#2':'./samples/soloSample22.mp3',
    'A2':'./samples/soloSample23.mp3',
    'A#2':'./samples/soloSample24.mp3',
    'B2':'./samples/soloSample25.mp3',
    'C3':'./samples/soloSample26.mp3',
    'C#3':'./samples/soloSample27.mp3',
    'D3':'./samples/soloSample28.mp3',
    'D#3':'./samples/soloSample29.mp3',
    'E3':'./samples/soloSample30.mp3',
    'F3':'./samples/soloSample31.mp3',
    'F#3':'./samples/soloSample32.mp3',
    'G3':'./samples/soloSample33.mp3',
    'G#3':'./samples/soloSample34.mp3',
    'A3':'./samples/soloSample35.mp3',
    'A#3':'./samples/soloSample36.mp3',
    'B3':'./samples/soloSample37.mp3',
    'C4':'./samples/soloSample38.mp3',
    'C#4':'./samples/soloSample39.mp3',
    'D4':'./samples/soloSample40.mp3',
    'D#4':'./samples/soloSample41.mp3',
    'E4':'./samples/soloSample42.mp3',
    'F4':'./samples/soloSample43.mp3',
    'F#4':'./samples/soloSample44.mp3',
    'G4':'./samples/soloSample45.mp3',
    'G#4':'./samples/soloSample46.mp3',
    'A4':'./samples/soloSample47.mp3',
    'A#4':'./samples/soloSample48.mp3',
    'B4':'./samples/soloSample49.mp3',
    'C5':'./samples/soloSample50.mp3',
    'C#5':'./samples/soloSample51.mp3',
    'D5':'./samples/soloSample52.mp3',
    'D#5':'./samples/soloSample53.mp3',
    'E5':'./samples/soloSample54.mp3',
    'F5':'./samples/soloSample55.mp3',
    'F#5':'./samples/soloSample56.mp3',
    'G5':'./samples/soloSample57.mp3',
    'G#5':'./samples/soloSample58.mp3',
    'A5':'./samples/soloSample59.mp3',
    'A#5':'./samples/soloSample60.mp3',
    'B5':'./samples/soloSample61.mp3',
    'C6':'./samples/soloSample62.mp3',
    'C#6':'./samples/soloSample63.mp3',
    'D6':'./samples/soloSample64.mp3'
}
//----------THIS IS  A CUSTOM FUNCTION TO GENERATE DIFFERENT PROBABIBLITIES OF PLAY
let arrayProbability = [];
const setProbability = (probability) =>{
  if(probability>10 && probability<=100){
    arrayProbability = [];
    const keys = Object.keys(samples);
    const prop = probability / 100.0
    const size = Math.abs(Math.floor(keys.length/prop) - keys.length);
    for(let a = 0; a < keys.length;a++){
      arrayProbability[a]=keys[a];
    }
    let arrayTemp = [];
    for(let b = 0; b <size;b++){
      arrayTemp[b]='empty';
    }
    arrayProbability = arrayProbability.concat(arrayTemp);
  }
}

setProbability(70);//<<<<<<<----Setprobabiblity to play. It is set to 50% chance of play. You can change from 10% up to 100%



//------------from here  to the end dont change anything ------------- JUST CUSTOM FUNCION TO ORGANIZE THE CODE
const randStartTime = (maxTime)=>{
  const currentTime = Tone.Transport.seconds.toFixed(2);
  const randDelay = (Math.random()*maxTime).toFixed(2);
  const time = parseFloat(currentTime)+parseFloat(randDelay);
  return time+0.1;
}
const randOffSet = (maxOffset)=>{
  return Math.random()*maxOffset;
}
const randDuration = (maxDuration)=>{
  return Math.random()*maxDuration
}
const randKey = ()=>{
  const keys = Object.keys(samples);
  return arrayProbability[Math.floor(Math.random()*arrayProbability.length)];
}
//-----------END---------------------------------------THIS FUNCTION WILL BE CALL LATER INSIDE socket.on(message,()=>{})

//socket receive BroadCast Message. It just make the red circle FALSH
socket.on('flash',()=>{
  flash = true;
})
socket.on('message',()=>{
  console.log('msg');
  const keys = Object.keys(samples);
  const rkey = randKey();
  const find = keys.find((key)=>key===rkey);
  if(find){
    //this is when to start from the currentTime. It is set max random number 5 seconds so you can replace for any number you want in seconds
    const startTime = randStartTime(20);//<---YOU CAN CHANGE
    //this is from where to play the sample in seconds. It is set max random number 10 seconds so you can replace for any number you want in seconds
    const offSet = randOffSet(30);//<---YOU CAN CHANGE
    //this is duration. It is set max random number 30 seconds so you can replace for any number you want in seconds
    const duration = randDuration(10);//<---YOU CAN CHANGE
  
    console.log(startTime,offSet,duration) //In google you can see the Current Values press control+command+i
    sampler.get(rkey).start(startTime,offSet,duration);//Here will play whatever it happens.
  }
})


//  -------------THIS SECTION IS VISUAL-----------------------
let flash = false;
let count = 0;
sketch = function(p){
  p.setup = function(){
    p.createCanvas(p.windowWidth-50,p.windowHeight-400);
  
  
  }
  p.windowResized = function(){
    p.createCanvas(p.windowWidth-50,p.windowHeight-400);
  }
  p.draw = function(){
    p.clear();
    if(!onButtonclick){
      p.fill(0);
      p.textFont('Georgia');
      p.textSize(19);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(instruction1,(p.windowWidth-50)/2, (p.windowHeight-400)/2-30);
      p.text(instruction2,(p.windowWidth-50)/2, (p.windowHeight-400)/2);
      p.text(instruction3,(p.windowWidth-50)/2, (p.windowHeight-400)/2+30);
    }else{
      if(metro++ <120){
        p.fill(255,0,0);
        p.textFont('Georgia');
        p.textSize(20);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('Connection established',(p.windowWidth-50)/2, (p.windowHeight-400)/2);
      }
    }

    if(flash){
      p.fill(255,0,0);
      p.noStroke();
      p.ellipse((p.windowWidth-50)/2, (p.windowHeight-400)/2, 200,200)
      if(count++ === 60){
        flash = false;
        count=0;
      }
    }
  }
};
new p5 (sketch, 'container');
