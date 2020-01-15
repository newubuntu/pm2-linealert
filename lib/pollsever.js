const ping = require ("net-ping");
const meventbus = require ("./meventbus");   

let timepingid=undefined;
let timeouttcp=10*1000;
let  targets =[];
//const meventbus = new mbus();

function start(server_targets){
targets=server_targets;
 if(targets.length<=0&&timepingid!=undefined){ 
    clearInterval(timepingid);
}
pollsever()
timepingid=setInterval(()=>{  
   pollsever() 
},timeouttcp); 
} 
function pollsever(){ 
 if(targets.length<=0){return}
let session = ping.createSession (); 
for (let i = 0; i < targets.length; i++) {
    session.pingHost (targets[i], (error, target, sent, rcvd)=> {
            let ms = rcvd - sent;
			if (error) {
				meventbus.emit('pollevent',target + ": " + error.toString ());
				console.log (target + ": " + error.toString ());
			}else{
			 session.close ();
			 meventbus.emit('polleventms',ms);
			 console.log (target + ": Alive (ms=" + ms + ")");
			}
    });
}
} 
//exports.pollsever = start;
module.exports = { start};