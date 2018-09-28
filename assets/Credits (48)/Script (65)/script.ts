class ScriptBehavior extends Sup.Behavior {
  Boombox=new Sup.Audio.SoundPlayer("Credits/ESG");
  awake() {
    this.Boombox.play();
  }

  update() {
    if (Sup.Input.wasKeyJustPressed("ANY")){
      Sup.loadScene("MainMenu/Scene");
    }
  }
  onDestroy(){
    this.Boombox.stop();
  }
}
Sup.registerBehavior(ScriptBehavior);
