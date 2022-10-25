
  //get messages from server every 2 seconds
  setInterval(() => {
    refreshMsgs();
  }, 2000);

window.addEventListener("load", () => {
    let chatForm = document.getElementById("chat-form");
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let client = document.getElementById("chat-name").value;
      let message = document.getElementById("chat-msg").value;

      let msgJSON = {
          "name": client,
          "message": message
      }

      let stringJSONmsg = JSON.stringify(msgJSON);


      fetch('/message',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body: stringJSONmsg

      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
      })
    })
  })

  function refreshMsgs() { 
    fetch('/message')
    .then(res => res.json())
    .then(data => {

      document.getElementById("chat-msgs").innerHTML = "";
      let allchats = data.messages;

      console.log(allchats);

      allchats.forEach((chat) => {

        let chatcontainer = document.createElement('div');
        let nameElt = document.createElement('p');
        let msgElt = document.createElement('p');


        nameElt.innerHTML = chat.message.name;
        msgElt.innerHTML = chat.message.message;

        chatcontainer.classList.add("chat__list-item");       // Sets the Class name of the newly created element
        nameElt.classList.add("chat__list-item-name");        // Sets the Class name of the newly created element 
        msgElt.classList.add("chat__list-item-msg");          // Sets the Class name of the newly created element 


        chatcontainer.appendChild(nameElt);
        chatcontainer.appendChild(msgElt);
        document.getElementById("chat-msgs").appendChild(chatcontainer);
      });
        //clear out the HTML div that contains all the messages
        //add all the new messages that we have
    })
  }
  