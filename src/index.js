const canvas = document.querySelector("#main-canvas");

const ctx = canvas.getContext('2d');

const height = document.querySelector('#main-canvas').height;
const width = document.querySelector('#main-canvas').width;
const imageData = ctx.createImageData(width, height);

const plane = new Plane(new Vector3(2,3,0), new Vector3(0, 0, 1));
plane.color = new RGB(255, 255, 0);

const sphere = new Sphere(new Vector3(0,0,0), 2);
sphere.color = new RGB(255, 0, 0);
const sphere2 = new Sphere(new Vector3(-3, 0, 0), 1, "2nd ball");
sphere2.color = new RGB(0, 0, 255);

const mainGroup = new Group([sphere2, sphere]);

const camera = new Camera();
camera.position = new Vector3(2,4,6);//new Vector3(1,3,5);
camera.view = new Vector3(3,2,5);//new Vector3(0,2,6);
camera.d = 5;

camera.create_basis();

mainGroup.surfaces.forEach(function(surf) {
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
            drawImage();
        });

        const coordText = document.createTextNode(input.id + ": ");

        coordDiv.appendChild(coordText);
        coordDiv.appendChild(input);
        divider.appendChild(coordDiv);
    });
});

function drawImage(){
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

            const view = camera.changeToPerspective(small_u, small_v);

            pixel_ray.origin = view.origin;
            pixel_ray.direction = view.direction;

            //HitRecord
            const pixel_hit = mainGroup.hit(pixel_ray, 0, 100);

            const pixel_color = pixel_hit.color.rgb;

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

drawImage();