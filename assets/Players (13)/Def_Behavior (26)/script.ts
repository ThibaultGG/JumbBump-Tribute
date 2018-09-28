
class defBehavior extends Sup.Behavior {

  speed = 0;
  jumpSpeed = 0.4;
  solidBodies: Sup.ArcadePhysics2D.Body[] = [];
  playerBodies: Sup.ArcadePhysics2D.Body[] = [];
  liquidBodies: Sup.ArcadePhysics2D.Body[]= [];
  jumperBodies: Sup.ArcadePhysics2D.Body[]= [];
  iceBodies: Sup.ArcadePhysics2D.Body[]= [];
  
  UP: string;
  DOWN: string;
  RIGHT: string;
  LEFT: string;

  points: number;
  scoreCounter: Sup.TextRenderer;

  isBumping: boolean;
  isJumping: boolean;
  isDying: boolean;
  touchSolids= false;
  touchTop=false;
  touchIce=false;

  skin: Sup.Sprite;

  start(){
    let solidActors = Sup.getActor("Solids").getChildren();
    for(let solidActor of solidActors) this.solidBodies.push(solidActor.arcadeBody2D);
    let liquidActors = Sup.getActor("Liquid").getChildren();
    for(let liquidActor of liquidActors) this.liquidBodies.push(liquidActor.arcadeBody2D);
    let jumperActors = Sup.getActor("Jumper").getChildren();
    for(let jumperActor of jumperActors) this.jumperBodies.push(jumperActor.arcadeBody2D);
    for(let playerBody of Game.playerBodies) this.playerBodies.push(playerBody);
    let index=this.playerBodies.indexOf(this.actor.arcadeBody2D,0);
    this.playerBodies.splice(index,1);
    let iceActors = Sup.getActor("Glace").getChildren();
    for(let iceActor of iceActors) this.iceBodies.push(iceActor.arcadeBody2D);
    
    
    //this.speed=Game.baseSpeed;
    this.jumpSpeed=Game.jumpSpeed;
    this.isBumping=false;
    this.isJumping=false;
    this.isDying=false;
    this.respawn(this.actor.arcadeBody2D);
  }

  update() {  //On check en premier les mouvements voulu par le joueurs et on applique ensuite les restrictions
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.solidBodies);
    this.touchSolids = this.actor.arcadeBody2D.getTouches().bottom;
    this.touchTop = this.actor.arcadeBody2D.getTouches().top;
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.iceBodies);
    this.touchIce =this.actor.arcadeBody2D.getTouches().bottom;
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.iceBodies);
    
    let velocity = this.actor.arcadeBody2D.getVelocity();

    velocity=this.mouvement(velocity);
    
    if(this.check_bump()) {
      velocity.y=Game.jumpSpeed;
      this.isBumping=true;
    }
    
    velocity.y=this.archimede(velocity.y);
    velocity.y=this.jumper(velocity.y);
 
    this.actor.arcadeBody2D.setVelocity(velocity);
  }

  jumper(vel: number){
    for(let jumperBody of this.jumperBodies){
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D,jumperBody);
      if(this.actor.arcadeBody2D.getTouches().bottom){
        vel=Game.jumperSpeed;
      }
    }
    return vel;    
  }

  check_bodyblock(direction: string){
    let position = this.actor.getPosition();
    for (let playerbody of this.playerBodies){
      let playerPos= playerbody.actor.getPosition();
      let distance= position.distanceTo(playerPos);
      if((distance-0.2<=1.5)) {
        if ((direction=="left" && position>playerPos) || (direction=="right" && position<playerPos)) return true; 
      }
    }
     return false;
  }

getSpeed(){
  return this.speed;
}

  //Gestion des mouvements
mouvement(velocity: Sup.Math.Vector2){
    this.touchTop = this.touchTop || this.actor.arcadeBody2D.getTouches().top;
    
    if(this.isDying){
      if(!this.actor.spriteRenderer.isAnimationPlaying()){
        this.isDying=false ;
        this.respawn(this.actor.arcadeBody2D);
      } 
    }
    else if (Sup.Input.isKeyDown(this.LEFT) && !this.check_bodyblock("left") && this.speed>-Game.maxSpeed) {
      velocity.x > 0.1 ? velocity.x=0.1 : velocity.x ;
      velocity.x -= Game.accelSpeed;
      // When going left, we flip the sprite
      this.actor.spriteRenderer.setHorizontalFlip(true);
    } else if (Sup.Input.isKeyDown(this.RIGHT) && !this.check_bodyblock("right") && this.speed<Game.maxSpeed) {
      velocity.x < -0.1 ? velocity.x=-0.1 : velocity.x ;
      velocity.x += Game.accelSpeed;
      // When going right, we clear the flip
      this.actor.spriteRenderer.setHorizontalFlip(false); 
    } else if (!this.touchIce) velocity.x = 0;

    // If the player is on the ground and wants to jump,
    // we update the `.y` component accordingly
    if (this.touchSolids || this.touchIce) {
      this.isBumping=false;
      if (Sup.Input.wasKeyJustPressed(this.UP)) {
        velocity.y=this.jumpSpeed;
        this.actor.spriteRenderer.setAnimation("Jump");
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
          if(this.isJumping && Sup.Input.isKeyDown(this.UP) && !this.isBumping && !this.touchTop){
            velocity.y+=0.015;    
          } else this.isJumping=false;
        }
        else this.actor.spriteRenderer.setAnimation("Fall");
    }
    return velocity;
  }

  check_bump(){
    for (let victimeBody of this.playerBodies){
      this.actor.arcadeBody2D.setSize(1.5,0.4);
      this.actor.arcadeBody2D.setOffset({x:0,y:-0.8});
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, victimeBody);
      if (this.actor.arcadeBody2D.getTouches().bottom){
        this.frag(victimeBody);
        this.score();
        return true;
      }
      this.actor.arcadeBody2D.setSize(1.5,1.8);
      this.actor.arcadeBody2D.setOffset({x:0,y:0});
    }
    return false;
  }

  frag(victimeBody: Sup.ArcadePhysics2D.Body){
    let splashPos=victimeBody.actor.getPosition();
    let puppet=Sup.appendScene("FX/Puppet/Puppet_Prefab")[0];
    puppet.spriteRenderer.setSprite(victimeBody.actor.spriteRenderer.getSprite());
    puppet.arcadeBody2D.warpPosition(splashPos);
    puppet.spriteRenderer.setAnimation("Die", false);  
    //victimeBody.actor.spriteRenderer.setAnimation("Die", false);
    this.respawn(victimeBody);
    let piece=Sup.appendScene("FX/Gored/Gore_prefab")[0];
    piece.arcadeBody2D.warpPosition(splashPos);
    let x = Sup.Math.Random.integer(-1,1);
    piece.arcadeBody2D.setVelocity(x/5,0.2);
  }

  respawn(playerBody: Sup.ArcadePhysics2D.Body){
    //5 Spawn possible
    let tempSpawn=Sup.Math.Random.integer(0,4);
    playerBody.actor.arcadeBody2D.warpPosition(Game.spawns[tempSpawn]['x'],Game.spawns[tempSpawn]['y']);
  }

  score(){
    this.points+=1;
    this.getScoreCounter().setText(this.points);
  }

  getScoreCounter(){
    return this.scoreCounter;
  };

  archimede(velocity: number){
    this.isBumping=false;
    for(let liquidBody of this.liquidBodies){
      if(Sup.ArcadePhysics2D.intersects(this.actor.arcadeBody2D,liquidBody)){
        let surface=liquidBody.actor.getPosition().y;
        let profondeur=surface-this.actor.getPosition().y;
        //si on viens de plonger, on descend en freinant la chute
        if(velocity<0) velocity+=profondeur*Game.archiF+0.02;
        //si on remonte on ignore la gravité (+0.02 à la fin du calcule) pour s'arrêter à la surface
        else if(velocity>=0 && velocity<0.025) {
          velocity=profondeur*Game.archiF+0.02;
          //si on est proche de la surface, on autorise le saut
          if (Sup.Input.wasKeyJustPressed(this.UP) &&  velocity>=0.02) {
            velocity=this.jumpSpeed;
            this.actor.spriteRenderer.setAnimation("Jump");
            this.isJumping=true;
            
          } 
        }
      }
    }
    return velocity;  
  }
}
Sup.registerBehavior(defBehavior);
