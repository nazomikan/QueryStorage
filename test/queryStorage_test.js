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
//              {name: "keygen-1", value: "高強度の暗号化"}
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
//           "keygen-1": "高強度の暗号化"
          });
    });
  });

  describe('QueryStorage#generateUrlParams', function () {
    it('should return url params', function () {
        var storage = QueryStorage.create(form)
          , queryString = storage.generateUrlParams()
          ;

      expect(queryString).to.equal("select-single-1=item1&amp;select-multi-1%5B%5D=item1&amp;select-multi-1%5B%5D=item2&amp;select-group-1=item1&amp;choices1%5B%5D=item1&amp;choices1%5B%5D=item2&amp;text-1=item1&amp;text-area1=item1");
    });
  });

  describe('QueryStorage#generateHiddenItems', function () {

  });

  describe('QueryStorage#add', function () {

  });

  describe('QueryStorage#addAll', function () {

  });

  describe('QueryStorage#delete', function () {

  });

  describe('QueryStorage#deleteAll', function () {

  });

  describe('QueryStorage#deleteGroup', function () {

  });

  describe('QueryStorage#deleteExcept', function () {

  });

  describe('QueryStorage#has', function () {

  });

  describe('QueryStorage#has', function () {

  });

  describe('QueryStorage#hasGroup', function () {

  });
});
