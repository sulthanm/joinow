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
                    
                    $('.post-comments-list>ul').prepend(newcomment1);

                    // deletePost($(' .delete-post', newcomment1));
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    function newCommentDisplay(comment){
        return $(`<li>
                <p>
                    ${ comment.content }
                   
                    <a href="/users/delete-comment/${ comment._id }">X</a>
                    
                    <br>
                    <small>
                        ${ comment.user.name }
                    </small>
                </p>    
            </li>`);
    }

    createComment();

}