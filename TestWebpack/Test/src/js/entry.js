// require('./common.css');
// var hello = require('./hello');
// var world = require('./world');
// document.write(hello + ',' + world + '!');

import '../css/common.css';
import hello from './hello';
import world from './world';
document.write(`${hello}, ${world}!`);