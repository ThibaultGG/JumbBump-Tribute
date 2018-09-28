
class PlayersBehavior extends Sup.Behavior {
  speed = 0.3;
  jumpSpeed = 0.45;
  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  playerBodies: Sup.ArcadePhysics2D.Body[] = [];
  UP: string;
  DOWN: string;
  RIGHT: string;
  LEFT: string;

  update() {
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solidBodies);
    let touchSolids = this.actor.arcadeBody2D.getTouches().bottom;

    // As explained above, we get the current velocity
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    //check touch victime
    let touchVictime = false;
    if (velocity.y<0){
      this.actor.arcadeBody2D.setSize(1.5,0.4);
      this.actor.arcadeBody2D.setOffset({x: 0,y: -0.2});
      for (let victimeBody of this.playerBodies){
        Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, victimeBody);
        if (this.actor.arcadeBody2D.getTouches().bottom){
          touchVictime=true;
          velocity.y=this.jumpSpeed;
          let splashPos=victimeBody.actor.getPosition();
          victimeBody.actor.arcadeBody2D.warpPosition(10,5);
          let splashActor = new Sup.Actor("Splash");
          splashPos.z += 0.05;
          splashActor.setLocalPosition(splashPos);
          splashActor.addBehavior(ExplosionBehavior);
          
          break;
        }
        
      }
      this.actor.arcadeBody2D.setSize(1.5,1.8);
      this.actor.arcadeBody2D.setOffset({x: 0,y: 0});
    }
    // We override the `.x` component based on the player's input
    if (Sup.Input.isKeyDown("LEFT")) {
      velocity.x = -this.speed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown("RIGHT")) {
      velocity.x = this.speed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false);
    } else velocity.x = 0;

    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    let touchBottom = touchSolids;
    if (touchBottom) {
      if (Sup.Input.wasKeyJustPressed("UP")) {
        velocity.y = this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
      } else {
        // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    } else {
      // Here, we should play either "Jump" or "Fall" depending on the vertical speed
      if (velocity.y >= 0) this.actor.spriteRenderer.setAnimation("Jump");
      else this.actor.spriteRenderer.setAnimation("Fall");
    }
    // Finally, we apply the velocity back to the ArcadePhysics body
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
  
}
Sup.registerBehavior(P1Behavior);
