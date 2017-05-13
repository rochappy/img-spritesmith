将一组图片转换 sprites 和 css, less, stylus, sass, scss

简化版 [gulp-spritesmith]，针对移动端自动使用 retina 2倍图

[gulp-spritesmith]: https://github.com/twolfson/gulp.spritesmith
[spritesmith]: https://github.com/Ensighten/spritesmith

# 入门
安装模块，`npm install img-spritesmith`

```js
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

# 文档

- **params** `Object`
    - **images:** `Array` 输入图片路径
    
    - **imgDest:** `String` 输出图片路径

        Default: `'./dist/sprite/'`
    
    - **cssDest:** `String` 输出样式路径

        Default: `'./dist/sprite/'`
    
    - **imgName:** `String` 输出图片名称

        Default: `'sprites.png'`
    
    - **cssName:** `String` 输出样式名称

        Default: `'sprites.css'`
    
    - **padding:** `Number` 图片间间隔

        Default: `4`
    
    - **cssOpts:** `Object`
        + **functions:** `Boolean`
        + **variableNameTransforms:** 转换变量格式

        Defaults:

        ```js
        functions: true,
        variableNameTransforms: ''
        ```
    - 其余与 spritesmith 保持一致


- 返回值 `Promise`

