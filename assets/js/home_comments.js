{

    let createComment = function(){
        
        let newComment = $('#new-comment');
        newComment.submit(function(e){
            e.preventDefault();
            $.ajax({
                type : 'post',
                url : '/users/create-comment',
                data : newComment.serialize(),
                success : function(data){
                    // console.log(data.data.comment);
                    let newcomment1 = newCommentDisplay(data.data.comment);
                    console.log(newcomment1);
                    $('.post-comments-list>ul').prepend(newcomment1);

                    deleteComment($(' #delete-comment', newcomment1)); 
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newCommentDisplay= function(comment){
        return $(`<li>
                <p>
                    ${ comment.content }
                   
                    <a href="/users/delete-comment/${ comment._id }" id="delete-comment">X</a>
                    
                    <br>
                    <small>
                        ${ comment.user.name }
                    </small>
                </p>    
            </li>`);
    }

    let deleteComment = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            console.log("prevetnggggg");
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    $(`#comment-${data.data.comment_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createComment();

}