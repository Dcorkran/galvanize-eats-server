module.exports = {
  cleanAuthorName:function(name){
    let authors = {};
    authors.firstName = [];
    authors.lastName = [];
    if (typeof name === 'object') {
      for (var i = 0; i < name.length; i++) {
        authors.firstName[i] = name[i].substring(0,name[i].indexOf(' '));
        authors.lastName[i] = name[i].substring(name[i].indexOf(' ') + 1,name[i].length);
      }
      return authors;
    } else {
      authors.firstName[0] = name.substring(0,name.indexOf(' '));
      authors.lastName[0] = name.substring(name.indexOf(' ') + 1,name.length);
      return authors;
    }
  }
}
