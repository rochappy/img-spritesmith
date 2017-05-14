# Overview

Convert a set of images into a spritesheet and CSS variables

lite [gulp-spritesmith], For the mobile side automatically use retina

# Installation

run `npm install img-spritesmith`

# Use

```js
sprites = require('img-spritesmith')

sprites({
    images: ['a.png', 'b.png'],
    imgName: 'logo.png',
    cssName: 'logo.css',
    imgDest: './output',
    cssDest: './output',
}).then(function () {
    console.log('Success!');
}).catch(function (err) {
    console.log(err);
});
```

# Documentation

- **params** `Object`
    - **images:** `Array` entry images files

    - **imgDest:** `String` output images path

        Default: `'./dist/sprite/'`

    - **cssDest:** `String` output css path

        Default: `'./dist/sprite/'`

    - **imgName:** `String` output images name

        Default: `'sprites.png'`

    - **cssName:** `String` output css path

        Default: `'sprites.css'`

    - **padding:** `Number` spacing between images for [spritesmith documentation]

        Default: `4`
    - **cssSpritesheetName** `String` Prefix to use for all spritesheet variables for [spritesheet-templates documentation]

        Default: ``

    - **cssOpts:** `Object` Options to pass through to the formatter
        + **functions:** `Boolean`
        + **variableNameTransforms:**

        Defaults:

        ```js
        functions: true,
        variableNameTransforms: ''
        ```
    - Other parameters for [spritesmith documentation]


- **return** `Promise`


[gulp-spritesmith]: https://github.com/twolfson/gulp.spritesmith
[spritesmith]: https://github.com/Ensighten/spritesmith
[spritesmith documentation]: https://github.com/Ensighten/spritesmith#documentation
 [spritesheet-templates documentation]: https://github.com/twolfson/spritesheet-templates#documentation

