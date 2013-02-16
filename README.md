QueryStorage
===

まだ未完成っす。

## Description
this library provide management way of form data.
QueryStorage likes FormData (html5)

## Usage
In browser include single JavaScript file:

    <script type="text/javascript" src="queryStorage.js"></script>
    <script type="text/javascript">
        window.onload = function () {
            var form = document.forms.sample
              , storage = QueryStorage.create(form)
              ;
            ...
        }
    </script>

##API

###QueryStorage#create
    var storage = storage.create(form);

###QueryStorage#add
    storage.add({name: "cond[ccc]", value: "123"});

###QueryStorage#addAll
    storage.addAll([{name: "cond[ccc]", value: "123"}, {name: "cond[ccc]", value: "123"}]);

###QueryStorage#delete
    storage.delete('cond[aaa]');

###QueryStorage#deleteAll
    storage.deleteAll('cond[aaa]', cond['bbb']);

###QueryStorage#deleteGroup
    storage.deleteGroup('cond');

###QueryStorage#deleteExcept
    storage.deleteExcept('cond[aaa]');

###QueryStorage#deleteExceptGroup
    storage.deleteExceptGroup('cond')

###QueryStorage#has
    storage.has('cond[ddd]'); //true or false

###QueryStorage#hasGroup
    storage.hasGroup('cond'); //true or false

###QueryStorage#generateUrlParams
    storage.generateUrlParams(); //a=b&c=d

###QueryStorage#generateHashData
    storage.generateHashData(); //[{cond[a]: 123}, {cond[b]: 456}]

###QueryStorage#generateHiddenItems
    storage.genetrateHiddenItems();

##License:
<pre>
(The MIT License)

Copyright (c) 2013 nazomikan
https://github.com/nazomikan/QueryStorage

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</pre>

