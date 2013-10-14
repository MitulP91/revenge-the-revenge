module ApplicationHelper
	def avatar_url(user)
	  if user.avatar_url.present?
	    user.avatar_url
	  else
	    default_url = "identicon"
	    gravatar_id = Digest::MD5.hexdigest(user.email.downcase)
	    "http://gravatar.com/avatar/#{gravatar_id}.png?s=48&d=#{CGI.escape(default_url)}"
	 	# "http://gravatar.com/avatar/#{gravatar_id}.png"
	 end
end
end
