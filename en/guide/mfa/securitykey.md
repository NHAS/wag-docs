# Security Key / Pass key / WebAuthn 

Wag supports using a platform passkey, or physically isolated u2f key such as a yubikey. 
To enable this method you must have an issuer specified and TLS must be enabled on the Tunnel listener. 

As you can see here within the web ui it is not possible to enable webauthn without TLS.
<div style="text-align:center">   
<img src="/images/mfa/u2f-tls-warning.png"  class="shadow">
</div>


Tunnel webserver settings
<div style="text-align:center">   
<img src="/images/mfa/tunnel-tls-settings-u2f.png"  class="shadow">
</div>
