describe('QueryStorage', function () {
  var form = document.getElementById('test-form');

  describe('QueryStorage#create', function () {
    describe('when given FormObject', function () {
      it('should return instance of QueryStorage', function () {
        var storage = QueryStorage.create(form)
          ;

        expect(storage instanceof QueryStorage).to.be.ok();
      });

      it('should have enabled form item\'s data', function () {
        var storage = QueryStorage.create(form)
          , data = storage.data
          ;

        expect(data).to.eql([
          {name: "select-single-1", value: "item1"},
          {name: "select-multi-1[]", value:"item1"},
          {name: "select-multi-1[]", value:"item2"},
          {name: "select-group-1","value":"item1"},
          {name: "choices1[]", value: "item1"},
          {name: "choices1[]", value: "item2"},
          {name: "text-1", value: "item1"},
          {name: "text-area1", value: "item1"}
          //{name: "keygen-1", value: "高強度の暗号化"}
        ]);
      });
    });
  });

  describe('QueryStorage#generateHashData', function () {
    it('should return hash data', function () {
        var storage = QueryStorage.create(form)
          , hash = storage.generateHashData()
          ;

        expect(hash).to.eql({
          "select-single-1": "item1",
          "select-multi-1[0]": "item1",
          "select-multi-1[1]": "item2",
          "select-group-1": "item1",
          "choices1[0]": "item1",
          "choices1[1]": "item2",
          "text-1": "item1",
          "text-area1": "item1"
          //"keygen-1": "高強度の暗号化"
        });
    });
  });

  describe('QueryStorage#generateUrlParams', function () {
    it('should return url params', function () {
        var storage = QueryStorage.create(form)
          , queryString = storage.generateUrlParams()
          ;

        expect(queryString).to.equal([
          "select-single-1=item1",
          "select-multi-1%5B%5D=item1",
          "select-multi-1%5B%5D=item2",
          "select-group-1=item1",
          "choices1%5B%5D=item1",
          "choices1%5B%5D=item2",
          "text-1=item1",
          "text-area1=item1"
        ].join("&amp;"));
    });
  });

  describe('QueryStorage#add', function () {
    it('should add given data', function () {
      var storage = QueryStorage.create(form)
        ;

      storage.add({name: 'awesomeItem', value: 'awfulValue'});
      expect(storage.data).to.eql([
        {name: "select-single-1", value: "item1"},
        {name: "select-multi-1[]", value:"item1"},
        {name: "select-multi-1[]", value:"item2"},
        {name: "select-group-1","value":"item1"},
        {name: "choices1[]", value: "item1"},
        {name: "choices1[]", value: "item2"},
        {name: "text-1", value: "item1"},
        {name: "text-area1", value: "item1"},
        //{name: "keygen-1", value: "高強度の暗号化"},
        {name: 'awesomeItem', value: 'awfulValue'}
      ]);
    });
  });

  describe('QueryStorage#addAll', function () {
    it('should add given all data', function () {
      var storage = QueryStorage.create(form)
        ;

      storage.addAll([
        {name: 'awesomeItem1', value: 'awfulValue1'},
        {name: 'awesomeItem2', value: 'awfulValue2'}
      ]);

      expect(storage.data).to.eql([
        {name: "select-single-1", value: "item1"},
        {name: "select-multi-1[]", value:"item1"},
        {name: "select-multi-1[]", value:"item2"},
        {name: "select-group-1","value":"item1"},
        {name: "choices1[]", value: "item1"},
        {name: "choices1[]", value: "item2"},
        {name: "text-1", value: "item1"},
        {name: "text-area1", value: "item1"},
        //{name: "keygen-1", value: "高強度の暗号化"},
        {name: 'awesomeItem1', value: 'awfulValue1'},
        {name: 'awesomeItem2', value: 'awfulValue2'}
      ]);
    });
  });

  describe('QueryStorage#delete', function () {
    it('should remove item', function () {
        var storage = QueryStorage.create(form)
          ;

        storage.delete('select-single-1');
        expect(storage.data).to.eql([
          {name: "select-multi-1[]", value:"item1"},
          {name: "select-multi-1[]", value:"item2"},
          {name: "select-group-1","value":"item1"},
          {name: "choices1[]", value: "item1"},
          {name: "choices1[]", value: "item2"},
          {name: "text-1", value: "item1"},
          {name: "text-area1", value: "item1"}
          //{name: "keygen-1", value: "高強度の暗号化"}
        ]);
    });
  });

  describe('QueryStorage#deleteAll', function () {
    it('should remove items', function () {
        var storage = QueryStorage.create(form)
          ;

        storage.deleteAll(['select-single-1', 'text-1']);
        expect(storage.data).to.eql([
          {name: "select-multi-1[]", value:"item1"},
          {name: "select-multi-1[]", value:"item2"},
          {name: "select-group-1","value":"item1"},
          {name: "choices1[]", value: "item1"},
          {name: "choices1[]", value: "item2"},
          {name: "text-area1", value: "item1"}
          //{name: "keygen-1", value: "高強度の暗号化"}
        ]);
    });
  });

  describe('QueryStorage#deleteGroup', function () {
    it('should remove group items', function () {
      var storage = QueryStorage.create(form)
        ;

      storage.deleteGroup('choices1');
      expect(storage.data).to.eql([
        {name: "select-single-1", value: "item1"},
        {name: "select-multi-1[]", value:"item1"},
        {name: "select-multi-1[]", value:"item2"},
        {name: "select-group-1","value":"item1"},
        {name: "text-1", value: "item1"},
        {name: "text-area1", value: "item1"}
        //{name: "keygen-1", value: "高強度の暗号化"}
      ]);
    });
  });

  describe('QueryStorage#deleteExcept', function () {
    it('should remove except designated items', function () {
      var storage = QueryStorage.create(form)
        ;

      storage.deleteExcept('text-1');
      expect(storage.data).to.eql([
        {name: "text-1", value: "item1"}
      ]);
    });
  });

  describe('QueryStorage#deleteExceptGroup', function () {
    it('should remove except designated group items', function () {
      var storage = QueryStorage.create(form)
        ;

      storage.deleteExceptGroup('choices1');
      expect(storage.data).to.eql([
        {name: "choices1[]", value: "item1"},
        {name: "choices1[]", value: "item2"}
      ]);
    });
  });

  describe('QueryStorage#has', function () {
    var storage = QueryStorage.create(form)
      ;

    describe('when QS have the specified name', function () {
      it('should return true', function () {
        expect(storage.has('text-1')).to.be.ok();
      });
    });

    describe('when QS dont have the specified name', function () {
      it('should return false', function () {
        expect(storage.has('text-2')).to.be(false);
      });
    });
  });

  describe('QueryStorage#hasGroup', function () {
    var storage = QueryStorage.create(form)
      ;

    describe('when QS have the specified group', function () {
      it('should return true', function () {
        expect(storage.hasGroup('choices1')).to.be.ok();
      });
    });

    describe('when QS dont have the specified group', function () {
      it('should return false', function () {
        expect(storage.hasGroup('choices2')).to.be(false);
      });
    });
  });

  afterEach(function () {
    form.reset();
  });
});
