var getTransform = function (from, to) {
    var A, H, b, h, i, k, k_i, l, lhs, m, ref, rhs;
    A = [];
    for (i = k = 0; k < 4; i = ++k) {
        A.push([
            from[i].x,
            from[i].y,
            1,
            0,
            0,
            0,
            -from[i].x * to[i].x,
            -from[i].y * to[i].x
        ]);
        A.push([
            0,
            0,
            0,
            from[i].x,
            from[i].y,
            1,
            -from[i].x * to[i].y,
            -from[i].y * to[i].y
        ]);
    }
    b = [];
    for (i = l = 0; l < 4; i = ++l) {
        b.push(to[i].x);
        b.push(to[i].y);
    }
    h = numeric.solve(A, b);
    H = [
        [
            h[0],
            h[1],
            0,
            h[2]
        ],
        [
            h[3],
            h[4],
            0,
            h[5]
        ],
        [
            0,
            0,
            1,
            0
        ],
        [
            h[6],
            h[7],
            0,
            1
        ]
    ];
    for (i = m = 0; m < 4; i = ++m) {
        lhs = numeric.dot(H, [
            from[i].x,
            from[i].y,
            0,
            1
        ]);
        k_i = lhs[3];
        rhs = numeric.dot(k_i, [
            to[i].x,
            to[i].y,
            0,
            1
        ]);
    }
    return H;
};

Template.screenSurface.helpers({
	transform: function() {
		var origPosition = [
			{x: 0, y: 0},
			{x: 0, y: this.height},
			{x: this.width, y: 0},
			{x: this.width, y: this.height}];
		var H = getTransform(origPosition, this.cornerPoints);

		return 'matrix3d(' + function () {
            var k, results;
            results = [];
            for (i = k = 0; k < 4; i = ++k) {
                results.push(function () {
                    var l, results1;
                    results1 = [];
                    for (j = l = 0; l < 4; j = ++l) {
                        results1.push(H[j][i].toFixed(20));
                    }
                    return results1;
                }());
            }
            return results;
        	}().join(',') + ')';
	}
});