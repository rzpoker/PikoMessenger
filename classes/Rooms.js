//create a class for Rooms

class Room {
  constructor(roomId, roomTitle, namespace, privateRoom = false) {
    this.id = roomId;
    this.title = roomTitle;
    this.namespace = namespace;
    this.privateRoom = privateRoom;
    this.history = [];
  }
  // function for add every message to room message history
  addmessage(msg) {
    this.history.push(msg);
  }
  //function for clear all messages in room history
  clearHistory() {
    this.history = [];
  }
}

//export Room module
module.exports = Room;
