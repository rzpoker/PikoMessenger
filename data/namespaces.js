const Namespace = require("../classes/Namespaces");
const Room = require("../classes/Rooms");

const wikiNs = new Namespace(
  0,
  "Wikipedia",
  `https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Wikipedia-logo-blank.svg/103px-Wikipedia-logo-blank.svg.png`,
  "/wiki"
);
const mozNs = new Namespace(
  1,
  "Mozilla",
  "https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png",
  "/mozilla"
);
const linuxNs = new Namespace(
  2,
  "Linux",
  "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  "/linux"
);
const GenId = () => {
  return +`${Math.random()}`.slice(4);
};
wikiNs.addRoom(new Room(GenId(), "New Articles", 0, true));
wikiNs.addRoom(new Room(GenId(), "Editors", 0));
wikiNs.addRoom(new Room(GenId(), "Other", 0));

mozNs.addRoom(new Room(GenId(), "Firefox", 1));
mozNs.addRoom(new Room(GenId(), "SeaMonkey", 1));
mozNs.addRoom(new Room(GenId(), "SpiderMonkey", 1));
mozNs.addRoom(new Room(GenId(), "Rust", 1));

linuxNs.addRoom(new Room(GenId(), "Debian", 2));
linuxNs.addRoom(new Room(GenId(), "Red Hat", 2));
linuxNs.addRoom(new Room(GenId(), "Ubuntu", 2));
linuxNs.addRoom(new Room(GenId(), "Mac OS", 2));

const namespaces = [wikiNs, mozNs, linuxNs];

module.exports = namespaces;
