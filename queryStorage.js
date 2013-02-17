(function (name, global, definition) {
  if (typeof require !== 'undefined' && typeof require.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('QueryStorage', this, function () {
  // I referenced the a lot of code from jQuery. ex($.valHooks, $.serializeArray)
  // return thanks to jQuery.
  var arrayProto = Array.prototype
    , slice = arrayProto.slice
    , toString = Object.prototype.toString
    , nativeIndexOf = arrayProto.indexOf
    , local = {}
    ;

  function QueryStorage(form) {
    this.data = local.distillFormValues(form);
  }

  QueryStorage.create = function (form) {
    var queryStorage = createObject(QueryStorage.prototype)
      , args = slice.call(arguments)
      ;

    QueryStorage.apply(queryStorage, args);

    return queryStorage;
  };

  QueryStorage.prototype.add = function (data) {
    this.data.push(data);

    return this;
  };

  QueryStorage.prototype.addAll = function (dataList) {
    var i
      , iz
      ;

    for (i = 0, iz = dataList.length; i < iz; i++) {
      this.data.push(dataList[i]);
    }

    return this;
  };

  QueryStorage.prototype.delete = function (name) {
    var data = this.data
      , idx = local.getIndex(data, name)
      ;

    if (idx !== -1) {
      data.splice(idx, 1);
    }

    return this;
  };

  QueryStorage.prototype.deleteAll = function (nameList) {
    var data = this.data
      , idxList = local.getAllIndex(data, nameList)
      , i
      , iz
      ;

    for (i = idxList.length - 1, iz = 0; i >= iz; i--) {
      data.splice(idxList[i], 1);
    }

    return this;
  };

  QueryStorage.prototype.deleteGroup = function (groupName) {
    var data = this.data
      , idxList = local.getAllIndexOfGroup(data, groupName)
      , i
      , iz
      ;

    for (i = idxList.length - 1, iz = 0; i >= iz; i--) {
      data.splice(idxList[i], 1);
    }

    return this;
  };

  QueryStorage.prototype.deleteExcept = function (name) {
    var data = this.data
      , idx = local.getIndex(data, name)
      , i
      , iz
      ;

    for (i = data.length - 1, iz = 0; i >= iz; i--) {
      if (idx !== i) {
        data.splice(i, 1);
      }
    }

    return this;
  };

  QueryStorage.prototype.deleteExceptGroup = function (groupName) {
    var data = this.data
      , idxList = local.getAllIndexOfGroup(data, groupName)
      , i
      , iz
      ;

    for (i = data.length - 1, iz = 0; i >= iz; i--) {
      if (_indexOf(idxList, i) === -1) {
        data.splice(i, 1);
      }
    }

    return this;
  };

  QueryStorage.prototype.has = function (name) {
    var data = this.data
      , idx = local.getIndex(data, name)
      ;

    return (idx !== -1) ? true : false;
  };

  QueryStorage.prototype.hasGroup = function (groupName) {
    var data = this.data
      , idxList = local.getAllIndexOfGroup(data, groupName)
      ;

    return (idxList.length > 0) ? true : false;
  };

  QueryStorage.prototype.generateUrlParams = function () {
    var formData = this.data
      , queryString
      , queryList = []
      , keyValStr
      , data
      , i
      , iz
      ;

    for (i = 0, iz = formData.length; i < iz; i++) {
      data = formData[i];
      keyValStr = encodeURIComponent(data.name) + "=" + encodeURIComponent(data.value);
      queryList.push(keyValStr);
    }
    queryString = queryList.join('&amp;');

    return queryString;
  };

  QueryStorage.prototype.generateHashData = function () {
    var formData = this.data
      , hashData = {}
      , bracketDataList = {}
      , bracketData
      , bracketName
      , data
      , name
      , val
      , bracketPattern = /\[\]$/
      , i
      , iz
      ;

    for (i = 0, iz = formData.length; i < iz; i++) {
      data = formData[i];
      name = data.name;
      val = data.value;

      if (bracketPattern.test(name)) {
        bracketDataList[name] = bracketDataList[name] || [];
        bracketDataList[name].push(val);
        continue;
      }
      hashData[name] = val;
    }

    for (bracketName in bracketDataList) if (bracketDataList.hasOwnProperty(bracketName)) {
      bracketData = bracketDataList[bracketName];
      for (i = 0, iz = bracketData.length; i < iz; i++) {
        name = bracketName.replace(bracketPattern, '[' + i + ']');
        val = bracketData[i];
        hashData[name] = val;
      }
    }

    return hashData;
  };

  local.distillFormValues = function (form) {
    var elementsList = form.elements
      , sendableTagPattern = /^(?:input|select|textarea|keygen)/i
      , notSendableTypePattern = /^(?:submit|button|image|reset|file)$/i
      , checkableTypePattern = /^(?:checkbox|radio)$/i
      , crlfPattern = /\r?\n/g
      , rPattern = /\r/g
      , dataset = []
      , elements
      , element
      , type
      , name
      , val
      , i
      , iz
      , j
      , jz
      ;

    function trimCRLF(val) {
      return val = (typeof val === "string") ?
        val.replace(rPattern, "").replace(crlfPattern, "\r\n") :
        (val == null) ? "" : val;
    }

    elements = (elementsList) ? nodeListToArray(elementsList) : form;
    for (i = 0, iz = elements.length; i < iz; i++) {
      element = elements[i];
      type = element.type;
      name = element.name;
      if (!(name &&
            !isDisabled(element) &&
            sendableTagPattern.test(element.nodeName) &&
            !notSendableTypePattern.test(type) &&
            (element.checked || !checkableTypePattern.test(type)))) {
        continue;
      }

      val = getItemValue(element);
      if (_isArray(val)) {
        for (j = 0, jz = val.length; j < jz; j++) {
          dataset.push({name: name, value: trimCRLF(val[j])});
        }
        continue;
      }
      dataset.push({name: name, value: trimCRLF(val)});
    }

    return dataset;
  };

  local.valHooks = {
    option: function (optionItem) {
      var val = optionItem.attributes.value;

      return !val || val.specified ? optionItem.value : optionItem.text;
    },
    select: function (selectItem) {
      var type = selectItem.type
        , options = selectItem.options
        , index = selectItem.selectedIndex
        , one = type === "select-one" || index < 0
        , values = one ? null : []
        , max = one ? index + 1 : options.length
        , i = index < 0 ? max : (one ? index : 0)
        , option
        , value
        ;

      for (; i < max; i++) {
        option = options[i];
        if (!option.selected && i !== index ) {
          continue;
        }

        value = getItemValue(option);
        if (one) {
          return value;
        }

        values.push(value);
      }

      return values;
    }
  };

  local.getIndex = function (dataList, name) {
    var i
      , iz
      , idx = -1
      ;

    for (i = 0, iz = dataList.length; i < iz; i++) {
      if (dataList[i].name === name) {
        idx = i;
        return idx;
      }
    }

    return idx;
  };

   local.getAllIndex = function (dataList, nameList) {
    var idxList = []
      , i
      , iz
      ;

    for (i = 0, iz = dataList.length; i < iz; i++) {
      if (_indexOf(nameList, dataList[i].name) !== -1) {
        idxList.push(i);
      }
    }

    return idxList.sort();
  }

  local.getAllIndexOfGroup = function (dataList, groupName) {
    var idxList = []
      , namePrefix = groupName + '['
      , i
      , iz
      ;

    namePrefix = ' ' + namePrefix;
    for (i = 0, iz = dataList.length; i < iz; i++) {
        if ((' ' + dataList[i].name).indexOf(namePrefix) !== -1) {
            idxList.push(i);
        }
    }

    return idxList.sort();
  };

  function getItemValue(formItem) {
    var nodeName = formItem.nodeName.toLowerCase()
      , type = formItem.type
      , hooks = local.valHooks[type] || local.valHooks[nodeName]
      ;

    if (hooks) {
      return hooks(formItem);
    }

    return formItem.value;
  }

  function isDisabled(element) {
    var matches = element.matchesSelector ||
      element.mozMatchesSelector ||
      element.webkitMatchesSelector ||
      element.oMatchesSelector ||
      element.msMatchesSelector
      ;

    if (matches) {
      return matches.call(element, ':disabled');
    }

    return (element.disabled === true || function (parent) {
      while (parent) {
        try {
          if (parent.nodeName.toLowerCase() === 'fieldset') {
            return parent.disabled === true;
          }
          parent = parent.parentNode;
        } catch (err) {
          return false;
        }
      }

      return false;
    }(element.parentNode));
  }

  function _isArray(ary) {
    return "[object Array]" === toString.call(ary);
  }

  function _indexOf(ary, needle) {
    var i
      , iz
      ;

    if (nativeIndexOf && ary.indexOf === nativeIndexOf) {
      return ary.indexOf(needle);
    }

    for (i = 0, iz = ary.length; i < iz; i++) {
      if (ary[i] === needle) {
        return i;
      }
    }

    return -1;
  }

  function nodeListToArray(nodeList) {
    var len
      , res
      ;

    try {
      res = slide.call(nodeList);
    } catch (e) {
      res = [];
      len = nodeList.length || 0;
      while(len--) {
        res[len] = nodeList[len];
      }
    }

    return res;
  }

  function createObject(obj) {
    if (Object.create) {
      return Object.create(obj);
    }

    if (arguments.length > 1) {
      throw new Error('Object.create implementation only accepts the first parameter.');
    }
    function F() {}
    F.prototype = obj;

    return new F();
  }

  return QueryStorage;
});

