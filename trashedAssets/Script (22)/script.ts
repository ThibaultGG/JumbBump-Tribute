class CloudScrollBehavior extends Sup.Behavior {
  awake() {
    
  }
  x = this.actor.getLocalX();
  speed = 0.05;

  update() {
    this.x += this.speed;
    if (this.x > 43) this.x -= 43;
    
    this.actor.setLocalX(this.x);
  }
}
Sup.registerBehavior(CloudScrollBehavior);
