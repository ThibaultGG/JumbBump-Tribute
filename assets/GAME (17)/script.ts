
Sup.ArcadePhysics2D.setGravity(0, -0.02);
namespace Game {
  export let nbJoueurs=2;
  
  export let p1UP="UP";
  export let p1DOWN="DOWN";
  export let p1RIGHT="RIGHT";
  export let p1LEFT="LEFT";
  export let p2UP="Z";
  export let p2DOWN="S";
  export let p2RIGHT="D";
  export let p2LEFT="Q";
  export let p3UP="O";
  export let p3DOWN="L";
  export let p3RIGHT="M";
  export let p3LEFT="K";
  export let p4UP="";
  export let p4DOWN="";
  export let p4RIGHT="";
  export let p4LEFT="";
  
  export let jumpSpeed=0.28;
  export let jumperSpeed=0.7;
  export let accelSpeed=0.004;
  export let maxSpeed=0.009;
  export let archiF=0.045;
  
  export let spawns=[{x:19,y:25},{x:10,y:11},{x:30,y:2},{x:39,y:22}];
  
  export let gorePieces: GoreBehavior[]=[];
  export let maxGore=20;
  
  export let players: Sup.Actor[]=[];
  export let playerBodies: Sup.ArcadePhysics2D.Body[]=[];
  
  export let pWidth=1.5;
  export let pHeight=1.8;
  
  export function start(nbPlayers: number){
    this.nbJoueurs = nbPlayers;
    Sup.loadScene("MainScene");
  }
}

