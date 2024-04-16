
class Triangle {
    constructor(v1 , v2 , v3) {
      this.v1 = v1;
      this.v2 = v2;
      this.v3 = v3;
      this.illumination;
  
    }
  
    show() {
  
      this.illumination = this.getBrightness() * 255;
      fill(this.illumination, 100)
      this.v1.getPrimeCoords();
      this.v2.getPrimeCoords();
      this.v3.getPrimeCoords();
  
      triangle(this.v1.xp, this.v1.yp, this.v2.xp , this.v2.yp , this.v3.xp , this.v3.yp)
    }
  
    getBrightness() {
      return (this.v1.brightness + this.v2.brightness + this.v3.brightness) / 3;
    }
  }
  
  
  
  
  
  