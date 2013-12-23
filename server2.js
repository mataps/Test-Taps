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
  var toRemove = this.user.clientId;
  for(var i in players) {
    if(i == this.user.clientId) {
		util.log("disconnected: "+this.user.clientId);
		delete players[this.user.clientId];
    }else{
		nowjs.getClient(i, function(err) {
			//util.log(i);
			this.now.removePlayer(toRemove);
		});
	}
  }
  //players.splice(this.user.clientId,1);
});

everyone.now.playerKeys = function(x, y) {
  players[this.user.clientId] = {x: x, y: y};
  var toUpdate = {};
  for(var i in players) {
	toUpdate[i] = {x: players[i].x, y: players[i].y};
  }
  for(var i in toUpdate) {
    nowjs.getClient(i, function(err) {
      this.now.drawPlayers(toUpdate);
    });
  }
}

everyone.now.newPlayer = function(playerTemplate) {
  players[this.user.clientId] = {template: playerTemplate};
  players[this.user.clientId].template.x = generateRand();
  //players[this.user.clientId].template.$connected = true;
  //util.log(players[this.user.clientId].template.x);
  var toUpdate = {};
  for(var i in players) {
	toUpdate[i] = {template: players[i].template};
	//util.log(toUpdate[i].template);
  }
  for(var i in toUpdate) {
	nowjs.getClient(i, function(err) {
		//util.log(this.now.remotePlayers(toUpdate));
		this.now.remotePlayers(toUpdate);
	});
  }
}

function generateRand(){
	return Math.round(Math.random()*(5));
}