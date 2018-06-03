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
import { Renderer, Shader } from '..';

const fragment = new Shader('fragment', `
    precision mediump float;

    out vec4 v_Color;

    void main () {
        v_Color = vec4(1.0, 0.0, 0.5, 1.0);
    }
`);

const vertex = new Shader('vertex', `
    in vec2 a_Position;

    uniform vec2 u_Resolution;

    void main () {
        vec2 one = a_Position / u_Resolution;
        vec2 two = one * 2.0;
        vec2 clip = two - 1.0;
        vec2 flip = vec2(1.0, -1.0);

        gl_Position = vec4(clip * flip, 0.0, 1.0);
    }
`);

const renderer = new Renderer(canvas);

renderer.initialize('default', [ fragment, vertex ]);

renderer.setUniform('u_Resolution', [ canvas.width, canvas.height ]);

renderer.setAttribute('a_Position', [
    32, 32,
    64, 32,
    32, 64,
    32, 64,
    64, 32,
    64, 64,
]);

renderer.draw(6);
```
