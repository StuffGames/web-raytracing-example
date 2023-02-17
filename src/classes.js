class Vector2 {
    constructor (x, y){
        this.x = x;
        this.y = y;
    }

    printVector(){
        console.log(`Values: (${this.x}, ${this.y})`);
    }

    static add(a, b){
        return new Vector2(a.x+b.x, a.y+b.y);
    }
    static subtract(a, b){
        return new Vector2(a.x-b.x, a.y-b.y);
    }
    static multiply(a, b){
        return new Vector2(a.x*b.x, a.y*b.y);
    }
    static divide(a, b){
        return new Vector2(a.x/b.x, a.y/b.y);
    }
    static scalarMultiplication(a, k){
        return new Vector2(a.x*k, a.y*k);
    }
    static scalarDivision(a, k){
        return new Vector2(a.x/k, a.y/k);
    }
    static dotProduct(a, b){
        return a.x*b.x + a.y+b.y;
    }
}

class Vector3 {
    constructor (x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    printVector(){
        console.log(`Values: (${this.x}, ${this.y}, ${this.z})`);
    }

    toString() {
        return `Values: (${this.x}, ${this.y}, ${this.z})`;
    }

    length() {
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    normalize() {
        return Vector3.scalarDivision(this, this.length());
    }

    static add(a, b){
        return new Vector3(a.x+b.x, a.y+b.y, a.z+b.z);
    }
    static subtract(a, b){
        return new Vector3(a.x-b.x, a.y-b.y, a.z-b.z);
    }
    static multiply(a, b){
        return new Vector3(a.x*b.x, a.y*b.y, a.z*b.z);
    }
    static divide(a, b){
        return new Vector3(a.x/b.x, a.y/b.y, a.z/b.z);
    }
    static scalarMultiplication(a, k){
        return new Vector3(a.x*k, a.y*k, a.z*k);
    }
    static scalarDivision(a, k){
        return new Vector3(a.x/k, a.y/k, a.z/k);
    }
    static dotProduct(a, b){
        return a.x*b.x + a.y*b.y + a.z*b.z;
    }
    static crossProduct(a, b){
        return new Vector3(a.y*b.z-a.z*b.y, a.z*b.x-a.x*b.z, a.x*b.y-a.y*b.x);
    }

    static up(){
        return new Vector3(0,0,1);
    }
    static forward() {
        return new Vector3(0,1,0);
    }
    static right() {
        return new Vector3(1,0,0);
    }
}

class hvector {
    constructor (x, y, z, w){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        // Complete rest later
    }
}

class RGB {
    constructor (r, g, b) {
        this.rgb = [r, g, b];
    }

    // operations
}

// class Transform

class Image {
    constructor(h, w){
        this.image = Array(h);
        // more
    }
}

class Ray {
    constructor (o, d) {
        this.origin = o;
        this.direction = d;
    }

    // normalize(): Vetcor3?
    // normalize will return this ray with magnitude (length) of one

    // evaluate(t: number): Vector3
    evaluate(t){
        return Vector3.add(this.origin , Vector3.scalarMultiplication(this.direction, t));
    }
}

class Camera {
    constructor () {
        this.position = new Vector3(0, 0, 0);
        this.view = new Vector3(0, 0, 0);

        this.d = 0;
        this.coord = [0, 0, 0];
    }

    create_basis(){
        const e = this.position;
        const w = this.view.normalize();
        const up = Vector3.up();
        
        const u = Vector3.crossProduct(up, w).normalize();

        const v = Vector3.crossProduct(w, u).normalize();

        console.log(`up: ${up},\ne: ${e},\nw: ${w},\nu: ${u},\nv: ${v}`);
        this.coord = [u, v, w];
    }

    changeToPerspective(smallu, smallv) {
        return {
            origin : this.position,
            direction : Vector3.add(Vector3.scalarMultiplication(this.coord[2], -camera.d), 
            Vector3.add(Vector3.scalarMultiplication(this.coord[0], smallu), 
            Vector3.scalarMultiplication(this.coord[1], -smallv))).normalize()
        };
    }

    changeToOrthographic(smallu, smallv) {
        return {
            direction : Vector3.scalarMultiplication(this.coord[2], -1),
            origin : Vector3.add(this.position, 
            Vector3.add(Vector3.scalarMultiplication(this.coord[0], smallu), 
            Vector3.scalarMultiplication(this.coord[1], -smallv))).normalize()
        };
    }
}