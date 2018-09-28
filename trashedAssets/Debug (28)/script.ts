class DebugBehavior extends Sup.Behavior {
  maxVel=0;
  awake() {
    
  }
  update() {
    let P1VY=Sup.getActor("P1").arcadeBody2D.getVelocity().y;
    Sup.getActor("Debug").textRenderer.setText("velYP1: "+P1VY);
    if(P1VY>this.maxVel){
      this.maxVel=P1VY;
      Sup.getActor("debug2").textRenderer.setText("MAXvelP1: "+this.maxVel);
    }
    if(Sup.Input.wasKeyJustPressed("B")) {
      this.maxVel=0;
      Sup.getActor("debug2").textRenderer.setText("MAXvelP1: "+this.maxVel);
      }
  }
}
Sup.registerBehavior(DebugBehavior);