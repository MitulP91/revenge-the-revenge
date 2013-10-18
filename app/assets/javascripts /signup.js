function fader() {
	$('#darth-fader').css("background-color", "green");
}

$(function(){
	// var $signin_button = $('#signin-button');
	// $signin_button.on("click", function(){this.fadeIn(2000)});
	$('#login').on('click', function(e) {
		e.preventDefault();
		$('#darth-fader').fadeIn(2000);
	});

	$('#sign-in-form').on('submit', function(){
		
		var email = $('#user_email').val();
		var password = $('#user_password').val();
		
		var data = {remote: true, commit: "Sign in", utf8: "✓", user: {remember_me: 1, password: password, email: email}};
		$.ajax({
			url: '/users/sign_in',
			data: data,
			method:'POST',
			dataType:'json'
		})
		.done(function(data){
			if (data['success']){
				$('#darth-fader').fadeOut(2000);
				$div = $('<div>');
				$img = $('<img src=' + data['gravatar'] + '/>');
				$div.append($img);
				$div.append('Logged in as <strong>' + data['email'] + '</strong>.')
				$('#user_nav').prepend($div);
				$('#login').remove();
				$('#signup').remove();
				$('#logout').fadeIn(2000);
				$('#edit-profile').fadeIn(2000);
				$('#hidden-add-comment').fadeIn(2000);
			}
			else{
				$fail = $('<p>This account does not exist!</p>')
				$('body').append($fail);
			}
		})
		.fail(function(){
			$fail = $('<p>This account does not exist!</p>')
			$('body').append($fail);
		});
		return false;
	});
});