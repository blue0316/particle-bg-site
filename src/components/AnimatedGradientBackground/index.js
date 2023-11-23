import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function AnimatedGradientBackground(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const canvasElement = document.querySelector("canvas");
    if (!canvasElement) {
      console.log("Here is useEffect.");
      // Create a scene
      const scene = new THREE.Scene();

      // Create a perspective camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.y = 300;

      // Create a WebGLRenderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Append the renderer's DOM element to the container
      containerRef.current.appendChild(renderer.domElement);

      // Create OrbitControls and pass the camera and renderer
      const controls = new OrbitControls(camera, renderer.domElement);

      // Set the controls target to the center of the scene
      controls.target.set(0, 0, 0);

      // Disable controls to prevent further user interaction
      controls.enabled = false;

      // Enable damping for smooth animations
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;

      let vCheck = false;

      const randomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      const rgb = (r, g, b) => {
        return new THREE.Vector3(r, g, b);
      };

      const R = (x, y, t) => {
        return Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
      };

      const G = (x, y, t) => {
        return Math.floor(
          192 +
            64 *
              Math.sin(
                (x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300
              )
        );
      };

      const B = (x, y, t) => {
        return Math.floor(
          192 +
            64 *
              Math.sin(
                5 * Math.sin(t / 9) +
                  ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
              )
        );
      };

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

      const geometry = new THREE.PlaneGeometry(
        window.innerWidth / 2,
        400,
        100,
        100
      );
      const material = new THREE.ShaderMaterial({
        uniforms: {
          u_bg: { type: "v3", value: rgb(162, 138, 241) },
          u_bgMain: { type: "v3", value: rgb(162, 138, 241) },
          u_color1: { type: "v3", value: rgb(162, 138, 241) },
          u_color2: { type: "v3", value: rgb(82, 31, 241) },
          u_time: { type: "f", value: 30 },
          u_randomisePosition: { type: "v2", value: new THREE.Vector2(1, 2) },
        },
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
                vDistortion = snoise(vUv.xx * 3. - u_randomisePosition * 0.15);
                xDistortion = snoise(vUv.yy * 1. - u_randomisePosition * 0.05);
                vec3 pos = position;
                pos.z += (vDistortion * 35.);
                pos.x += (xDistortion * 25.);
    
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      mesh.scale.multiplyScalar(4);
      mesh.rotation.x = -1.8;
      mesh.rotation.y = 0.0;
      mesh.rotation.z = -0.3;
      scene.add(mesh);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);

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

        j += 0.001;
        t += 0.01;
      };

      let t = 0;
      let j = 0;
      let x = randomInteger(0, 32);
      let y = randomInteger(0, 32);

      animate();

      return () => {
        renderer.dispose();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen h-screen">
        <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-20" />
      <div className="absolute top-0 left-0 w-screen h-screen">
        {props.children}
      </div>
    </div>
  );
}

export default React.memo(AnimatedGradientBackground);
