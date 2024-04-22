function joinRoom(roomName) {
  //show room name and options
  document.querySelector(".top-sign").classList.remove("d-none");
  let roomTitle = document.querySelector(".room-title");
  roomTitle.innerHTML = "";
  roomTitle.innerHTML = roomName;

  //send this room name to server
  nsSocket.emit("joinRoom", roomName, (newNumberOfMembers) => {
    //Nothing
  });

  //load list of messages in history
  nsSocket.on("historyCatchUp", (history) => {
    messages.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = `<li class="${
        nsSocket.io.opts.query.username === msg.username ? "send" : "recieve"
      }-message">
    <p class="reciever-inf">${msg.username} <span>${msg.timeHour} : ${
        msg.timeMinute
      }</span></p>
    <p class="text-message">${msg.text}</p>
    `;
      const currMessages = messages.innerHTML;
      messages.innerHTML = currMessages + newMsg;
    });

    //go to bottom of messages
    messagesBox.scrollTo(0, messagesBox.scrollHeight);
  });

  //send back the number of users joined the room to all users
  nsSocket.on("updateMembers", (number) => {
    document.querySelector(".curr-room-members").innerHTML = `${number}`;
  });

  //search for messages
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("input", (e) => {
    let messages = document.querySelectorAll(".text-message");
    messages.forEach((msg) => {
      if (msg.innerText.indexOf(e.target.value.toLowerCase()) === -1) {
        //message does not exist
        msg.parentElement.classList.add("d-none");
      } else {
        msg.parentElement.classList.remove("d-none");
      }
    });
  });
}
