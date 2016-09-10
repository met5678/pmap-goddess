#!/bin/sh

watchify js/main.js -o screen/screen.js -t [ babelify --presets [ es2015 ] ] -t require-globify -v
/usr/bin/open -a "/Applications/Google Chrome.app" 'screen/screen.html'