{
    
    let createPost = function(){
        
        let newPost = $('#new-post');
        newPost.submit(function(e){
            e.preventDefault();
            $.ajax({
                type : 'post',
                url : '/users/create-posts',
                data : newPost.serialize(),
                success : function(data){
                    let newpost1 = newPostDisplay(data.data.post);
                    
                    $('#post-list-container>ul').prepend(newpost1);
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newPostDisplay = function(post){
        console.log(post.userss);
        return $(` <li id="post-${post._id}">
                    <p>
                            ${post.post_content}
                            
                            <a href="/users/delete-post/${ post._id }">X</a>
                          
                            <br>
                            <small>${post.userss.name}</small>
                    </p>
                    <div id="post-form">
                            
                                    <form action="/users/create-comment" method="POST">
                                            <input type="text" name="comment" placeholder="Comment">
                                            <input type="hidden" name="post" value="${post._id }">
                                            <input type="submit" value="Add Comment" id="button">
                                    </form>
                         
                    </div>
                    <div class="post-comments-list">
                        <ul id="post-comments-${ post._id }">
                               
                        </ul>
                    </div>
            </li>`);
    }
    createPost();
}
