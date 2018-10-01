class MainMenuBehavior extends Sup.Behavior {
  buttons: Sup.Actor[];
  buttonIndex=0;
  nbPlayers=2;

  awake() {
    this.buttons=Sup.getActor("Boutons").getChildren();
    Sup.getActor("NbJoueurs").textRenderer.setText("Nombre de joueurs = "+this.nbPlayers);
    this.updateFocusedButton();
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("DOWN",{ autoRepeat : true})){
      this.buttonIndex = Math.min(this.buttonIndex + 1, this.buttons.length - 1);
      this.updateFocusedButton();
    }
    if (Sup.Input.wasKeyJustPressed("UP", { autoRepeat: true })) {
      this.buttonIndex = Math.max(this.buttonIndex - 1, 0);
      this.updateFocusedButton();
    }
    if (this.buttonIndex==1){
      if(Sup.Input.wasKeyJustPressed("RIGHT")){
        this.nbPlayers=Math.min(this.nbPlayers + 1 , 4);
      } else if (Sup.Input.wasKeyJustPressed("LEFT")){
        this.nbPlayers=Math.max(this.nbPlayers - 1 , 2);
      }
      Sup.getActor("NbJoueurs").textRenderer.setText("Nombre de joueurs = "+this.nbPlayers);
    }
    if (Sup.Input.wasKeyJustPressed("RETURN")){
      this.activateButton();
    }
  }

  updateFocusedButton(){
    for(let i=0; i<this.buttons.length; i++){
      let button = this.buttons[i];
      button.textRenderer.setOpacity(i === this.buttonIndex ? 1 : 0.2);
    }
  }

  activateButton(){
    switch (this.buttonIndex){
      case 0:
          Game.start(this.nbPlayers);
          break;
      case 2:
        Sup.loadScene("Credits/SceneCredit");
          
     
    }
      
  }

}
Sup.registerBehavior(MainMenuBehavior);
