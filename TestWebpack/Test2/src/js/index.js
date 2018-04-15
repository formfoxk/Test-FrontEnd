// require('./common.css');
// var hello = require('./hello');
// var world = require('./world');
// document.write(hello + ',' + world + '!');

import Utils from './Utils'
import hello from './hello'
import world from './world'
import '../scss/common.scss';
// import '../css/style.css';

function component() {
	var element = document.createElement('div');
	element.innerHTML = 'Hello Webpack!!';
    element.classList.add('hello');
    
    return element;
}
document.body.appendChild(component());

// document.write(`${hello}, ${world}!`)
Utils.log(`${hello}, ${world}!`)

