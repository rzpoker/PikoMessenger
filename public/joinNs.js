function joinNs(endpoint) {
  const addRoomButton = document.querySelector(".add-room");

  //eventlistener for input box
  form.addEventListener("submit", formsub);
  submit.addEventListener("click", formsub);

  //function for submit messages
  function formsub(e) {
    e.preventDefault();
    const newMessage = input.value;
    input.value = "";

    nsSocket.emit("newMessageToServer", { text: newMessage });
  }

  //function for addRoom to current namespace
  function addRoom() {
    const roomName = prompt("Enter the room name:");
    nsSocket.emit("addRoomToNamespace", { roomName });
  }

  //eventlistener for addRoom to namespace on click
  addRoomButton.addEventListener("click", addRoom);

  //check if there is already a socket
  if (nsSocket) {
    //close current socket so we can create a new socket
    nsSocket.close();

    //remove event listener before it added again
    form.removeEventListener("submit", formsub);
    submit.removeEventListener("click", formsub);
    addRoomButton.removeEventListener("click", addRoom);
  }

  //set default namespace, create a new socket
  nsSocket = io(`http://localhost:3000${endpoint}`, {
    //add username to handshake
    query: {
      username: username,
    },
  });

  //load rooms
  nsSocket.on("nsRoomLoad", (rooms) => {
    document.querySelector(".ns-info").classList.remove("d-none");

    document.querySelector(".namespace-title").innerHTML = `${endpoint.slice(
      1
    )}`;
    document.querySelector(".rooms-number").innerHTML = rooms.length;

    let roomsList = document.querySelector(".rooms-list");
    roomsList.innerHTML = "";
    rooms.forEach((room) => {
      roomsList.innerHTML += `<li class = "eachRoom"><i class="bi bi-${
        room.privateRoom ? `shield-lock-fill` : `hash `
      }"></i>  ${room.title}</li>`;
    });

    //add click listener to each room
    let roomNodes = document.querySelectorAll(".eachRoom");
    roomNodes.forEach((elem) => {
      elem.addEventListener("click", function (e) {
        joinRoom(e.target.innerText);
      });
    });

    //add room automatically
    const topRoom = document.querySelector(".eachRoom");
    const topRoomName = topRoom.innerText;
    joinRoom(topRoomName);
  });

  //send new message to all clients
  nsSocket.on("messageToClients", (msg) => {
    messages.innerHTML += `<li class="${
      nsSocket.io.opts.query.username === msg.username ? "send" : "recieve"
    }-message">
  <p class="reciever-inf">${msg.username} <span>${msg.timeHour} : ${
      msg.timeMinute
    }</span></p>
  <p class="text-message">${msg.text}</p>
  `;
    messagesBox.scrollTo(0, messagesBox.scrollHeight);
  });
}
