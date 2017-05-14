/*
reference:  https://github.com/twolfson/gulp.spritesmith
reference:  https://github.com/twolfson/spritesheet-templates
 */

var fs = require('fs-extra');
var assert = require('assert');
var path = require('path');
var templater = require('spritesheet-templates');
var Spritesmith = require('spritesmith');

var extnameMap = {
    '.png': 'png',
    '.jpg': 'jpg',
    '.jpeg': 'jpeg',
    '.stylus': 'stylus',
    '.styl': 'stylus',
    '.less': 'less',
    '.sass': 'sass',
    '.scss': 'scss',
    '.css': 'css',
};

function getExtName(filepath) {
    var ext = path.extname(filepath);
    return extnameMap[ext];
}

function imgSprites(options) {
    var defaults = {
        imgName: 'sprites.png',
        cssName: 'sprites.css',
        imgDest: './dist',
        cssDest: './dist',
        padding: 4,
        algorithmOpts: {},
        engineOpts: {},
        imgOpts: {
            format: 'png',
        },
        cssVarMap: function () {},

        cssOpts: {
            functions: true,
            variableNameTransforms: '',
        },
    };

    return new Promise(function (resolve, reject) {
        var images = options.images;

        var params = Object.assign({}, defaults, options);

        var spritesmithParams = {
            engine: params.engine,
            algorithm: params.algorithm,
            padding: params.padding * 2,
            exportOpts: params.imgOpts,
        };

        assert(images, '`images` parameter was not provided (required)');

        var spritesmith = new Spritesmith(spritesmithParams);

        spritesmith.createImages(images, function (err, imgs) {
            if (err) {
                throw err;
            }

            var result = spritesmith.processImages(imgs, spritesmithParams);

            var coordinates = result.coordinates;
            var properties = result.properties;
            var spritePath = params.imgPath ? `${params.imgPath}/${params.imgName}` : params.imgName;
            var spritesheetData = {
                width: properties.width,
                height: properties.height,
                image: spritePath,
            };
            var cssVarMap = params.cssVarMap;

            var cleanCoords = [];

            Object.keys(coordinates).forEach(function (file) {
                var name = path.parse(file).name;
                var coords = coordinates[file];

                coords.name = name;
                coords.source_image = file;

                coords.image = spritePath;
                coords.total_width = properties.width;
                coords.total_height = properties.height;

                coords = cssVarMap(coords) || coords;

                cleanCoords.push(coords);
            });

            var handlebarsHelpers = params.cssHandlebarsHelpers;
            if (handlebarsHelpers) {
                Object.keys(handlebarsHelpers).forEach(function (helperKey) {
                    templater.registerHandlebarsHelper(helperKey, handlebarsHelpers[helperKey]);
                });
            }

            var cssFormat = 'spritesmith-custom';
            var cssTemplate = params.cssTemplate;
            if (cssTemplate) {
                templater.addHandlebarsTemplate(cssFormat, fs.readFileSync(cssTemplate, 'utf8'));
            } else {
                cssFormat = params.cssFormat;
                if (!cssFormat) {
                    cssFormat = getExtName(params.cssName);
                }

                if (cssFormat == 'css') {
                    templater.addTemplate(cssFormat, require(__dirname + '/lib/templates/css.template.js'));
                } else {
                    templater.addHandlebarsTemplate(cssFormat, fs.readFileSync(__dirname + `/lib/templates/${cssFormat}.template.handlebars`, 'utf8'));
                }
            }

            var cssStr = templater({
                sprites: cleanCoords,
                spritesheet: spritesheetData,
                spritesheet_info: {
                    name: params.cssSpritesheetName,
                },
            }, {
                format: cssFormat,
                formatOpts: params.cssOpts,
            });

            result.image.on('error', function (err) {
                throw err;
            });

            fs.ensureDirSync(params.imgDest);
            var writeStream = fs.createWriteStream(`${params.imgDest}/${params.imgName}`);

            result.image.pipe(writeStream);

            fs.ensureDirSync(params.cssDest);
            fs.writeFileSync(`${params.cssDest}/${params.cssName}`, cssStr);

            resolve();
        });

    });
}

module.exports = imgSprites;
