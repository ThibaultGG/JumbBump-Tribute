

class GAMEBehavior extends Sup.Behavior {
    p1UP: string;
    p1DOWN: string;
    p1RIGHT: string;
    p1LEFT: string;   
    p2UP: string;
    p2DOWN: string;
    p2RIGHT: string;
    p2LEFT: string;
    p3UP: string;
    p3DOWN: string;
    p3RIGHT: string;
    p3LEFT: string;   
    p4UP: string;
    p4DOWN: string;
    p4RIGHT: string;
    p4LEFT: string;

  awake() {
    this.p1UP="UP";
    this.p1DOWN="DOWN";
    this.p1RIGHT="RIGHT";
    this.p1LEFT="LEFT";   
    this.p2UP="Z";
    this.p2DOWN="S";
    this.p2RIGHT="Q";
    this.p2LEFT="D";
  }

}
Sup.registerBehavior(GAMEBehavior);
