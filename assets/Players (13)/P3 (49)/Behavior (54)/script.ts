
class P3Behavior extends defBehavior {

  awake(){
    this.UP=Game.p3UP;
    this.DOWN=Game.p3DOWN;
    this.LEFT=Game.p3LEFT;
    this.RIGHT=Game.p3RIGHT;
    this.points=0;
    this.scoreCounter=Sup.getActor("p3score").textRenderer;
    this.actor.arcadeBody2D.warpPosition(Game.spawns[2]['x'],Game.spawns[2]['y']);
  }
  mouvement(velocity: Sup.Math.Vector2){
    this.touchTop = this.touchTop || this.actor.arcadeBody2D.getTouches().top;
    
    if(this.isDying){
      if(!this.actor.spriteRenderer.isAnimationPlaying()){
        this.isDying=false ;
        this.respawn(this.actor.arcadeBody2D);
      } 
    }
    else if (Sup.Input.getGamepadAxisValue(0,0)<0 && !this.check_bodyblock("left") && this.speed>-Game.maxSpeed) {
      velocity.x > 0.1 ? velocity.x=0.1 : velocity.x ;
      velocity.x -= Game.accelSpeed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.getGamepadAxisValue(0,0)>0 && !this.check_bodyblock("right") && this.speed<Game.maxSpeed) {
      velocity.x < -0.1 ? velocity.x=-0.1 : velocity.x ;
      velocity.x += Game.accelSpeed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false); 
    } else if (!this.touchIce) velocity.x = 0;
    
    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    if (this.touchSolids || this.touchIce) {
      this.isBumping=false;
      if (Sup.Input.wasGamepadButtonJustPressed(0,0)) {
        velocity.y=this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
        this.jumpOriginHeight=this.actor.getPosition().y;
        this.isJumping=true;
      } 
      else { // Here, we should play either "Idle" or "Run" depending on the horizontal speed
        if (velocity.x === 0) this.actor.spriteRenderer.setAnimation("Idle");
        else this.actor.spriteRenderer.setAnimation("Run");
      }
    }
    //Gestion hauteur de saut
    else {
        if (velocity.y >= 0 ) {
          this.actor.spriteRenderer.setAnimation("Jump");
          if(this.isJumping && Sup.Input.isGamepadButtonDown(0,0) && !this.isBumping && !this.touchTop && this.actor.getPosition().y < this.jumpOriginHeight+4 ){
            // velocity.y+=0.015;
            velocity.y+=0.03;
          } else this.isJumping=false;
        }
        else this.actor.spriteRenderer.setAnimation("Fall");
    }
    return velocity;
  }
}
Sup.registerBehavior(P3Behavior);
