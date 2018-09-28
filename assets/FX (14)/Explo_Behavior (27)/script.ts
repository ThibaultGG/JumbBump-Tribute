class ExplosionBehavior extends Sup.Behavior {
  awake() {
    new Sup.SpriteRenderer(this.actor, "FX/explosion");
    this.actor.spriteRenderer.setAnimation("Animation", false);  
  }
  
  
  update() {
    if (!this.actor.spriteRenderer.isAnimationPlaying()) this.actor.destroy();
  }
}
Sup.registerBehavior(ExplosionBehavior);