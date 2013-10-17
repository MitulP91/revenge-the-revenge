$(document).ready(function() {
	$comment_table = $('#comment-table');
	$score_table = $('#score-table');

	$('#view-scores').on('click', function() {
		$comment_table.fadeOut(700);
		setTimeout(function() {
			$score_table.fadeIn(700);
		}, 700);
	});

	$('#view-comments').on('click', function() {
		$score_table.fadeOut(700);
		setTimeout(function() {
			$comment_table.fadeIn(700);
		}, 700);
	});
});