var $ = require('jquery');
var applyTransform = require('./foreign/transform');

var swapCorners = function(arr) {
    var temp = arr[3];
    arr[3] = arr[2];
    arr[2] = temp;
    return arr;
};

var $container = $('.container');
var $surfaceTpl = $('<div class="surface"></div>');
var boundsClass = 'bounds';

function Surface(surfaceConfig) {
    this.$el = $surfaceTpl.clone();

    this.$el.css({
        'width': surfaceConfig.width,
        'height': surfaceConfig.height
    });

    var from = swapCorners([
        [0, 0], [surfaceConfig.width, 0],
        [0, surfaceConfig.height], [surfaceConfig.width, surfaceConfig.height]
    ]);

    var to = swapCorners(surfaceConfig.cornerPoints);

    applyTransform(this.$el, from, to);

    if(surfaceConfig.type == 'fugueInk') {
        //initFugueInk();
    }
    else {
        this.canvas = document.createElement('canvas');
        this.canvas.width = surfaceConfig.width;
        this.canvas.height = surfaceConfig.height;
        this.ctx = this.canvas.getContext('2d');
        this.$el.append(this.canvas);
    }

    $container.append(this.$el);
}

Surface.prototype.toggleBounds = function() {
    this.$el.toggleClass(boundsClass);
}

module.exports = Surface;