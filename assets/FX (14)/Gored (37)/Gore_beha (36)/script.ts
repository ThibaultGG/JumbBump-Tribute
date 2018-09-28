class GoreBehavior extends Sup.Behavior {

  solidBodies: Sup.ArcadePhysics2D.Body[] = [];

  start(){
    Game.gorePieces.push(this);
    let solidActors = Sup.getActor("Solids").getChildren();
    for(let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
  }

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,this.solidBodies);
    let velocity = this.actor.arcadeBody2D.getVelocity();
      if(velocity.x>0){
        velocity.x-=0.01;
      }
      else if (velocity.x<0){
        velocity.x+=0.01;
      }else velocity.x=0;
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(GoreBehavior);
