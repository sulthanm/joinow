class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://joinow.herokuapp.com:8621');
        console.log("hapy",this.userEmail);
        if (this.userEmail){
            this.connectionHandler();
        }

    }


    connectionHandler(){
        let self = this;
        console.log("thisss",self);
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
        });
        this.socket.emit('join_room', {
            user_email : self.userEmail,
            chatroom: 'joinow'
        });

        self.socket.on('user_joined',function(data){
        
            console.log('a user joined', data);
        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            // console.log(msg);
            if(msg != ''){
                // console.log("here------",msg)
                self.socket.emit('send_message',{
                    message : msg,
                    user_email : self.userEmail,
                    chatroom : 'joinow'
                })
            }

        });

        self.socket.on('receive_mesaage', function(data){
            console.log(data.message);
            let newMesg = $('<li>');
            newMesg.append($('<span>',{
                html : data.message
            }));
            let mesgTyp = "other-message";
            if(data.user_email == self.userEmail){
                mesgTyp = "self-message";
                
            }
            newMesg.addClass(mesgTyp);
            $('#chat-messages-list').append(newMesg);
           
        });
    }
}