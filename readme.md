**```  
     ___    _  ___    ___   __   __   ___
    // \\  // // \\  //||  // \ // \ // \\
   //__// // //     //_||  \\   \\  //  //
  //     //  \\_// //  ||\_// \_//  \\_//

          (c) 2018 Cyclonic Games
```**

### `// INSTALL`
We do not publish our packages on any package managers; as long as your package manager supports github, you're good to go. For NPM, use the following command:

```shell
npm install cyclone-games/picasso --save # requires git to be installed
```

### `// EXAMPLES`
The below code is entire pseudo; real documentation coming soon.

```javascript
import picasso from 'picasso';

picasso.initialize();

picasso.createProgram('default', [
    picasso.createShader('fragment', `
        // ...
    `),
    picasso.createShader('vertex', `
        // ...
    `);
]);

picasso.render(picasso.createObject(...));
```
