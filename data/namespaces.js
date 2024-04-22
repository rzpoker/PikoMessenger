//import Modules
const Namespace = require("../classes/Namespaces");
const Room = require("../classes/Rooms");

//generate random Id for rooms
const GenId = () => {
  return +`${Math.random()}`.slice(4);
};

//create Namespaces
const gameNs = new Namespace(0, "game", `./img/game-card.png`, "/game");
const chatNs = new Namespace(1, "chat", `./img/chat.png`, "/chat");
const newsNs = new Namespace(2, "news", `./img/globe.png`, "/news");

//create default rooms and adding to Namespaces
gameNs.addRoom(new Room(GenId(), "New games", 0, true));
gameNs.addRoom(new Room(GenId(), "Editors", 0));
gameNs.addRoom(new Room(GenId(), "Dota 2", 0));

chatNs.addRoom(new Room(GenId(), "Friends", 1));
chatNs.addRoom(new Room(GenId(), "Family", 1));
chatNs.addRoom(new Room(GenId(), "Work", 1));
chatNs.addRoom(new Room(GenId(), "Class", 1));

newsNs.addRoom(new Room(GenId(), "War", 2));
newsNs.addRoom(new Room(GenId(), "Crypto", 2));
newsNs.addRoom(new Room(GenId(), "Sports", 2));
newsNs.addRoom(new Room(GenId(), "Tech", 2));

//create a list of namespaces
const namespaces = [gameNs, chatNs, newsNs];

//export namespaces module
module.exports = namespaces;
