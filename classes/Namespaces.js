//create a class for Namespaces
class Namespace {
  constructor(id, nsTitle, img, endpoint) {
    this.id = id;
    this.title = nsTitle;
    this.img = img;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  //function for add rooms to namespaces
  addRoom(roomObj) {
    this.rooms.push(roomObj);
  }
}

//export Namespace module
module.exports = Namespace;
