

class P4Behavior extends defBehavior {

  awake(){
    this.UP=Game.p2UP;
    this.DOWN=Game.p2DOWN;
    this.LEFT=Game.p2LEFT;
    this.RIGHT=Game.p2RIGHT;
    this.points=0;
    this.scoreCounter=Sup.getActor("p4score").textRenderer;
  }
}
Sup.registerBehavior(P4Behavior);
