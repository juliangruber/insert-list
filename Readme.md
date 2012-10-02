
# insert-list

Minimal list UI that is a writable Stream and supports sorting by predefined keys.

## Usage

```javascript
var List = require('insert-list');

var list = List({ el: '#node', sortBy: 'position' });

src1.pipe(list);
src2.pipe(list);

list.emit('data', { data: 'historical 1', position: 1 });
list.emit('data', { data: 'historical 2', position: 2 });
list.emit('data', { data: 'historical 3', position: 3 });
```

The stream can be used before the dom is ready and will automatically insert its UI when it is.

## Installation

```bash
$ component install juliangruber/insert-list
# or
$ npm install insert-list
```

## Api

### List(options)

Creates a new __insert-list__, `instanceof Stream`.

If `options` is an object, valid `options` are:

* `el`: Dom-Element to render __insert-list__ into. Can be a _string_/css-selector, _dom_ node or _jQuery_ object
* `sortBy`: If the key you sort by is at object.foo.bar, pass `foo.bar`
* `asc`/`inv`: Inverse the sort order
* `frame`: Dom to put around the list. The default is `<ul class="insert-list"></ul>`

If `opt` is a string, domnode or jQuery-object, it is interpreted as the `el` option.

### List#render(data)

Overwrite this function to put your custom rendering logic in place, e.g. use another template and add event listeners.

The default is

```javascript
function(data) {
  return tpl(data);
}
```

where `tpl` is a compiled template function.

## License

(MIT)

Copyright (c) 2012 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
