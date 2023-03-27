const canvas = document.querySelector("#main-canvas");

const ctx = canvas.getContext('2d');

let orth = false;

const height = document.querySelector('#main-canvas').height;
const width = document.querySelector('#main-canvas').width;
const imageData = ctx.createImageData(width, height);

const plane = new Plane(new Vector3(2,3,0), new Vector3(0, 0, 1));
plane.color = new RGB(255, 255, 0);
plane.material.color = new Color(plane.color);
plane.material.ka = new Color(new RGB(100, 100, 0)); // ambient reflection coefficient

const sphere = new Sphere(new Vector3(0,0,2), 2);
sphere.color = new RGB(255, 0, 0);
sphere.material.color = new Color(sphere.color);
sphere.material.ka = new Color(new RGB(100, 0, 0)); // ambinent reflection coefficient
sphere.material.ks = new Color(new RGB(100, 100, 100)); // Specular coefficient
sphere.material.p = 1; // Phone exponent

const sphere2 = new Sphere(new Vector3(-3, 0, 1), 1, "2nd ball");
sphere2.color = new RGB(0, 0, 255);
sphere2.material.color = new Color(sphere2.color);
sphere2.material.ka = new Color(new RGB(0, 0, 100)); // ambient reflection coefficient

const mainGroup = new Group([plane, sphere2, sphere]);

const camera = new Camera();
camera.position = new Vector3(6,7,3);//new Vector3(1,3,5);
camera.view = new Vector3(1,1,0);//new Vector3(0,2,6);
camera.d = 10;

const scene = new Scene();
scene.main_camera = camera;
scene.surfaces_group = mainGroup;
scene.background_color = new Color(new RGB(145, 207, 255));
const light1 = new PointLight(new Color(new RGB(50, 50, 50)), new Vector3(8, 7, 10));
const light2 = new PointLight(new Color(new RGB(15, 15, 15)), new Vector3(-6, 8, 6));
const ambientLight = new AmbientLight(new Color(new RGB(1, 1, 1)));
scene.lights.push(light1);
//scene.lights.push(light2);
scene.lights.push(ambientLight);

scene.main_camera.create_basis();

scene.surfaces_group.surfaces.forEach(function(surf) {
    if (surf.name === "plane") return;

    //create a div with name and coordinates
    const mainDiv = document.querySelector("#input-div");

    const divider = document.createElement("div");
    divider.id = surf.name + "-divider";
    divider.classList.add("surface-input-div");
    mainDiv.appendChild(divider);

    const nameText = document.createTextNode(surf.name);

    divider.appendChild(nameText);

    const inputXYZ = [document.createElement("input"), document.createElement("input"), document.createElement("input")];
    // only for spheres rn
    inputXYZ[0].id = "x";
    inputXYZ[0].value = surf.center.x;

    inputXYZ[1].id = "y";
    inputXYZ[1].value = surf.center.y;

    inputXYZ[2].id = "z";
    inputXYZ[2].value = surf.center.z;

    inputXYZ.forEach(input => {
        const coordDiv = document.createElement("div");
        input.placeholder = input.id;
        input.classList.add("coord-input");
        input.type = "number";

        input.addEventListener('input', (e) => {
            if (input.id === 'x'){
                surf.center.x = e.target.value;
            }else if (input.id === 'y') {
                surf.center.y = e.target.value;
            }
            else {
                surf.center.z = e.target.value;
            }
            drawImage(orth);
        });

        const coordText = document.createTextNode(input.id + ": ");

        coordDiv.appendChild(coordText);
        coordDiv.appendChild(input);
        divider.appendChild(coordDiv);
    });
});

const camera_ids = [
    "camera-pos-x", "camera-pos-y", "camera-pos-z",
    "camera-dir-x", "camera-dir-y", "camera-dir-z",
    "camera-distance", "camera-type"
];

function callBack(str) {
    str = str.substring(7);

    if (str === 'distance') {
        return function (e){
            scene.main_camera.d = Number(e.target.value);
            drawImage(orth);
        }
    }else if (str === 'type') {
        return function (e) {
            orth = e.target.checked;
            drawImage(orth);
        }
    }
    else{
        const prefix = str.substring(0, 3);
        const suffix = str.substring(4);

        if (prefix === 'pos') {
            switch (suffix){
                case 'x':
                    return function (e) {
                        scene.main_camera.position.x = Number(e.target.value);
                        drawImage(orth);
                    }
                
                case 'y':
                    return function (e) {
                        scene.main_camera.position.y = Number(e.target.value);
                        drawImage(orth);
                    }
                
                case 'z':
                    return function(e) {
                        scene.main_camera.position.z = Number(e.target.value);
                        drawImage(orth);
                    }
            }
        }
        else if (prefix === 'dir') {
            switch (suffix){
                case 'x':
                    return function (e) {
                        scene.main_camera.view.x = Number(e.target.value);
                        scene.main_camera.create_basis();
                        drawImage(orth);
                    }
                
                case 'y':
                    return function (e) {
                        scene.main_camera.view.y = Number(e.target.value);
                        scene.main_camera.create_basis();
                        drawImage(orth);
                    }
                
                case 'z':
                    return function(e) {
                        scene.main_camera.view.z = Number(e.target.value);
                        scene.main_camera.create_basis();
                        drawImage(orth);
                    }
            }
        }
    }

    return function (e) {
        console.log(e);
    }
}

// [pos: x, y, z, dir: x, y, z]
//const camera_coords = [];
camera_ids.forEach(str => {
    document.querySelector("#"+str).addEventListener('input', callBack(str));
});

/**
 * Returns the color at specific position based on ray in the interval [t0, t1]
 * @param {Ray} ray - Ray being casted
 * @param {Number} t0 - min of interval
 * @param {Number} t1 - max of interval
 * @returns {Color} the color from casted ray
 */
function shade_ray (ray, t0, t1) { // This function is gonna float around for a bit right now until i figure out exactly where i want it
    const rec = scene.surfaces_group.hit(ray, t0, t1);
    if (rec.t < Infinity) {
        let c = new Color(new RGB(0, 0, 0)); // Initiate color as Color.black
        for (let light of scene.lights) {
            c = new Color(RGB.add(c.rgb, light.illuminate(ray, rec, scene).rgb));
        }
        return c;
    }
    //else
    return scene.background_color;
}

function drawImage(ortho){
    for (let i = 0; i < imageData.width; i ++) {
        for(let j = 0; j < imageData.height; j ++){
            const pixel_ray = new Ray(new Vector3(0,0,0), new Vector3(0,0,0));

            //l = -10, r = 10
            //t = 5, b = -5

            const small_u = -10+((20)*(i+0.5)/width);
            const small_v = -5+((10)*(j+0.5)/height);

            // pixel_ray.origin = camera.position;
            // pixel_ray.direction = Vector3.add(Vector3.scalarMultiplication(camera.coord[2], -camera.d), 
            // Vector3.add(Vector3.scalarMultiplication(camera.coord[0], small_u), 
            // Vector3.scalarMultiplication(camera.coord[1], -small_v))).normalize();

            const view = (ortho) ? scene.main_camera.changeToOrthographic(small_u, small_v) : scene.main_camera.changeToPerspective(small_u, small_v);

            pixel_ray.origin = view.origin;
            pixel_ray.direction = view.direction;

            // Stores the HitRecord of the nearest surface or null if miss
            //const pixel_hit = scene.surfaces_group.hit(pixel_ray, 0, 100);

            // Stores color returned from HitRecord
            //const pixel_color = pixel_hit.color.rgb;
            
            if (i === 400 && j === 300) {
                console.log("here");
            }
            // Stores color computed by shading
            const pixel_color = shade_ray(pixel_ray, 0, 100).rgb.rgb;


            const pixel = j * (width * 4) + i * 4;

            // Modify pixel data
            imageData.data[pixel + 0] = pixel_color[0]; // R value
            imageData.data[pixel + 1] = pixel_color[1]; // G value
            imageData.data[pixel + 2] = pixel_color[2]; // B value
            imageData.data[pixel + 3] = 255; // A value
        }
    }
    
    // Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0);
}

drawImage(orth);