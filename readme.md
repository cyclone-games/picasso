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

    in vec2 v_Sample;
    uniform sampler2D u_Texture;

    out vec4 v_Color;

    void main () {
        v_Color = texture(u_Texture, v_Sample);
    }
`);

const vertex = new Shader('vertex', `
    in vec2 a_Position;
    in vec2 a_Sample;
    uniform vec2 u_Resolution;

    out vec2 v_Sample;

    void main () {
        vec2 one = a_Position / u_Resolution;
        vec2 two = one * 2.0;
        vec2 clip = two - 1.0;
        vec2 flip = vec2(1.0, -1.0);

        gl_Position = vec4(clip * flip, 0.0, 1.0);
        v_Sample = a_Sample;
    }
`);

const image = new Image();

const renderer = new Renderer(canvas);

renderer.initialize('default', [ fragment, vertex ]);

image.onload = () => {
    renderer.setUniform('u_Resolution', [ canvas.width, canvas.height ]);
    renderer.setUniform('u_Texture', [ image, 32, 32 ]);
    renderer.setAttribute('a_Position', [
        32, 32,
        64, 32,
        32, 64,
        32, 64,
        64, 32,
        64, 64,
    ]);
    renderer.setAttribute('a_Sample', [
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1
    ]);
    renderer.draw(6)
};

image.src = './kazoo.jpeg';
```
