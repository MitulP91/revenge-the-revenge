class SessionsController < Devise::SessionsController
  
  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => :failure)
    return sign_in_and_redirect(resource_name, resource)
  end
  
  def sign_in_and_redirect(resource_or_scope, resource=nil)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    resource ||= resource_or_scope
    sign_in(scope, resource) unless warden.user(scope) == resource
    default_url = "identicon"
    gravatar_id = Digest::MD5.hexdigest(current_user.email.downcase)
    avatar_url = "http://gravatar.com/avatar/#{gravatar_id}.png?s=48&d=#{CGI.escape(default_url)}"

    return render :json => {:success => true, :redirect => stored_location_for(scope) || after_sign_in_path_for(resource), email: current_user.email, gravatar: avatar_url}
    # return render :json => {:success => true}
  end
 
  def failure
    return render:json => {:success => false, :errors => ["Login failed."]}
  end
  
end