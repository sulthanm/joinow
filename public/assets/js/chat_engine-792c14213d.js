class ChatEngine{constructor(e,s){this.chatBox=$("#"+e),this.userEmail=s,this.socket=io.connect("https://joinow.herokuapp.com:8621"),console.log("hapy",this.userEmail),this.userEmail&&this.connectionHandler()}connectionHandler(){let e=this;console.log("thisss",e),this.socket.on("connect",(function(){console.log("connection established using sockets...!")})),this.socket.emit("join_room",{user_email:e.userEmail,chatroom:"joinow"}),e.socket.on("user_joined",(function(e){console.log("a user joined",e)})),$("#send-message").click((function(){let s=$("#chat-message-input").val();""!=s&&e.socket.emit("send_message",{message:s,user_email:e.userEmail,chatroom:"joinow"})})),e.socket.on("receive_mesaage",(function(s){console.log(s.message);let o=$("<li>");o.append($("<span>",{html:s.message}));let n="other-message";s.user_email==e.userEmail&&(n="self-message"),o.addClass(n),$("#chat-messages-list").append(o)}))}}