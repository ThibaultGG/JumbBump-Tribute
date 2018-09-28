class GameManagerBehavior extends Sup.Behavior {
  awake() {
    this.spawnPlayers(Game.nbJoueurs);
    for(let playerActor of Game.players)Game.playerBodies.push(playerActor.arcadeBody2D);
  }

  update() {
    if (Game.gorePieces.length>Game.maxGore){
      let oldest_gore = Game.gorePieces[0];
      Game.gorePieces.splice(0,1);
      oldest_gore.actor.destroy();
    }
    //Sup.log(Game.players[0].getPosition().distanceTo(Game.players[1].getPosition()));
  }
  
  spawnPlayers(nbPlayers: number){
    if (nbPlayers==2){
      let J1= Sup.appendScene("Players/P1/Prefab")[0];
      Game.players.push(J1);
      let J2= Sup.appendScene("Players/P2/Prefab")[0];
      Game.players.push(J2);
    }else if(nbPlayers==3){
      let J1= Sup.appendScene("Players/P1/Prefab")[0];
      Game.players.push(J1);
      let J2= Sup.appendScene("Players/P2/Prefab")[0];
      Game.players.push(J2);
    }else if(nbPlayers==4){
      let J1= Sup.appendScene("Players/P1/Prefab")[0];
      Game.players.push(J1);
      let J2= Sup.appendScene("Players/P2/Prefab")[0];
      Game.players.push(J2);
    }
  }
}
Sup.registerBehavior(GameManagerBehavior);
