class Vector2 {
    /**
     * Vector2 class to represent a 2D vector or a 2D point in space
     * 
     * @param {Number} x - number to represent the x value
     * @param {Number} y - number to represent the y value
     */
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

/**
 * This class represents a 3D Vector with an x, y, and z value
 */
class Vector3 {
    /**
     * Vector3 class to represent a 3D vector or a 3D point in space
     * 
     * @param {Number} x number to represent the x value
     * @param {Number} y number to represent the y value
     * @param {Number} z number to represent the z value
     */
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

    /**
     * Gets length of the current vector
     * @returns length of the vector
     */
    length() {
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    /**
     * Creates a unit vector from current vector
     * @returns Vector with same direction and length of 1
     */
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

    /**
     * Multiplies all values of Vector3 a by k and returns
     * a new Vector3 with those values
     * 
     * @param {Vector3} a 
     * @param {Number} k 
     * @returns Vector3 with all values multiplied by k
     */
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

/**
 * RGB represents each value of red, green, and blue
 */
class RGB {
    /**
     * r, g, and b construct an array that hold each of the values
     * 
     * @param {Number} r - Red Value [0, 255]
     * @param {Number} g - Green Value [0, 255]
     * @param {Number} b - Blue Value [0, 255]
     */
    constructor (r, g, b) {
        this.rgb = [r, g, b];
    }

    // operations

    /**
     * Adds the r, g, b values of c1 and c2 together and returns the result
     * @param {RGB} c1 - RGB 1
     * @param {RGB} c2 - RGB 2
     * @returns {RGB} RGB with new added values
     */
    static add(c1, c2) {
        return new RGB(
            c1.r + c2.r,
            c1.g + c2.g,
            c1.b + c2.b
        );
    }

    /**
     * Multiplies the r, g, b values of c1 and c2 together and returns the result
     * @param {RGB} c1 - first RGB
     * @param {RGB} c2 - second RGB
     * @returns {RGB} RGB with new multiplied values
     */
    static multiply(c1, c2){
        return new RGB(
            c1.r + c2.r,
            c1.g + c2.g,
            c1.b + c2.b
        );
    }

    /**
     * Divides the r, g, b values of c1 and c2, returns the result
     * @param {RGB} c1 - First RGB
     * @param {RGB} c2 - Second RGB
     * @returns RGB with new divided values
     */
    static divide(c1, c2){
        return new RGB(
            c1.r/c2.r,
            c1.g/c2.g,
            c1.b/c2.b
        );
    }

    /**
     * Divides the r, g, b values of c by k and returns the result
     * @param {RGB} c - RGB
     * @param {Number} k - number to divide by
     * @returns RGB with new values divided
     */
    static scalarDivision(c, k){
        return new RGB(c.r/k, c.g/k, c.b/k);
    }

    /**
     * Multiplies the r, g, b value of c by k and retuns the result
     * @param {RGB} c - RGB
     * @param {Number} k - number to multiply by
     * @returns RGB with values multiplied
     */
    static scalarMultiplication(c, k){
        return new RGB(c.r*k, c.g*k, c.b*k);
    }
}

/**
 * Class that represents a Color
 */
class Color {
    /**
     * rgb will indicate the right color values for this object
     * 
     * @param {RGB} rgb - The RGB object to represent the color
     */
    constructor(rgb) {
        this.rgb = rgb;
    }
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
            direction : Vector3.scalarMultiplication(this.coord[2], -1).normalize(),
            origin : Vector3.add(this.position, 
            Vector3.add(Vector3.scalarMultiplication(this.coord[0], smallu), 
            Vector3.scalarMultiplication(this.coord[1], -smallv))).normalize()
        };
    }
}

class Scene {
    main_camera = new Camera();
    lights = [];
    surfaces_group = [];
}