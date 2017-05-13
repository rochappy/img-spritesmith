
var fs = require('fs');
var handlebars = require('handlebars');
var tmpl = fs.readFileSync(__dirname + '/css.template.handlebars', 'utf8');

function cssTemplate(data) {

data.sprites.map(function (item){
  item.px.width = parseInt(item.px.width) /2 + 'px' ;
  item.px.height = parseInt(item.px.height) /2 + 'px' ;
  item.px.offset_x = parseInt(item.px.offset_x) /2 + 'px' ;
  item.px.offset_y = parseInt(item.px.offset_y) /2 + 'px' ;
  item.px.total_width = parseInt(item.px.total_width) /2 + 'px' ;
  item.px.total_height = parseInt(item.px.total_height) /2 + 'px' ;

});

  var css = handlebars.compile(tmpl)(data);
  return css;
}

module.exports = cssTemplate;
