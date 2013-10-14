$(document).ready(function() {
	$comment_text = $('#comment-text');
	$('#add-comment').on('click', function() {
		$.ajax({
	      url: '/comment/create',
	      type: 'POST',
	      dataType: 'json',
	      data: {comment: {the_comment: $comment_text.val()}}
	    }).done(function(data) {
	    	$comment_text.val('');
			$comment = $('<li>' + data['comment'] + ' created by ' + data['email'] + '</li>')	    	
	    	$('#comments').prepend($comment);
	    })
	});
});