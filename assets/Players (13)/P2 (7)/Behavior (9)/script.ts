
class P2Behavior extends defBehavior {

  awake(){
    this.UP=Game.p2UP;
    this.DOWN=Game.p2DOWN;
    this.LEFT=Game.p2LEFT;
    this.RIGHT=Game.p2RIGHT;
    this.points=0;
    this.scoreCounter=Sup.getActor("p2score").textRenderer;
    this.actor.arcadeBody2D.warpPosition(Game.spawns[1]['x'],Game.spawns[1]['y']);
  }
}
Sup.registerBehavior(P2Behavior);
