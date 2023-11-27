// Import necessary hooks and components from React library
import React, { useEffect, useRef, useState } from "react";
// Import the core Three.js library
import * as THREE from "three";
// Import OrbitControls which allows the camera to orbit around a target
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Define a functional component to create an animated gradient background
function AnimatedGradientBackground(props) {
  // Create a mutable ref object to store the container DOM element
  const containerRef = useRef(null);

  // State variables for storing window dimensions
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  // Handler function that updates width and height state based on window size
  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  // Effect hook for setting up and cleaning up the canvas and window resize event
  useEffect(() => {
    // Query for a canvas element in the document
    const canvasElement = document.querySelector("canvas");
    // If there is no existing canvas, call makeCanvas to create one
    if (!canvasElement) {
      makeCanvas();
    }

    // Perform an initial resize operation
    handleResize();

    // Add a 'resize' event listener to the window that calls handleResize
    window.addEventListener("resize", handleResize);

    // Specify cleanup logic for removing the event listener when unmounting the component
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Effect hook for re-rendering the canvas on window resize by listening to changes in width and height
  useEffect(() => {
    // Query for a canvas element in the document
    const canvasElement = document.querySelector("canvas");
    // If a canvas exists, remove it before creating a new one
    if (canvasElement) {
      canvasElement.remove();
    }
    // Call makeCanvas to create and append a new canvas
    makeCanvas();
  }, [width, height]); // Dependencies on width and height ensure this effect runs when they change

  // Function that creates the canvas and sets up the Three.js scene, camera, and renderer
  const makeCanvas = () => {
    // Local variable to track vertical direction of color oscillation
    let vCheck = false;

    // Helper function to generate a random integer between min and max (inclusive)
    const randomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Helper function to build a Three.js Vector3 from RGB values
    const rgb = (r, g, b) => {
      return new THREE.Vector3(r, g, b);
    };

    // Functions that calculate RGB channel values based on position (x, y) and time (t)
    const R = (x, y, t) => {
      // Produces a red-ish shade varying with x, y, and t
      return Math.floor(184 + 72 * Math.cos((x * x - y * y) / 300 + t));
    };

    const G = (x, y, t) => {
      // Produces a green-ish shade varying differently with x, y, and t
      return Math.floor(
        184 +
          72 *
            Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
      );
    };

    const B = (x, y, t) => {
      // Produces a blue-ish shade varying differently with x, y, and t
      return Math.floor(
        184 +
          72 *
            Math.sin(
              5 * Math.sin(t / 9) +
                ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
            )
      );
    };

    // Scene setup starts here

    // Create a Three.js scene
    const scene = new THREE.Scene();

    // Create a perspective camera with aspect ratio based on window size
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Set the initial Y position for the camera
    camera.position.y = 350;

    // Create a WebGLRenderer for rendering the scene with Three.js
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer's DOM element (the canvas) to the container in our React component
    containerRef.current.appendChild(renderer.domElement);

    // Initialize OrbitControls allowing user to interact with the scene using mouse or touchscreen
    const controls = new OrbitControls(camera, renderer.domElement);
    // Set the controls target to the center of the scene
    controls.target.set(0, 0, 0);
    // Allow the controls to be used by the user
    controls.enabled = true;
    // Enable damping (inertia) for smoother control interaction
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Placeholder scalar noise function definition to be used in shaders
    const sNoise = `
            // Insert snoise function here
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    
            float snoise(vec2 v) {
                const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                    0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                                    -0.577350269189626,  // -1.0 + 2.0 * C.x
                                    0.024390243902439); // 1.0 / 41.0
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod289(i); // Avoid truncation effects in permutation
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                    + i.x + vec3(0.0, i1.x, 1.0 ));
    
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }
        `;

    // Create the geometry for the plane that will display the gradient
    const geometry = new THREE.PlaneGeometry(
      Math.max(window.innerWidth, window.innerHeight) / 2,
      Math.max(window.innerWidth, window.innerHeight) / 2,
      200,
      200
    );

    // ShaderMaterial setup starts here

    // Create a shader material defining uniforms and shaders
    const material = new THREE.ShaderMaterial({
      // Definitions of uniforms (global variables) used in shaders
      uniforms: {
        u_bg: { type: "v3", value: rgb(162, 138, 241) },
        u_bgMain: { type: "v3", value: rgb(162, 138, 241) },
        u_color1: { type: "v3", value: rgb(162, 138, 241) },
        u_color2: { type: "v3", value: rgb(82, 31, 241) },
        u_time: { type: "f", value: 30 },
        u_randomisePosition: { type: "v2", value: new THREE.Vector2(1, 2) },
      },
      // Fragment shader code responsible for pixel coloring
      fragmentShader:
        sNoise +
        `
            // Insert fragment shader code here
            vec3 rgb(float r, float g, float b) {
                return vec3(r / 255., g / 255., b / 255.);
            }
    
            vec3 rgb(float c) {
                return vec3(c / 255., c / 255., c / 255.);
            }
    
            uniform vec3 u_bg;
            uniform vec3 u_bgMain;
            uniform vec3 u_color1;
            uniform vec3 u_color2;
            uniform float u_time;
    
            varying vec2 vUv;
            varying float vDistortion;
    
            void main() {
                vec3 bg = rgb(u_bg.r, u_bg.g, u_bg.b);
                vec3 c1 = rgb(u_color1.r, u_color1.g, u_color1.b);
                vec3 c2 = rgb(u_color2.r, u_color2.g, u_color2.b);
                vec3 bgMain = rgb(u_bgMain.r, u_bgMain.g, u_bgMain.b);
    
                float noise1 = snoise(vUv + u_time * 0.08);
                float noise2 = snoise(vUv * 2. + u_time * 0.1);
    
                vec3 color = bg;
                color = mix(color, c1, noise1 * 0.6);
                color = mix(color, c2, noise2 * .4);
    
                color = mix(color, mix(c1, c2, vUv.x), vDistortion);
    
                float border = smoothstep(0.1, 0.6, vUv.x);
    
                color = mix(color, bgMain, 1. -border);
    
                gl_FragColor = vec4(color, 1.0);
            }
          `,
      // Vertex shader code responsible for vertex positioning
      vertexShader:
        sNoise +
        `
            // Insert vertex shader code here
            uniform float u_time;
            uniform vec2 u_randomisePosition;
    
            varying float vDistortion;
            varying float xDistortion;
            varying vec2 vUv;
    
            void main() {
                vUv = uv;
                vDistortion = snoise(vUv.xx * 3. - u_randomisePosition * 0.05);
                xDistortion = snoise(vUv.yy * 1. - u_randomisePosition * 0.05);
                vec3 pos = position;
                pos.z += (vDistortion * 3.);
                pos.x += (xDistortion * 10.);
    
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
    });

    // Creation of mesh combining plane geometry and shader material
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    mesh.scale.multiplyScalar(4);
    mesh.rotation.x = -1.57; // Rotate to lay flat
    mesh.rotation.y = 0.0;
    mesh.rotation.z = 0;
    // Add the mesh to the scene
    scene.add(mesh);

    // Animation loop for updating the scene and rendering
    const animate = () => {
      requestAnimationFrame(animate);
      // Update controls based on user interactions
      controls.update();
      // Render the scene with the camera
      renderer.render(scene, camera);

      // Update uniforms and other properties for animation
      mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(
        j,
        j
      );

      mesh.material.uniforms.u_color1.value = new THREE.Vector3(
        R(x, y, t / 2),
        G(x, y, t / 2),
        B(x, y, t / 2)
      );

      mesh.material.uniforms.u_time.value = t;

      mesh.rotation.z += 0.001;

      if (t % 0.1 === 0) {
        if (vCheck === false) {
          x -= 1;
          if (x <= 0) {
            vCheck = true;
          }
        } else {
          x += 1;
          if (x >= 32) {
            vCheck = false;
          }
        }
      }

      // Increment variables controlling the animation
      j += 0.001;
      t += 0.015;
    };

    // Variables used within the animation
    let t = 0;      // Time variable for animation
    let j = 0;      // Offset variable for animation
    let x = randomInteger(0, 32); // Starting X position for color calculations
    let y = randomInteger(0, 32); // Starting Y position for color calculations

    // Start the animation loop
    animate();

    // Return a cleanup function to dispose of resources when the component is unmounted
    return () => {
      renderer.dispose();
    };
  };

  // Render JSX for the component containing a div to hold the canvas and any children passed into this component
  return (
    <div ref={containerRef} className="relative w-screen h-screen">
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-20" />
      <div className="absolute top-0 left-0 w-screen h-screen">
        {props.children}
      </div>
    </div>
  );
}

// Export the component wrapped in React.memo for performance optimization
export default React.memo(AnimatedGradientBackground);