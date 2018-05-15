require('../scss/style.scss');

var $ = require('jquery');

// for debug
window.$ = $;

var controlbar = require('./controlbar.js');

var pageLoad = function() {
	controlbar.controlbarLoad('xls');
}

$(document).ready(function (){
	pageLoad();
});