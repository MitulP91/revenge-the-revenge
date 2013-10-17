$(document).ready(function() {
	$comment_text = $('#comment-text');
	$('#add-comment').on('click', function() {
		if($comment_text.val() !== '') {
			$.ajax({
		      url: '/comment/create',
		      type: 'POST',
		      dataType: 'json',
		      data: {comment: {the_comment: $comment_text.val()}}
		    }).done(function(data) {
		    	$comment_text.val('');
				$comment = $('<li><span class="the-comment">' + data['comment'] + '</span> <span class="author">created by ' + data['email'] + '</span></li><hr class="comment-hr"/>'); 	
		    	$('#comments').prepend($comment);
		    });
		}
	});
});