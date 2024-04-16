const deg = 180;
const angularVelDampifier = 0.1
let orig = [];
let x, y, z, xp, yp;
const zp = 150;
const dtheta = 10;
const dalpha = 10;
const dbeta = 1;
const dphi = 1;
const dgamma = 1;
const x0 = 0, y0 = 0, z0 = 500;
let r1 = 600, r2 = 300;
let counter = 0;
let light = [0, 0, 0];
let a, b;
let torus = [];


function setup() {

  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  middles = [];
  middles.push(new Point(x0 + r1 , y0, z0))


  // creating the original circle
  for (let j = 0; j < (2 * deg) / dtheta; j++) {
    x = x0 + (r1 + r2 * cos(j * dtheta));
    y = y0 + r2 * sin(j * dtheta);
    z = z0;
    orig.push(new Point(x, y, z));
  }

  // creating the torus
  for (let i = 0; i < (2 * deg) / dalpha; i++) {
    let circ = [];

    for (let j = 0; j < orig.length; j++) {
      childpoint = new Point(orig[j].x , orig[j].y , orig[j].z);
      childpoint.rotateY(i*dalpha)
      circ.push(childpoint);
    }
    torus.push(circ);


    // craeting the centers of each circle
    nextmiddle = new Point(middles[0].x , middles[0].y, middles[0].z);
    nextmiddle.rotateY(i*dalpha);
    middles.push(nextmiddle);
  }



}




function draw() {

  frameRate(100)
  background(0);
  translate(width / 2, height / 2);
  scale(1, -1);

  //noStroke();




  for (let i = 0; i < torus.length; i++) {

    middles[i].rotateX(dbeta);
    middles[i].rotateY(dgamma)
    middles[i].rotateZ(dphi);

    for (p of torus[i]) {

      p.rotateX(dbeta);
      p.rotateY(dgamma);
      p.rotateZ(dphi);
      
    }
  }

  // FIGURING OUT THE normal, BRIGHTNESS AND DRAWING IT
  for (let i = 0; i < torus.length; i++) {

    for (p of torus[i]) {
      let Nx = p.x - middles[i].x;
      let Ny = p.y - middles[i].y;
      let Nz = p.z - middles[i].z;

      let normalabs = sqrt(Nx * Nx + Ny * Ny + Nz * Nz);
      Nx /= normalabs;
      Ny /= normalabs;
      Nz /= normalabs;

      let lvectorx = -((p.x + x0) - light[0]);
      let lvectory = -((p.y + y0) - light[1]);
      let lvectorz = -((p.z + z0) - light[2]);

      let lightabs = sqrt(lvectorx*lvectorx + lvectory*lvectory + lvectorz*lvectorz);
      lvectorx /= lightabs;
      lvectory /= lightabs;
      lvectorz /= lightabs;

      let Bright = Nx * lvectorx + Ny * lvectory + Nz * lvectorz;
      p.brightness = constrain(Bright, 0, 1);
      p.show();

    }
  }

  triangles = meshDonut();

  for(i = 0; i < triangles.length; i++) {
    triangles[i].show()
  }
  // Increment the counter
  counter++;
}




function meshDonut() {
  let triangles = [];

  for (let i = 0; i < torus.length; i++) {
    for (let j = 0; j < torus[i].length; j++) {
      // Get the current point and its neighbors
      let p1 = torus[i][j];
      let p2 = torus[i][(j + 1) % torus[i].length]; // Next point in the same circle
      let p3 = torus[(i + 1) % torus.length][j]; // Corresponding point in the next circle

      // Create two triangles for each square section of the mesh
      let triangle1 = new Triangle(p1, p2, p3);
      let triangle2 = new Triangle(p2, p3, torus[(i + 1) % torus.length][(j + 1) % torus[i].length]);

      // Add the triangles to the mesh
      triangles.push(triangle1);
      triangles.push(triangle2);
    }
  }

  return triangles;
}
