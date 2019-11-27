// jQuery(function($){
//
// var socket = new WebSocket('ws://192.168.10.1:9000/asset/host/20.26.25.153');
// var term = new Terminal({
//   cursorBlink: true,
//   rows: 25,
// });
// term.open(document.getElementById('image-detail'));
//
// term.on('data', function(data) {
//   // console.log(data);
//   socket.send(data);
// });
//
// socket.onopen = function(e) {
//
// };
//
// socket.onmessage = function(msg) {
//   // console.log(msg);
//   term.write(msg.data);
// };
//
// socket.onerror = function(e) {
//   console.log(e);
// };
//
// socket.onclose = function(e) {
//   console.log(e);
//   term.destroy();
// };
//
//
// });

function connect(){
	var host = '0242cffb7090'
	$("#connect-notify").html('正在远程连接容器<span>('+host+')...</span>');
	var socket = new WebSocket('ws://192.168.10.1:9000/asset/host/20.26.25.153');
	var term = new Terminal({
	  cursorBlink: true,
	  rows: 20,
	});

	term.open(document.getElementById('image-detail'));
	term.on('data', function(data) {
	  // console.log(data);
	  socket.send(data);
	});

	socket.onopen = function(e) {
	};

	socket.onmessage = function(msg) {
	  // console.log(msg);
	  term.write(msg.data);
	};

	socket.onerror = function(e) {
	  console.log(e);
	};

	socket.onclose = function(e) {
	  console.log(e);
	  // term.destroy();
	};

}
export default connect;
