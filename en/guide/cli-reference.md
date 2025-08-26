# Command Line Management

The wag binary provides a cli for managing wag directly, this needs to be able to read and write to a unix socket (defined in the config, or defaultly `/tmp/wag.sock`)




## Common Use Cases

```sh
# List devices
./wag devices -list

# Lock/unlock device
./wag devices -lock -username <user>
./wag devices -unlock -username <user>

# Manage users
./wag users -list
./wag users -reset-mfa -username <user>

# Add admin user
./wag webadmin -add -username <user> -password $(uuiden)
```


## Full Reference
All these modules can be run by doing `/binary/path/wag <module> -argument -argument`

### `start`
Runs wag with a configuration file.
```sh
  -config string
        Configuration file location (default "./config.json")
  -join string
        Cluster join token
  -noiptables
        Do not add iptables rules
```


### `registration`
Manage registration tokens.
```sh
  -add
        Create a new enrolment token
  -del
        Delete existing enrolment token
  -group value
        Manually set user group (can supply multiple -group, or use -groups for , delimited group list)
  -groups string
        Set user groups manually, ',' delimited list of groups
  -list
        List tokens
  -overwrite string
        Add registration token for an existing user device, will overwrite wireguard public key (but not 2FA)
  -socket string
        Wag instance to act on (default "/tmp/wag.sock")
  -static_ip string
        Add registration token with a specific ip address (do not dynamically allocate ip)
  -tag string
        Create device with tag
  -token string
        Manually set registration token (Optional)
  -username string
        User to add device to
  -uses int
        Number of times a registration token can be used (default 1)
```

### `devices`
Manage wireguard peers, including locking/unlocking a device, listing the current authorised sessions
```sh
  -address string
        Address of device
  -del
        Remove device and block wireguard access
  -list
        List wireguard devices
  -lock
        Lock device access to mfa routes
  -mfa_sessions
        Get list of devices with active authorised sessions
  -socket string
        Wag control socket to act on (default "/tmp/wag.sock")
  -unlock
        Unlock device
  -username string
        Owner of device (indicates that command acts on all devices owned by user)
```

### `users`
Manage regular users, reset their MFA, lock/unlock accounts. 
```sh
  -del
        Delete user and all associated devices
  -list
        List users, if '-username' supply will filter by user
  -lockaccount
        Lock account disable authention from any device, deauthenticates user active sessions
  -reset-mfa
        Reset MFA details, invalids all session and set MFA to be shown
  -socket string
        Wag instance control socket (default "/tmp/wag.sock")
  -unlockaccount
        Unlock a locked account, does not unlock specific device locks (use device -unlock -username <> for that)
  -username string
        Username to act upon
```


### `firewall`
The firewall debug tool, this will print out the current state of the userland firewall as json
```sh
  -list
        List firewall rules
  -socket string
        Wag control socket to act on (default "/tmp/wag.sock")
```

### `webadmin`
Manage administrative users, you typically cannot add admin users via the web interface unless you are using OIDC (which will add them automatically):
```sh
  -add
        Add web administrator user (requires -password)
  -del
        Delete admin user
  -list
        List web administration users, if '-username' supply will filter by user
  -lockaccount
        Lock admin account disable login for this web administrator user
  -password string
        Password to set
  -reset
        Reset admin user account password (requires -password and -username)
  -socket string
        Wag instance control socket (default "/tmp/wag.sock")
  -temp
        If the user should be forced to change their password on first use (requires -add)
  -unlockaccount
        Unlock a web administrator account
  -username string
        Admin Username to act upon
```

### `version`
Prints the version of wag (including git short hash).
```sh
  -local
        do not connect to the running wag server, print local binary version information (useful for using with upgrade)
  -socket string
        Wag socket to act on (default "/tmp/wag.sock")
```


### `config`
A debug tool to get and set raw values into the etcd cluster. This should be used with great caution as it may cause you to destroy your wag cluster.
```sh
  -get
        Get key value
  -key string
        Key to set or get
  -put
        Set key value
  -socket string
        Wag control socket to act on (default "/tmp/wag.sock")
  -value string
        Value to set (put only)
```