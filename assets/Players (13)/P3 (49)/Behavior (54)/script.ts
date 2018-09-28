

class P3Behavior extends defBehavior {

  awake(){
    this.UP=Game.p3UP;
    this.DOWN=Game.p3DOWN;
    this.LEFT=Game.p3LEFT;
    this.RIGHT=Game.p3RIGHT;
    this.points=0;
    this.scoreCounter=Sup.getActor("p3score").textRenderer;
  }
}
Sup.registerBehavior(P3Behavior);
