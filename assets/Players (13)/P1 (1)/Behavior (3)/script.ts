
class P1Behavior extends defBehavior {
  
  awake(){
    this.UP=Game.p1UP;
    this.DOWN=Game.p1DOWN;
    this.LEFT=Game.p1LEFT;
    this.RIGHT=Game.p1RIGHT;
    this.points=0;
    this.scoreCounter=Sup.getActor("p1score").textRenderer;
    this.skin=this.actor.spriteRenderer.getSprite();
  }
}
Sup.registerBehavior(P1Behavior);
