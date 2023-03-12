/**
 * Light class interface.
 */
class Light {
    // illuminate(ray: Ray, hrec: HitRecord): Color
    illuminate(ray, hrec){
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
    illuminate(ray, hrec) {
        x = ray.evaluate(hrec.t); // Position on surface
        r = Vector3.subtract(this.p, x).length(); // Radius, distance from position on surface to position of light source
        l = Vector3.scalarDivision(Vector3.subtract(this.p, x), r); // Light direction to surface point x (normalized)
        n = hrec.n; // Surface normal on surface at point x

        E = new Color(RGB.scalarDivision(RGB.scalarMultiplication(this.I, Math.max(0, Vector3.dotProduct(n, l))),(r**2))); // Irradiance as Color object
        k = hrec.s.material.evaluate(l, v, n); // BRDF shading... i think

        return new Color(RGB.multiply(E, k)); // completed BRDF... i think
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
    illuminate(ray, hrec){
        k = hrec.s.material.ka;
        return new Color(RGB.multiply(k, this.I));
    }
}

/**
 * Defines the material for the applied surface
 */
class Material {

    color = new Color(new RGB(0, 0, 0)); // Color of the material
    ka = new Color(new RGB(0, 0, 0));

    /**
     * Calculates color with BRDF based on material
     * @param {Vector3} l - Light direction
     * @param {Vector3} v - Viewing direction
     * @param {Vector3} n - Surface normal
     * @returns {Color} color based on material
     */
    evaluate(l, v, n){
        // Implement Blinn-Phong shading : TODO later
        return new Color(new RGB(0,0,0))
    }
}