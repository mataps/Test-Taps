var html = require('fs').readFileSync(__dirname+'/public/test.html');
var server = require('http').createServer(function(req, res){
  res.end(html);
});
server.listen(8080);


var nowjs = require("now");
var util = require("util");
var everyone = nowjs.initialize(server);
var players = [];

//=========================
//listeners
//=========================
nowjs.on('connect', function() {
  players[this.user.clientId];
  util.log("New player has connected: "+this.user.clientId);
});

nowjs.on('disconnect', function() {
  for(var i in players) {
    if(i == this.user.clientId) {
      delete players[i];
	  util.log("disconnected: "+this.user.clientId);
      break;
    }
  }
});

everyone.now.updatePlayer = function(x, y) {
  players[this.user.clientId] = {x: x, y: y};
  var toUpdate = {};
  for(var i in players) {
	if(players[i].x == fruits.x && players[i].y == fruits.y){
		fruits = generateFruit();
	}
	toUpdate[i] = {x: players[i].x, y: players[i].y};
  }
  for(var i in toUpdate) {
    nowjs.getClient(i, function(err) {
      this.now.drawPlayers(toUpdate, fruits);
    });
  }
}