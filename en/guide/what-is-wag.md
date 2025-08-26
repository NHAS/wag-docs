# What is Wag? 

Wag enhances WireGuard (tm) with multi-factor authentication (MFA), route restrictions, and device enrollment capabilities. 
It also adds a number of helpful features to enable in-depth automation.

## Key Features

- **Easy device registration** - Simple API for client enrollment
- **Fully Featured Administration Portal** - Manage all aspects of your wireguard peers from a UI
- **Multiple MFA methods** - Security keys, Single Sign On (OIDC), PAM, and TOTP support
- **Route-based MFA** - Define specific routes requiring authentication
- **Webhooks** - Accept webhooks to create or delete resources
- **Route restrictions** - Control access to specific network segments
- **OIDC group awareness** - Centralise the management of your access in your identity provider
- **High availability** - Built-in clustering with etcd
- **Automatic TLS Support** - LetsEncrypt support, with ACME HTTP-01 and DNS-01



## Screenshots


### Administrative UI
<div style="display: grid; gap: 15px;">
  <a href="/images/slideshow/dashboard.png" target="_blank">
    <img src="/images/slideshow/dashboard.png" height="967" width="1419" alt="Dashboard showing panels and log messages" /> 
  </a>
  <a href="/images/slideshow/user_management.png" target="_blank">
    <img src="/images/slideshow/user_management.png" height="967" width="1419" alt="User management table" /> 
  </a>
  <a href="/images/slideshow/registration.png" target="_blank">
    <img src="/images/slideshow/registration.png" height="967" width="1419" alt="Registration token creation" /> 
  </a>
  <a href="/images/slideshow/rules.png" target="_blank">
    <img src="/images/slideshow/rules.png" height="967" width="1419" alt="Defining custom route rules" /> 
  </a>
</div>

### User UI
<div style="display: grid; gap: 15px;">
  <a href="/images/slideshow/totp_mfa.png" target="_blank">
    <img src="/images/slideshow/totp_mfa.png" height="967" width="1419" alt="Code based MFA UI" /> 
  </a>
  <a href="/images/slideshow/user_ui.png" target="_blank">
    <img src="/images/slideshow/user_ui.png" height="967" width="1419" alt="A successful user login" /> 
  </a>
  <a href="/images/slideshow/user_ui_locked.png" target="_blank">
    <img src="/images/slideshow/user_ui_locked.png" height="967" width="1419" alt="A locked user" /> 
  </a>
</div>


