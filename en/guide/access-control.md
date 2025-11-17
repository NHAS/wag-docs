
# Access Control Lists (ACLs)

Wag uses a policy system to control access to network resources.

Here is an example:
```json
{
  "Acls": {
    "Groups": {
      "group:administrators": ["admin1", "admin2"],
      "group:users": ["user1", "user2"]
    },
    "Policies": {
      "*": {
        "Mfa": ["10.0.0.0/16"],
        "Allow": ["8.8.8.8", "google.com"]
      },
      "group:administrators": {
        "Allow": ["192.168.1.0/24"]
      }
    }
  }
}
```


This is a snippet from the `config.json` of a new deployment. These rules will be loaded into wag on first run, then editing the rules from the Web UI is the recommended way to make changes. 

Here we can see two groups of `administrators` and `users` has been created, all groups must be prefixed by `group:` (the web UI will do this for you automatically). 
Users do not have to exist for them to be part of a group, or have a policy defined that effects them. 


Within the `policies` section of this configuration, we can see there is a `*`, this is a special directive meaning "applies to all". 
In this instance the `*` policy says "when anyone has completed MFA, allow them to interact with all ports and protocols in the `10.0.0.0/16` subnet. And generally allow them to access `8.8.8.8` and `google.com` without port restrictions"


Then the policy that targets the `administrators` group, allows constant (and un-MFA'd) access to the `192.168.1.0/24`. 

# Policy Rules

::: warning Rule Precedence
Rules use subnet prefix length to determine precedence. **More specific matches override general rules**.

Example: If `10.0.0.0/16` requires MFA but `10.0.1.1/32` is in the Allow list, users can access `10.0.1.1` without MFA.
:::

#### Rule Types

| Rule Type | Description | 
|-----------|-------------|
| **Mfa** | Requires authentication | 
| **Allow** | Public access | 
| **Deny** | Blocked access | 

#### Port & Protocol Rules

You can define which ports a user may access on a given host. 

```json
{
  "Acls": {
    "Policies": {
      "*": {
        "Mfa": ["10.0.0.0/16 22/tcp 80/tcp 443/tcp"],
      },
    }
  }
}

```

Would allow all users & devices to access the `10.0.0.0/16` subnet with the 22/tcp, 80/tcp and 443/tcp ports. Wag supports UDP, TCP and ICMP for protocol types. You can also select `/any` for both TCP and UDP.

```json
{
  "Mfa": [
    "192.168.1.1 22/tcp",      // SSH access
    "192.168.1.1 53/udp",      // DNS
    "192.168.1.1 22-1024/tcp", // Port range
    "192.168.1.1 443/any"      // Both UDP and TCP on port 443
    "192.168.1.1 icmp"         // ICMP
  ]
}
```

This would be better expressed as 

```json
{
  "Mfa": [
    "192.168.1.1 22-1024/tcp 53/udp 443/udp icmp",
  ]
}
```

Rules like the above will compose, allowing access to the `192.168.1.1` host on 22/tcp, 53/udp, 22 to 1024 tcp 443 udp and tcp and icmp (ping).

::: info Deep dive

Under the hood Wag uses a longest prefix matching trie, that then points to an array of rules. 

As a visual example, the preceeding example would look like this under the hood.

```
192.168.1.1 -> [

  {type: MFA, allow 22/tcp},
  {type: MFA, allow 53/udp},
  {type: MFA, allow range from 22 to 1024 tcp}
  {type: MFA, allow 443 any type}
  {type: MFA, allow icmp}
  
]
```

So when packets come to being matched, there will be a graph search O(M*n) followed by a linear search O(n) (technically O(1) as wag has an upper limit on max number of rules). 
:::