
# Access Control Lists (ACLs)

Wag uses a powerful policy system to control access to network resources:

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

```json
{
  "Mfa": [
    "192.168.1.1 22/tcp",      // SSH access
    "192.168.1.1 53/udp",      // DNS
    "192.168.1.1 22-1024/tcp", // Port range
    "192.168.1.1 icmp"         // ICMP
  ]
}
```