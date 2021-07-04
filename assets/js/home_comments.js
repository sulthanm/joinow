{

    let createComment = function(){
        
        let newComment = $('#new-comment');
        newComment.submit(function(e){
            
            e.preventDefault();
            let self = this;
            console.log("hmmmmmm",self);
            $.ajax({
                type : 'POST',
                url : '/users/create-comment',
                data : $(self).serialize(),
                success : function(data){
                    console.log(data.data.comment.post);
                    let newcomment1 = newCommentDisplay(data.data.comment);
                    // console.log(newcomment1);
                    let postId = data.data.comment.post;
                    $(`.post-comments-container-${postId}>ul`).prepend(newcomment1);
                    deleteComment($('#delete-comment', newcomment1));
                    new  ToggleLike($(' .toggle-like-button', newcomment1));
                    
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                     
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newCommentDisplay= function(comment){
        return $(`<li id="comment-${ comment._id }" class="comment-list-item">
                <div id="for-border"></div>
                <h4 id="user-name">
                    ${ comment.user.name }
                </h4>
                
                   
                    <a href="/users/delete-comment/${ comment._id }" id="delete-comment">X</a>
                   
                    <div id="comment-likes-container">
                        
                            <a class="toggle-like-button" data-likes="${ comment.likes.length }" href="/users/toggle/?id=${comment._id}&type=Comment">
                                    0 Likes
                            </a>
                      
                    </div>
                    <p id="comment-content">${  comment.content }</p>
                    <div id="for-border"></div>
                    
            </li>`);
    }

    function deleteComment(deleteLink){
        console.log(deleteLink, "Deletnf link ", $(deleteLink).prop('href'));
        $('#delete-comment').click(function(e){
            console.log("prevetnggggg delete comment");
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log("Daaaaataaaaaaaaaa", data);
                    $(`#comment-${data.data.comment_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    createComment();

}