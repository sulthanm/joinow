// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            console.log($(self).attr('href'));
            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                let like;
                if (data.data.deleted == true){
                    likesCount -= 1;
                    like=true;
                    
                }else{
                    likesCount += 1;
                    like =false;
                }
                // console.log("message--", data.data.postId);
                console.log(self);
                let div1 = document.getElementById(`${data.data.postId}`);
              
                $(self).attr('data-likes', likesCount);
                // if(like==true){
                //     $(self).html('Like');
                // }else{
                //     $(self).html('Dis-Like');

                // }
                
                
                console.log(self,"///////",div1);

                div1.setAttribute("data-likes", `${likesCount}`);
                div1.innerHTML = `${likesCount}`;
                console.log(div1);
               
                
            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
