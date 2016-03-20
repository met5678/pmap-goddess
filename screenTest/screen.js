var surfaces = [
    {
        name: 'tilda',
        width: 596,
        height: 792,
        cornerPoints: [
            [100, 100], [696, 100],
            [100, 892], [696, 892]
        ],
        content: {
            video: "http://castvideomatrix.s3-website-us-east-1.amazonaws.com/adam.webm",
            fugueInk: true
        },
        background: 'transparent'
    }
];

var swapCorners = function(arr) {
    var temp = arr[3];
    arr[3] = arr[2];
    arr[2] = temp;
    return arr;
};

$(function() {
    require(['jquery','fugueInk','jquery.fullscreen'], function() {
        var $container = $('.container');
        var $surfaceTpl = $('<div class="surface"></div>');

        for(var a=0; a<surfaces.length; a++) {
            var surface = surfaces[a];
            var $surface = $surfaceTpl.clone();
            $surface.css({
                'background-color': surface.background,
                'width': surface.width,
                'height': surface.height
            });

            var from = swapCorners([
                [0, 0], [surface.width, 0],
                [0, surface.height], [surface.width, surface.height]
            ]);

            var to = swapCorners(surface.cornerPoints);

            applyTransform($surface, from, to);

            $container.append($surface);

            if(surface.content.fugueInk) {
                $surface.attr({
                    'data-source':'svg:#tildaSVG',
                    'data-color':'rgba(255,255,255,.45)',
                    'data-frequency':'450',
                    'data-length':'[1,5]',
                    'data-jump':'[1,1]',
                    'data-skip':'[0,2]',
                    'data-radius':'[6,12]',
                    'data-filled':'80'
                });
                $surface.fugueInk();
            }
        }

        $(document).keydown(function(e) {
            if(e.which == 70 && e.ctrlKey) {
                $(document).fullScreen(true);
            }
        });

    });
});