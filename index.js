var Stream = require('stream');
var $ = require('jquery');

var tpl = require('./template');

/**
 * Creates a new insert-list
 *
 * @param {object|string} opt
 * @returns Stream
 */
var List = function(opt) {
  opt = opt || {}; 
  var asc = opt.asc || opt.inv;
  var positions = [];

  // TODO: Use domify & dpmready
  var frame = opt.frame? $(opt.frame) : $('<ul class="insert-list"></ul>');
  $(function() {
    $(opt.el || opt).append(frame);
  });

  var s = createStream();

  s.write = function(data) {
    s.emit('change');
    var rendered = s.render(data);
    var dom = $(rendered);

    if (!opt.sortBy) return frame[opt.inv? 'prepend': 'append'](dom);

    var index = getDeep(data, opt.sortBy);
    var position = findPosition(positions, index, asc);
    positions.splice(position, 0, index);

    if (!position) return frame.prepend(dom);
    frame.children().eq(position-1).after(dom);
  };
  
  // Overwrite this
  s.render = function(data) {
    return tpl(data);
  }

  return s;
};

/**
 * Finds the position at which `index` should be inserted into `positions`
 *
 * TODO: binary search
 * TODO: inverse positions when asc is true or sth
 *
 * @param {array}           positions Existing elements
 * @param {string|integer}  index     Sort value of the element in question
 * @param {boolean}         asc       Inverse sorting
 * @returns {integer}                 New Position
 */
function findPosition(positions, index, asc) {
  if (!positions.length) return 0;

  if ( asc && positions[0] > index) return 0;
  if (!asc && positions[0] < index) return 0;

  var last = positions.length - 1;
  if ( asc && positions[last] < index) return last+1;
  if (!asc && positions[last] > index) return last+1;

  var position = 0;
  while (position < positions.length) {
    if ( asc && positions[position] > index) break;
    if (!asc && positions[position] < index) break;
    position++;
  }
  return position;
}

/**
 * Deep dynamic object access.
 * 
 * Makes obj['foo.bar'] work: getDeep(obj, 'foo.bar')
 *
 * @param {object} obj
 * @param {string} key
 * @returns             Match
 */
function getDeep(obj, key) {
  var segs = key.split('.');
  for (var i = 0; i < segs.length; i++) {
    obj = obj[segs[i]];
  };
  return obj;
}

/**
 * Creates a new writable Stream
 *
 * @returns Stream
 */
function createStream() {
  var s = new Stream;
  s.writable = true;
  s.end = function(data) {
    if (arguments.length) s.write(data);
    s.writable = false;
  }
  s.destroy = function() {
    s.writable = false;
  }
  return s;
}

module.exports = List;
