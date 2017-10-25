dojo.provide("searchfield.widget.searchfield");
dojo.require("searchfield.widget.FormInput");
mendix.widget.declare("searchfield.widget.searchfield", {
  addons:[dijit._Templated],
  inputargs:{},
  baseClass:"",
  templatePath:dojo.moduleUrl("searchfield.widget","templates/searchfield.html"),
  loginConnects:null,
  searchInput:null,
  searchParam:null,

  postCreate : function() {
    logger.debug(this.id+ ".postCreate");

    this.searchInput=new searchfield.widget.FormInput({node:this.searchFieldInput,text:this.placeholder});
    this.connect(this.searchFieldInput, "onkeyup","onKeyUp");

    mx.addOnLoad(dojo.hitch(this, this.resetExample));

    this.loaded();
  },

  resetExample:function() {
    this.searchInput.setExample(this.placeholder);
  },

  onKeyUp:function(b){
    logger.debug(this.id+".onKeyUp");
    if (b.keyCode==dojo.keys.ENTER)
    this.search(b);
  },

  search:function(b){
    logger.debug(this.id+".search");
    var inputText = this.searchInput.getValue();
    var microflow = this.executemicroflow;
    var progressmessage = this.progressmessage;

    mx.data.create({
      entity : "AdvancedSearch.SearchParams",
      callback : function(obj) {
        obj.set("Text",inputText);
        var guid = obj.getGUID();

        logger.debug(this.id+".search");

        mx.ui.action(microflow, {
          progress		: "modal",
          progressMsg	: progressmessage,
          params : {
            applyto     : "selection",
            guids       : [guid]
          },
          callback : function(obj) {
          },
          error : function(error) {
            alert(error.description);
          }
        }, this);
      },
      error : function(error) {
        alert(error.description);
      }
    });
  },

  update : function(obj, callback){
    console.log("update");
    callback && callback();
  },

  uninitialize : function() {
    logger.debug(this.id+".uninitialize");
  }

});
