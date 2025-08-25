# Getting Started

For background information, see the [What is Wag?](./what-is-wag.md) page.

## Installation

The fastest way to get started with Wag:


Create your directories:
```sh
mkdir data
mkdir config
```

Define your config as `config/config.json`:
```json
{
    "NAT": true,
    "Webserver": {
        "Lockout": 5,

        "Tunnel": {
            "Domain": "vpn.example.com",
            "Port": "8080",

            "MaxSessionLifetimeMinutes": 480,
            "SessionInactivityTimeoutMinutes": 60,

            "HelpMail": "help@example.com",

            "DefaultMethod": "totp",
            "Issuer": "vpn.example.com",
            "Methods": [
                "totp"
            ]
        },

        "Public": {
            "ListenAddress": "wag:8081",
            "ExternalAddress": "registartion.example.com",
            "DownloadConfigFileName": "wg0.conf"
        },
        "Management": {
            "Enabled": true,
            "ListenAddress": "wag:4433",
            "Password": {
                "Enabled": true
            },
        }
    },

    "Wireguard": {
        "DevName": "wg0",
        "ListenPort": 53230,
        "PrivateKey": "<REPLACE_ME>",
        "Address": "192.168.122.1/24",
        "ServerPersistentKeepAlive": 0
    }
}
```

Set your private key
```sh
# Replace REPLACE_ME with:
wg genkey 
```


Start your service:
```yaml
services:
  wag:
    image: wagvpn/wag:latest
    container_name: wag
    restart: always
    cap_add:
      - NET_ADMIN
    ports:
      - '4433:4433/tcp'   # Admin page
      - '8081:8081/tcp'   # Public registration
      - '53230:53230/udp' # WireGuard port
    volumes:
      - ./config/:/cfg/:z
      - ./data/:/data:z
    devices:
      - /dev/net/tun:/dev/net/tun
```


```sh
sudo docker compose up -d
```

On first run Wag will generate an administrative user that you can then log in to. 


## Configuration

### Access Control Lists (ACLs)

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

### Policy Rules

::: details Rule Precedence
Rules use subnet prefix length to determine precedence. **More specific matches override general rules**.

Example: If `10.0.0.0/16` requires MFA but `10.0.1.1/32` is in the Allow list, users can access `10.0.1.1` without MFA.
:::

#### Rule Types

| Rule Type | Description | Example |
|-----------|-------------|---------|
| **Mfa** | Requires authentication | `"192.168.1.0/24"` |
| **Allow** | Public access | `"8.8.8.8"` |
| **Deny** | Blocked access | `"10.0.0.5/32"` |

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

## Web Interfaces

### Public Registration Portal
- **Purpose**: Device enrollment and registration
- **Default Port**: 8081
- **Access**: Public-facing for new device setup

### Management Interface
- **Purpose**: Administrative control and user management
- **Default Port**: 4433
- **Access**: Restricted to administrators

::: warning Security Notice
The management interface should **never** be publicly exposed. Use SSH forwarding or restrict to localhost.
:::

## Device Management

### Registration Flow

1. **Generate Token**
   ```bash
   ./wag registration -add -username <username>
   ```

2. **Device Registration**
   ```bash
   curl http://server:8081/register_device?key=<token>
   ```

3. **Client Configuration**
   The service returns a complete WireGuard configuration file ready for use.

### Command Line Management

```bash
# List devices
./wag devices -list

# Lock/unlock device
./wag devices -lock -username <user>
./wag devices -unlock -username <user>

# Manage users
./wag users -list
./wag users -reset-mfa -username <user>
```

## High Availability

Wag supports clustering for production deployments:

```json
{
  "Clustering": {
    "ClusterState": "new",
    "ETCDLogLevel": "error",
    "ListenAddresses": ["https://127.0.0.1:2380"]
  }
}
```

::: tip Clustering
Use the `-join` flag when starting additional nodes to join an existing cluster.
:::

## Authentication Methods

### Supported Methods
- **TOTP** - Time-based one-time passwords
- **WebAuthn** - Security keys and biometrics  
- **OIDC** - Single sign-on integration
- **PAM** - System authentication

### OIDC Configuration

```json
{
  "OIDC": {
    "IssuerURL": "https://auth.example.com",
    "ClientID": "wag-client",
    "ClientSecret": "your-secret",
    "GroupsClaimName": "groups"
  }
}
```

## Use Cases

### Corporate VPN
- Employees access internal resources with MFA
- Public services (internet) remain unrestricted
- Fine-grained access based on user groups

### Site-to-Site Connections  
- Secure connections between office locations
- Route-specific authentication requirements
- Centralized access control

### Zero-Trust Architecture
- All internal resources require authentication
- Device-based access policies
- Real-time access revocation

## Contributing

We welcome contributions! Please ensure your changes include tests where possible.

::: info Getting Started
1. Check existing `_test.go` files for testing examples
2. Write tests for new features
3. Open a pull request for discussion
:::

## Support

If Wag supports your workflow, consider supporting the project through donations. Details available in the project repository.

---

::: tip Next Steps
- Review the [example configuration](https://github.com/NHAS/wag/blob/main/example_config.json)
- Set up your first deployment with Docker Compose
- Configure access policies for your organization
:::