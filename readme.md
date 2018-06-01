```  
     ___    _  ___    ___   __   __   ___
    // \\  // // \\  //||  // \ // \ // \\
   //__// // //     //_||  \\   \\  //  //
  //     //  \\_// //  ||\_// \_//  \\_//

          (c) 2018 Cyclonic Games
```

### `// INSTALL`
We do not publish our packages on any package managers; as long as your package manager supports github, you're good to go. For NPM, use the following command:

```shell
npm install cyclone-games/picasso --save # requires git to be installed
```

### `// EXAMPLE`

```javascript
import { Renderer, Shader } from 'picasso';

// Instantiate a Renderer -- this is our main interface into WebGL
const renderer = new Renderer(canvas);

// Create a fragment shader
const fragmentShader = new Shader('fragment', `
     precision mediump float;
     
     uniform sampler2D u_image;
     varying vec2 v_textureCoords;
     
     void main() {
          gl_FragColor = texture2D(u_image, v_textureCoords);
     }
`);

// Create a vertex shader
const vertexShader = new Shader('vertex', `
     attribute vec2 a_position;
     attribute vec2 a_textureCoords;
     
     uniform mat3 u_matrix;
     uniform vec2 u_resolution;
     
     varying vec2 v_textureCoords;
     
     void main() {
          vec2 projected = (u_matrix * vec3(a_position, 1.0)).xy;
          vec2 normal = projected / u_resolution;
          vec2 clipspace = (normal * 2.0) - 1.0;
          
          gl_Position = vec4(clipspace * vec2(1.0, -1.0), 0.0, 1.0);
          
          v_textureCoords = a_textureCoords;
     }
`);

// Initialize the pair of shaders as our "default" program
renderer.initialize('default', [ fragmentShader, vertexShader ]);

// Render an object to WebGL
renderer.render(/* TODO */);
```
