# Web Raytracing Example
## still a work in progress pls be nice

this is just something I am working on to practice and learn more about 3D graphics fundamentals and implementation (not using WebGL).
very fun so far :^)  

I will eventually recreate this in C++ with a graphics library and I hopefully won't pull my hair out.  

the site can be viewed [here](https://rt-example.jsanchezroa.umasscreate.net/) whenever its updated lol

## Updates

### 3/27/2023  
**Shading update**  
I tried to implement Blinn-Phong shading but I had trouble and it's not working quite right. Although there are shadows now and the shading does look a lot more natural/better than before.
### *lights.js* 
* Implemented shadows by using the scene to cast rays from the surface back to the light to check if it is blocked by another surface
* Implemented proper coloring of surfaces by adding the RGB values of the material's color instead of multiplying it by the ambient light.
* Sort of implemented Blinn-Phong shading. The shading looks better, and the equation is correct. But anytime I crank up the Phong exponent, the material doesn't get shinier and even appears to be more matte. IDK, I will look at it more and fix it next time.

### *index.js*
* Updated the values for materials according to new shading method
* Also updated the `shade_ray()` function accordingly

**Plus some other small tweaks**

### 3/14/2023
**Shading!!!** but without shadows or specular highlights
#### *lights.js*
* Had to fix some RGB calculation issues since I would keep either putting the Color object or the RGB object from the Color object into the calculations for RGB since I needed to actually put in the `[r,g,b]` array from the RGB object. This is annoying and will be mitigated when I remake this in C++.
* Also I understand the code a lot more now. The `evaluate()` function from the Material class only returns the color of the material since there is no proper specular highlights or any of that stuff right now for the BRDF. The `ka` value is preset in the *index.js* file and is just a less intense color of the material.
#### *index.js*
* Implemented the `shade_ray()` function which is just kind of floating around for now before I really try to fit it somwhere.
* Added lights to the scene (2 point lights, 1 ambient light) with proper colors after a lot, a lot, a lot of testing. Each object also has materials and proper color/ka values. Going to remove the `color` properties of the surface objects in the future.
* Called the `create_basis()` from the scene camera to fix the rotation from the HTML input. Also used `Number()` function to turn the string inputs into actual numbers lol. I didn't realize until like the shading stopped working whenever I changed the camera position.
* Changed camera position and view to better showcase the scene
#### *index.html*
* Fixed camera view, not it rotates properly (had to recreate the basis with the camera after input change). The orthographic view is not working so I disabled it in the HTML for now.
* Changed the values in the HTML to mirror the new camera values.  

#### *Everywhere else*
* CSS got changed to make the site look nicer by changing font, flex properties, etc.  
* added a bunch of JDocs everywhere, mostly to help me remember the types for each fucntion as this web app gets bigger.

### 3/11/2023
* Added README
* Added Light classes and "interfaces"
* Added Material class
* Added github link and some styling
* Added a lot of JDocs, like not enough but quite a bit