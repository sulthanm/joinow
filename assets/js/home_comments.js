{

    let createComment = function(){
        
        let newComment = $('#new-comment');
        newComment.submit(function(e){
            
            e.preventDefault();
            let self = this;
            
            $.ajax({
                type : 'POST',
                url : '/users/create-comment',
                data : $(self).serialize(),
                success : function(data){
                    // console.log(data.data.comment);
                    let newcomment1 = newCommentDisplay(data.data.comment);
                    // console.log(newcomment1);
                    $('.post-comments-list>ul').prepend(newcomment1);
                    deleteComment($(' #delete-comment', newcomment1));
                    // console.log($(' #delete-comment', newcomment1));
                    new ToggleLike($(' .toggle-like-button', newComment));
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
        return $(`<li id="comment-${ comment._id }">
                
                <h4 id="user-name">
                    ${ comment.user.name }
                </h4>
                <p>${  comment.content }</p>
                   
                    <a href="/users/delete-comment/${ comment._id }" id="delete-comment">X</a>
                 
                    <div id="comment-likes-container">
                        
                            <a class="toggle-like-button" data-likes="${ comment.likes.length }" href="/users/toggle/?id=${comment._id}&type=Comment">
                                    0 Likes
                            </a>
                      
                    </div>
                </p>    
            </li>`);
    }

    function deleteComment(deleteLink){
        console.log("Deletnf link ", $(deleteLink).prop('href'));
        $(deleteLink).click(function(e){
            // console.log("prevetnggggg delete comment");
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