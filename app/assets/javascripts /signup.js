function fader() {
	$('#darth-fader').css("background-color", "green");
}

$(function(){
	// var $signin_button = $('#signin-button');
	// $signin_button.on("click", function(){this.fadeIn(2000)});

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
				$('body').css({'backgroundColor': 'green'});
			}
			else{
				$('body').css({'backgroundColor': 'red'});
			}
		})
		.fail(function(){
			$('body').css({'backgroundColor': 'red'});
		});
		return false;
	});
});