
var path = require('path');
var glob = require('glob');
var sprite = require('../');

glob('./examples/images/*.png', function (err, files) {

    var extcss = [
        'less',
        'styl',
        'sass',
        'scss',
    ];

    Promise.all(extcss.map(function (extname) {
        sprite({
            images: files,
            imgName: 'logo.png',
            cssName: `logo.${extname}`,
            imgDest: './ouput',
            cssDest: './ouput',
        }).then(function () {
            console.log(`\n ${extname} Success!\n`);
        }).catch(function (err) {
            console.log(err);
        });
    }) );
});