// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

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

