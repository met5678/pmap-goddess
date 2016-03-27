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
    lower: 'Isolated Showers',
    pulse: true
  },
  rain: {
    upper: 'Current Conditions',
    icon: 'rain.mp4',
    lower: 'Heavy Rain',
    pulse: true
  },
  storm: {
    upper: 'Current Conditions',
    icon: 'storm.mp4',
    lower: 'Scattered T-Storms',
    pulse: true
  },
  wind: {
    upper: 'Current Conditions',
    icon: 'hurricane.mp4',
    lower: 'Hurricane',
    pulse: true
  },
  starry: {
    upper: 'Current Conditions',
    icon: 'starry.mp4',
    lower: 'Clear'
  },
  'alert-storm': {
    icon: 'alert.mp4',
    upper: '',
    lower: ''
  }
};

var curCond = conditions.calm;
function change(newCondition) {
  cond = conditions[newCondition];
  video.src = basePath + cond.icon;
  $lowerLabel.text(cond.lower);
  $upperLabel.text(cond.upper);
  surface.$el.css('opacity',0.7);
}

function init() {
  surface.$el.append(video);
  surface.$el.append($lowerLabel);
  surface.$el.append($upperLabel);
  surface.$el.css('opacity',0.7);
}
init();

var curCondition = '';

driver.on('presetChange', function() {
  change(state.preset);
});

driver.on('frame', function(info) {
  if(cond.pulse) {
    surface.$el.css('opacity', .4 + (1-info.progress)*.5);
  }
});