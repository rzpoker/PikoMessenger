const username = prompt("what is your username?");

const socket = io("http://localhost:3000", {
  query: {
    username: username,
  },
});
let nsSocket = "";
const namespacesDom = document.querySelector(".namespaces");
const form = document.querySelector("#form");
const messages = document.querySelector("#messages");
const input = document.querySelector("#input");
const signUpBtn = document.querySelector(".sign-up-btn");
const messageContainer = document.querySelector(".message-container");
const msgTop = document.querySelector(".top-sign");

//listen for nslist which is list of all namespaces
socket.on("nslist", (nsData) => {
  namespacesDom.innerHTML = "";
  nsData.forEach((ns) => {
    namespacesDom.innerHTML += `<div class="namespace" ns= ${
      ns.endpoint
    }><img style=" width:48px;" src=${ns.img.slice(0, -1)}g alt="">
    </div>`;
  });
  //add a clicklistener for each namespace
  document.querySelectorAll(".namespace").forEach((ns) =>
    ns.addEventListener("click", (e) => {
      const nsEndpoint = ns.getAttribute("ns");
      joinNs(nsEndpoint);
    })
  );
});
