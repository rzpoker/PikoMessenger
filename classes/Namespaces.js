class Namespace {
  constructor(id, nsTitle, img, endpoint) {
    this.id = id;
    this.title = nsTitle;
    this.img = img;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  addRoom(roomObj) {
    this.rooms.push(roomObj);
  }
}

module.exports = Namespace;
