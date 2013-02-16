describe('QueryStorage', function () {
  var form = document.getElementById('test-form');

  describe('QueryStorage#create', function () {
    describe('when given FormObject', function () {
      it('should return instance of QueryStorage', function () {
        var storage = QueryStorage.create(form)
          ;

        expect(storage instanceof QueryStorage).to.be.ok();
      });

      it('should have form item\'s data', function () {
        var storage = QueryStorage.create(form)
          , data = storage.data
          ;

         expect(data).to.eql([
              {name: "select-single-1", value: "item1"},
              {name: "select-multi-1", value:"item1"},
              {name: "select-group-1","value":"item1"},
              {name: "choices1[]", value: "on"},
              {name: "choices1[]", value: "on"},
              {name: "text-1", value: "item1"},
              {name: "text-area1", value: "item1"},
              {name: "keygen-1", value: "高強度の暗号化"}
          ]);
      });
    });
  });

  describe('QueryStorage#generateHashData', function () {

  });

  describe('QueryStorage#generateUrlParams', function () {

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
