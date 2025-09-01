# Single Sign On

This guide will enable you to setup Wag with **Keycloak** as an identity provider (`IdP`). Wag uses `OIDC` so any identity provider (`IdP`) that supports setting group names in the `OIDC` claim will work.   
However in this case **KeyCloak** is a good and easy way to start.   
    
    
This guide expects that you already have a keycloak realm configured and to be running the latest version of `Wag`.

If you want to test this in a development enviroment I suggest using the docker container of keycloak.

```sh
sudo docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:20.0.2 start-dev
```

## Why?

Setting up an OIDC provider allows you to centrally manage what groups your Wag users are part of, it also allows you to define your own authentication requirements such as account password which Wag does not have. 

## Configuring KeyCloak


First we must create an OIDC client (in this guide I just used the default `account` client, but you should have a specific `Wag` client):


<div style="text-align:center">   
<img src="/images/sso/create_client.png" alt="Create client page" class="shadow">
</div>

Then click on your created client (in this case `account`) and go to settings:

1. Enable `Client Authentication`, `Authorisation`, `Standard Flow and Direct Access` grants like so:
    <div style="text-align:center">   
    <img src="/images/sso/settings_capability_config.png" alt="Cleint Cababilities" class="shadow">
    </div>

2. Set your valid redirect URLS to your vpn domain with `/api/oidc/authorise/callback` as the redirection path, also add `+` in web origins to automatically add the redirection URLs to Origin allow list:
    <div style="text-align:center">   
    <img src="/images/sso/settings_redirects.png" alt="Client Cababilities" class="shadow">
    </div>


3. Then go to `Client Scopes`, Click on the `*-dedicated` scope, in this example `account-dedicated`
    <div style="text-align:center">   
    <img src="/images/sso/client_scopes.png" alt="Client scopes" class="shadow">
    </div>

4. Add a mapper: `By configuration`
    <div style="text-align:center">   
    <img src="/images/sso/client_scopes_mapper.png"  class="shadow">
    </div>

5. Choose the `Group Membership` mapper
    <div style="text-align:center">   
    <img src="/images/sso/client_scopes_group_mapper.png"  class="shadow">
    </div>

6. Set `Name` and `Token Claim Name` to `groups` (or whatever group name you want, update the wag config file if not groups) disable `Full group path`:
    <div style="text-align:center">   
    <img src="/images/sso/set_token_claims.png"  class="shadow">
    </div>

7. Get `ClientID` and `Client Secret` from `Credentials`

## Configuring Wag




### Web UI

Go to `Settings` -> `Authentication`, enable `Single Sign On`

![Wag SSO settings page](/images/sso/wag-sso-settings.png)


### `config.json`

For `OIDC` to be properly enabled, the following fields in the wag configuration file must be set:  

`Webserver.Tunnel.Domain`: The internal wag VPN host domain. E.g the host users visit to MFA  
`Webserver.Tunnel.OIDC.IssuerURL`: The OIDC provider path  
`Webserver.Tunnel.OIDC.ClientID`: The OIDC client ID, what we got in step 7.  
`Webserver.Tunnel.OIDC.ClientSecret`: The OIDC secret, what we got in step 7.  



Additionally, these optional fields may be defined. This is if your OIDC provider defines its user `groups` in something non-standard, i.e not `groups`. 
`Webserver.Tunnel.OIDC.GroupsClaimName`
`Webserver.Tunnel.OIDC.Scopes`: Optional required scopes
  
You may also want to restrict users to only using the `OIDC` provider. Which you can do by setting the `Webserver.Tunnel.Methods` to `["oidc"]`.


::: tip Info
For keycloak the `Webserver.Tunnel.OIDC.IssuerURL` will be `http://your.idp.domain/realms/<realm_name>`
:::

So as an example here is a fragment of a wag configuration file:
```json
  "Webserver": {
        "Lockout": 5,

        "Tunnel": {
            "Domain": "vpn.test",
            "Port": "8080",

            "MaxSessionLifetimeMinutes": 2,
            "SessionInactivityTimeoutMinutes": 1,

            "HelpMail": "help@example.com",

            "DefaultMethod": "totp",
            "Issuer": "vpn.test",
            "Methods": [
                "oidc"
            ],
            "OIDC": {
                "IssuerURL": "https://sso.domain.tld/realms/your-realm-name",    
                "ClientSecret": "SecretKey",              
                "ClientID": "wag-uat",                                       
                "GroupsClaimName": "groups"         
            },
        }
}
```

## Gotchas/Troubleshooting

### Help my device says it's owned by another user?

Wag strictly checks that the device owner (i.e the user that the registration token was generated for) is equal to the username that the identity provider issues.  
This is so one user can't go on another users device and grant it access to additional routes which may not be appropriate for that device.  
  
As such your user may have been provided with a wireguard configuration file, or registration token that had the wrong username associated with it.

### Invalid redirection despite correct route

If the `IssuerURL` has a trailing `/` this may cause the underlying OIDC library to fail in matching the issuer to your KeyCloak returned issuer. 
Just remove the slash.