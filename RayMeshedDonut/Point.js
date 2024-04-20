

class Point {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.position = new p5.Vector(x , y, z);
      this.xp;
      this.yp;
      this.brightness = 1;
      this.normal;

    }
  
    show() {
      if (this.brightness > 0) {
        fill(this.brightness * 255);
        this.getPrimeCoords();
        circle(this.xp, this.yp, 4);
      }
    }
  
    getPrimeCoords() {
      this.xp = (x0 + this.x) * (zp / (this.z + z0));
      this.yp = (y0 + this.y) * (zp / (this.z + z0));
  
    }
  
    rotateX(angle) {
      let newY = (this.y - y0) * cos(angle) - (this.z - z0) * sin(angle);
      let newZ = (this.y - y0) * sin(angle) + (this.z - z0) * cos(angle);
      this.y = y0 + newY;
      this.z = z0 + newZ;
    }
  
    rotateY(angle) {
      let newX = (this.z - z0) * sin(angle) + (this.x - x0) * cos(angle);
      let newZ = (this.z - z0) * cos(angle) - (this.x - x0) * sin(angle);
      this.x = x0 + newX;
      this.z = z0 + newZ;
    }
  
    rotateZ(angle) {
      let newX = (this.x - x0) * cos(angle) - (this.y - y0) * sin(angle);
      let newY = (this.x - x0) * sin(angle) + (this.y - y0) * cos(angle);
      this.x = x0 + newX;
      this.y = y0 + newY;
    }

    stretch(factor) {
      this.x = (this.x - x0)*factor;
      this.y = (this.y - y0)*factor;
    }
  }