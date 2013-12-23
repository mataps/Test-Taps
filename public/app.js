$(document).ready(function() {
	var canvas = document.getElementById('world');
	var source = 'http://localhost/nowgame/public/';
	var allPlayers = [];
	var localPlayer=[];
	var startX = Math.round(Math.random()*(5));
    
    var world = boxbox.createWorld(canvas,{
		debugDraw:false,
		scale:50,
		gravity:20
	});
	
	var playerTemplate = {
        name: 'player',
        x: startX,
        y: 7,
		image: source+'img/marioR1.png',
		imageStretchToFit:true,
        height: .4,
        width: .4,
        fixedRotation: true,
        restitution: 0,
        maxVelocityX: 3,
		density: 0,
		color: 'blue',
        shape: 'polygon',
		points:[
				{x:.1, y:0},
				{x:.3, y:0},
				{x:.4, y:.1},
				{x:.4, y:.3},
				{x:.3, y:.4},
				{x:.1, y:.4},
				{x:.0, y:.3},
				{x:.0, y:.1},
			],
		//custom values per player
		$spriteCounter: 1,
		$left: false,
		$right: false,
		$groundContact: false,
		$isFlying: false,
		$isRendered: false
    };
	
	var groundTemplate = {
        name: 'ground',
        type: 'static',
        height: .1,
        color: 'gray',
		restitution: 0
    };
	
	world.onRender(function(ctx) {
	});
	
	world.createEntity(groundTemplate, {width: 10, x: 0, y: 7.9});
    world.createEntity(groundTemplate, {width: 5, x: 15, y: 6.9});
	world.createEntity(groundTemplate, {width: 1, x: 8, y: 5.9});
	world.createEntity(groundTemplate, {width: 1, x: 4, y: 4.9});
	
	
	now.ready(function() {
		now.newPlayer(playerTemplate);
	});
	
	now.remotePlayers = function(players) {
		for(var i in players) {
			if(allPlayers[i]){
				continue;
			}
			allPlayers[i] = world.createEntity(players[i].template);
			//allPlayers[i].template.$isRendered = true;
		}
		//initControls();
		console.log(players);
	}
	
	now.removePlayer = function(playerId) {
		//console.log(allPlayers[playerId]);
		allPlayers[playerId].destroy();
		delete allPlayers[playerId];
		//allPlayers.splice(playerId,1);
	}
	/*
	function initControls(){
		window.addEventListener('keydown', function(e){
			if (e.keyCode === 32) {
				//now.keyPressed(playerTemplate);
				//console.log(allPlayers[now.core.clientId].position({x:2, y:5}));
			}
		},true);
	}*/
});