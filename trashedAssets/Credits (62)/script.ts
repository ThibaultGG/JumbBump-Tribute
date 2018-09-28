class CreditBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    
    esg.play;
    
    if(Sup.Input.isKeyDown("any")){
      
      Sup.loadScene("MainMenu/Scene")
      esg.stop;
      
    }
    
  }
}
Sup.registerBehavior(CreditBehavior);
