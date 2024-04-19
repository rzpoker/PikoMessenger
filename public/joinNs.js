function joinNs(endpoint) {
  form.addEventListener("submit", formsub);
  function formsub(e) {
    e.preventDefault();
    const newMessage = input.value;
    input.value = "";

    nsSocket.emit("newMessageToServer", { text: newMessage });
  }
  let query = "";
  if (nsSocket) {
    query = nsSocket.io.opts.query;

    //check if nsSocket is actually a socket
    nsSocket.close();

    //remove event listener before it added again
    form.removeEventListener("submit", formsub);
  }

  //set default namespace
  nsSocket = io(`http://localhost:3000${endpoint}`, {
    query: {
      username: query === "" ? username : query.username,
    },
  });
  if (query != "") {
    nsSocket.io.opts.query = query;
  }
  nsSocket.on("nsRoomLoad", (rooms) => {
    document.querySelector(".ns-info").classList.remove("d-none");

    document.querySelector(".namespace-title").innerHTML = `${endpoint.slice(
      1
    )}`;
    document.querySelector(".rooms-number").innerHTML = rooms.length;

    let roomsList = document.querySelector(".rooms-list");
    roomsList.innerHTML = "";
    rooms.forEach((room) => {
      let icon;
      if (room.privateRoom) {
        icon = `shield-lock-fill `;
      } else {
        icon = `hash `;
      }
      roomsList.innerHTML += `<li class = "eachRoom"><i class="bi bi-${icon}"></i>  ${room.title}</li>`;
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
  nsSocket.on("messageToClients", (msg) => {
    messages.innerHTML += `<li class="${
      nsSocket.io.opts.query.username === msg.username ? "send" : "recieve"
    }-message">
  <p class="reciever-inf">${msg.username} <span>${msg.timeHour} : ${
      msg.timeMinute
    }</span></p>
  <p class="text-message">${msg.text}</p>
  `;
  });
}
