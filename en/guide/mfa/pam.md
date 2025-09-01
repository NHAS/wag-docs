# Linux Pluggable Authentication Modules

You can configure Wag to authenticate with linux user credentials. Currently Wag only supports username and password using this method. 

If you need to have a custom Wag PAM service you can specify it within the settings:


<div style="text-align:center">   
<img src="/images/mfa/pam-settings.png"  class="shadow">
</div>

Otherwise Wag will default to using `/etc/pam.d/login`