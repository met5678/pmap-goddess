#!/bin/sh

watchify -t require-globify js/main.js -o screen/screen.js -v
/usr/bin/open -a "/Applications/Google Chrome.app" 'screen/screen.html'