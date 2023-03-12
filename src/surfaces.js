/**
 * Surface class interface
 */
class Surface {

    /**
     * Constructs a basic surface
     */
    constructor(){
        //color: RGB ... later replace with shader/material
        this.color = new RGB(0,0,0);
        this.material = new Material();
    }

    //return HitRecord
    // hit(ray: Ray, t0: Number, t1: Number): HitRecord
    hit(ray, t0, t1) {
        console.log(ray, t0, t1);
        return null;
    }
}

/**
 * Contains data and information about ray intersection
 */
class HitRecord {
    /**
     * Constructs a HitRecord from the information of the surface at intersection point
     * @param {Surface} s - Surface which ray intersects
     * @param {Number} t - t values in Ray where intersection occurs
     * @param {Vector3} n - Normal of the surface at intersection
     * @param {Color} c - To remove later (replace with material)
     */
    constructor(s, t, n, c){
        this.s = s;
        this.t = t;
        this.n = n;
        this.color = c;
    }

    // Write methods to get more info
}

class Plane extends Surface {

    // n * o + D = 0

    // Ax + By + Cz + D = 0

    constructor (p0, n, name="plane", material = new Material()) {
        super();
        this.p0 = p0;
        this.n = n;
        this.d = -Vector3.dotProduct(this.n, this.p0);
        this.name = name;
        this.material = material;
    }

    // calculate(point: Vector3): Number
    calculate (point) {
        return Vector3.dotProduct(this.n, point) - this.d;
    }

    //hit(ray: Ray, t0: Number, t1: Number): HitRecord
    hit(ray, t0, t1) {
        const denomiator = Vector3.dotProduct(this.n, ray.direction);
        if (denomiator == 0) return new HitRecord(null, Infinity, null, new RGB(0, 0, 0));
        const numerator = -(this.d + Vector3.dotProduct(this.n, ray.origin));
        const t = numerator/denomiator;
        //if (t > 0 && t < t1) console.log("t: ", t);
        if (t < t0 || t > t1) return new HitRecord(null, Infinity, null, new RGB(0, 0, 0));
        return new HitRecord(this, t, this.n, this.color);
    }
}

class Sphere extends Surface {

    // (x - center.x)**2 + (y - center.y)**2 + (z - center.z)**2 = radius**2

    constructor(center, radius, name = "sphere", material = new Material()){
        super();
        this.center = center; // Vector3
        if (radius <= 0) throw new Error("Radius has to be more than 0!");
        this.radius = radius; // Number
        this.name = name;
        this.material = material;
    }

    // calculate(point: Vector3): Number
    calculate(point){
        return ((point.x - this.center.x)**2 + (point.y - this.center.y)**2 + (point.z - this.center.z)**2 - this.radius**2);
    }

    // hit(ray: Vector3, t0: Number, t1: Number): HitRecord
    hit(ray, t0, t1) {
        // Discriminant is B*B - 4*A*C
        // where A = d*d, B = 2*d*(e-c), and C = (e-c)*(e-c)-(r*r)
        const A = Vector3.dotProduct(ray.direction, ray.direction);
        const B = Vector3.dotProduct(Vector3.scalarMultiplication(ray.direction, 2), Vector3.subtract(ray.origin, this.center));
        const C = Vector3.dotProduct(Vector3.subtract(ray.origin, this.center), Vector3.subtract(ray.origin, this.center)) - this.radius**2;
        //console.log(`A: ${A}\tB: ${C}\tC: ${C}`);

        const discriminant = (B**2) - (4*A*C);
        //console.log("Discriminant is: ", discriminant);

        if (discriminant < 0) {
            return new HitRecord(null, Infinity, null, new RGB(0, 0 ,0));
        }
        
        const tlarge = (-B + Math.sqrt(discriminant))/(2*A);
        const tsmall = (-B - Math.sqrt(discriminant))/(2*A);

        let tFinal = tsmall;

        if (tsmall >= t0 && tsmall <= t1){
            tFinal = tsmall;
        }
        else if (tlarge >= t0 && tlarge <= t1) {
            tFinal = tlarge;
        }
        else {
            return new HitRecord(null, Infinity, null, new RGB(0, 0, 0));
        }

        //console.log("T: ", temp);

        //console.log("Intersection at ", ray.evaluate(temp).toString());

        const n = Vector3.scalarMultiplication(Vector3.subtract(ray.evaluate(tFinal),this.center), 2);

        //n is surface normal
        return new HitRecord(this, tFinal, n, this.color);
    }
}

class Triangle extends Surface {
    constructor(a, b, c, name="triangle", material = new Material()) {
        super();
        this.a = a; // Vector3
        this.b = b; // Vector3
        this.c = c; // Vector3
        this.name = name;
        this.material = material;
    }
}

class Group extends Surface {
    //surfaces: List: Surface
    constructor (surfaces) {
        super();
        this.surfaces = surfaces;
    }

    //hit(ray: Ray, t0: Number, t1: Number): HitRecord
    hit(ray, t0, t1){
        let closestHit = new HitRecord(null, Infinity, null, new RGB(0, 0, 0));
        for (let surf of this.surfaces) {
            let rec = surf.hit(ray, t0, t1);
            // if ray not miss
            if (rec.t < Infinity) {
                closestHit = rec;
                t1 = closestHit.t;
            }
        }
        return closestHit;
    }
}

/*
const sphere = new Sphere(new Vector3(0,0,0), 2);
sphere.color = new RGB(255, 0, 0);
console.log(sphere.calculate(new Vector3(4, 4, 2)));

const ray = new Ray(new Vector3(1, 2, 3), new Vector3(-3,-2,-5));
const hit = sphere.hit(ray, 0, 10);
console.log(hit);

const plane = new Plane(new Vector3(2,3,0), new Vector3(0, 0, 1));
console.log(plane.calculate(new Vector3(1, 2, 0)));
plane.color = new RGB(255, 255, 255);
const hit2 = plane.hit(ray, 0, 10);
console.log(hit2);
console.log("Intersection at: ", ray.evaluate(hit2.t));

const mainGroup = new Group([plane, sphere]);

console.log("camera");
const camera = new Camera();
camera.position = new Vector3(1,3,5);
camera.view = new Vector3(0,2,6);
camera.d = 5;
*/

//camera.create_basis();