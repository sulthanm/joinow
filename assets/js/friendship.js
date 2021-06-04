$('#add-friend').click(function(e){
           
    e.preventDefault();
    let self = this ;
    $.ajax({
    type: 'GET',
    url: $(self).attr('href'),
    })
    .done(function(data) {
            console.log(data.data.presence);
     
            if(data.data.presence == true){
              $('#add-friend').html('Add Friend');
            }else{
              $('#add-friend').html('Un-Friend');
            }

    })
    .fail(function(errData) {
            console.log('error in completing the request');
    });
})