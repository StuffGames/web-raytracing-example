/**
 * Light class interface.
 */
class Light {
    
    /**
     * Return color after BRDF calculation
     * @param {Ray} ray - Ray casted from camera
     * @param {HitRecord} hrec - HitRecord from casted ray
     * @returns {Color} Color from BRDF calculation
     */
    illuminate(ray, hrec){
        // illuminate(ray: Ray, hrec: HitRecord): Color
        return new Color(new RGB(0, 0, 0));
    };
}

/**
 * Represents a light in the scene that radially emits light.
 * @extends Light
 */
class PointLight extends Light {
    /**
     * Construct a Point light at position with color light_color
     * @param {Color} light_color - Color of the light
     * @param {Vector3} position - Position of the light in 3D space
     */
    constructor(light_color, position){
        super();
        this.I = light_color;
        this.p = position;
    }

    /**
     * Return color after BRDF calculation
     * @param {Ray} ray - Ray casted from camera
     * @param {HitRecord} hrec - HitRecord from casted ray
     * @returns {Color} Color from BRDF calculation
     */
    illuminate(ray, hrec, scene) {
        const x = ray.evaluate(hrec.t); // Position on surface
        const r = Vector3.subtract(this.p, x).length(); // Radius, distance from position on surface to position of light source
        const l = Vector3.scalarDivision(Vector3.subtract(this.p, x), r); // Light direction to surface point x (normalized)
        const n = hrec.n.normalize(); // Surface normal on surface at point x

        const srec = scene.surfaces_group.hit(new Ray(x, l), 0.1/*epsilon*/, r);

        // backwards for some reason????
        if (srec.t < Infinity) {
            return Color.black;
        }
        const E = new Color(RGB.scalarDivision(RGB.scalarMultiplication(this.I.rgb, Math.max(0, Vector3.dotProduct(n, l))),(r**2))); // Irradiance as Color object
        const k = hrec.s.material.evaluate(l, ray.direction/*v*/, n); // Specular Reflection stuff (BRDF)

        return new Color(RGB.multiply(E.rgb, k.rgb)); // completed BRDF
    }
}

/**
 * Produces ambient light in the scene
 * @extends Light
 */
class AmbientLight extends Light {
    /**
     * Constructs ambient light for the scene with color light_color
     * @param {Color} light_color 
     */
    constructor(light_color){
        super();
        this.I = light_color;
    }

    /**
     * Return color after BRDF calculation
     * @param {Ray} ray - Ray from view?
     * @param {HitRecord} hrec - HitRecord from the ray intersection
     * @returns {Color} color from BRDF calculation
     */
    illuminate(ray, hrec, scene){
        const k = hrec.s.material.ka;
        return new Color(RGB.multiply(k.rgb, this.I.rgb));
    }
}

/**
 * Defines the material for the applied surface
 */
class Material {

    color = new Color(new RGB(130, 130, 130)); // Color of the material
    ka = new Color(new RGB(100, 100, 100)); // Ambient Reflectance
    R = Color.white;//new Color(new RGB(46, 46, 46));
    p = 1; // Phong Exponent
    ks = new Color (new RGB(10, 10, 10)); // Specular coefficient
    /**
     * Calculates color with BRDF based on material
     * @param {Vector3} l - Light direction
     * @param {Vector3} v - Viewing direction
     * @param {Vector3} n - Surface normal
     * @returns {Color} color based on material
     */
    evaluate(l, v, n){
        
        const h = Vector3.add(l, v).normalize(); // Half vector
        return new Color(RGB.add(RGB.add(
            RGB.scalarDivision(this.R.rgb, Math.PI), 
            RGB.scalarMultiplication(
                this.ks.rgb, 
                Math.pow(
                    Math.max(0, Vector3.dotProduct(n, h)), 
                    this.p
                    )
                )),
            this.color.rgb
        ));
        
        //return new Color(RGB.add(RGB.scalarDivision(this.R.rgb, Math.PI), this.color.rgb));
        //return new Color( RGB.add(this.R.rgb, this.color.rgb));
    }
}