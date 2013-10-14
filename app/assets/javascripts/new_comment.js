$(document).ready(function() {
	$comment_text = $('#comment-text');
	$('#add-comment').on('click', function() {
		$.ajax({
	      url: '/comment/create',
	      type: 'POST',
	      dataType: 'json',
	      data: {comment: {the_comment: $comment_text.val()}}
	    }).done(function() {
	    	$comment_text.val('');
	    })
	});
});