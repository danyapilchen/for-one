const socket = io();
const $btnMsg = document.querySelector('body').querySelector('#sendMsg')
const $btnClean = document.querySelector('body').querySelector('#cleanSession')
const $p = document.querySelector('body').querySelector('p');


socket.emit('admin',(nrClients)=>{
    $p.innerHTML = nrClients;
});
$btnMsg.addEventListener('click',(e)=>{
    socket.emit('randomMessage','')
})

socket.on('clientCount',(nrClients)=>{
    $p.innerHTML = nrClients;

})
