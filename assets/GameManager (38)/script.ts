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
    if(Sup.Input.wasKeyJustPressed("O")){
      Game.accelSpeed+=0.001;
    }
    if(Sup.Input.wasKeyJustPressed("L")){
      Game.accelSpeed-=0.001
    }
    if(Sup.Input.wasKeyJustPressed("K")){
      Game.maxSpeed-=0.001;
    }
    if(Sup.Input.wasKeyJustPressed("M")){
      Game.maxSpeed+=0.001;
    }
//    Sup.log(Game.accelSpeed);
//    Sup.log(Game.maxSpeed);
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
      let J3= Sup.appendScene("Players/P3/Prefab")[0];
      Game.players.push(J3);
    }else if(nbPlayers==4){
      let J1= Sup.appendScene("Players/P1/Prefab")[0];
      Game.players.push(J1);
      let J2= Sup.appendScene("Players/P2/Prefab")[0];
      Game.players.push(J2);
    }
  }
}
Sup.registerBehavior(GameManagerBehavior);
