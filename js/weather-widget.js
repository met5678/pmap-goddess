var $ = require('jquery');
var surface = require('./surfaces').weather;
var driver = require('./driver');
var state = require('./state');

var video = document.createElement('video');
video.height = 256;
video.width = 256;
video.src = "../content/icons/drizzle.mp4";
video.autoplay = true;
video.loop = true;
$(video).addClass('weather-video');

var $upperLabel = $('<div class="weather-label upper"></div>');
var $lowerLabel = $('<div class="weather-label lower"></div>');

var basePath = '../content/icons/';
var conditions = {
  calm: {
    icon: 'cloudy.mp4',
    upper: 'Current Conditions',
    lower: 'Mostly Cloudy'
  },
  drizzle: {
    upper: 'Current Conditions',
    icon: 'drizzle.mp4',
    lower: 'Isolated Showers'
  },
  rain: {
    upper: 'Current Conditions',
    icon: 'rain.mp4',
    lower: 'Heavy Rain'
  },
  storm: {
    upper: 'Current Conditions',
    icon: 'storm.mp4',
    lower: 'Scattered T-Storms'
  },
  wind: {
    upper: 'Current Conditions',
    icon: 'hurricane.mp4',
    lower: 'Hurricane'
  },
  starry: {
    upper: 'Current Conditions',
    icon: 'starry.mp4',
    lower: 'Clear'
  }  
};

function change(newCondition) {
  var cond = conditions[newCondition];
  video.src = basePath + cond.icon;
  $lowerLabel.text(cond.lower);
  $upperLabel.text(cond.upper);
}

function init() {
  surface.$el.append(video);
  surface.$el.append($lowerLabel);
  surface.$el.append($upperLabel);
}
init();

var curCondition = '';

driver.on('presetChange', function() {
  change(state.preset);
});

driver.on('frame', function(info) {
  surface.$el.css('opacity', .4 + (1-info.progress)*.5);
});