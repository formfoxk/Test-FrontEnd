// require('./common.css');
// var hello = require('./hello');
// var world = require('./world');
// document.write(hello + ',' + world + '!');

require('../scss/common.scss')

import Utils from './Utils'
import hello from './hello'
import world from './world'

// document.write(`${hello}, ${world}!`)
Utils.log(`${hello}, ${world}!`)
