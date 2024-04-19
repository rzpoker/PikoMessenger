class Room {
  constructor(roomId, roomTitle, namespace, privateRoom = false) {
    this.id = roomId;
    this.title = roomTitle;
    this.namespace = namespace;
    this.privateRoom = privateRoom;
    this.history = [];
  }
  addmessage(msg) {
    this.history.push(msg);
  }
  clearHistory() {
    this.history = [];
  }
}

module.exports = Room;
