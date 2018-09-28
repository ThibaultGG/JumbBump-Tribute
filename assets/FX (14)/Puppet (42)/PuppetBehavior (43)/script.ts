class PuppetBehavior extends Sup.Behavior {
  awake() {
    //new Sup.SpriteRenderer(this.actor, "FX/Puppet/Puppet_Sprite");
    Sup.Audio.playSound("FX/death");
  }

  update() {
    if (!this.actor.spriteRenderer.isAnimationPlaying()) this.actor.destroy();
  }
}
Sup.registerBehavior(PuppetBehavior);
