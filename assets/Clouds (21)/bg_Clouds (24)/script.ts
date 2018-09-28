class bgCloudsBehavior extends Sup.Behavior {
  speed=0.001;

  update() {
    let x = this.actor.getLocalX();
    this.actor.setLocalX(x+this.speed);
    if(this.actor.getLocalX()>=25){
      this.actor.setLocalX(-25);
    }
  }
}
Sup.registerBehavior(bgCloudsBehavior);
