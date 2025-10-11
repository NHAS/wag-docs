# Configuration File Reference


## General Options
| Option | Type | Default | Explanation | 
| -------- | ------- | --- | -- |
| `Socket` | `string` | `/tmp/wag.sock` | Administrative unix socket path  | 
| `GID` | `int` | Process GID |   Group ID for unix socket |
| `CheckUpdates` | `string` | `true` | Enable checking updates (reaches out to github) | `true` |
| `NumberProxies` | `int` |`0` | Number of reverse proxies  | 
| `DevMode` | `bool` | `false` |Enable debug mode, will enable a pprof server on `:6060` |
| `ExposePorts` | `[]string` | none | List of ports to expose externally |
| `NAT` | `bool` | `true` | Enable Network Address Translation |

## Webserver


| Option | Type | Default | Explanation |
| -------- | ------- | --- | -- |
| `Lockout` | `int` | 5 | Number of allowed authentication attempts before account is locked |

### ACME
Configuration block for automatically getting TLS certificates, supports `DNS-01` and `HTTP-01` challenge types.  

| Option | Type | Default | Explanation |
| -------- | ------- | --- | -- |
| `Email` | `string` | - | Your email address to give to the acme provider |
| `CAProvider` | `string` | `https://acme-staging-v02.api.letsencrypt.org/directory`| The ACME provider to talk to for certificates |
| `CloudflareDNSToken` | `string` | - | Cloudflare API token for adding DNS-01 challenge |


### Public
The public webserver configuration options, this web server provides the wireguard configuration configs to your clients via the registration tokens endpoint. 

It also accepts webhooks. 

| Option | Type | Default | Explanation |
| -------- | ------- | --- | -- |
| `DownloadConfigFileName` | `string`| `wg0.conf`| The filename for the generated wireguard profile|
| `ExternalAddress` | `string` | - | The IP or domain that the wireguard port can be reached |
| `Domain` |`string` | - | The domain of the public webserver, must be defined for ACME
| `ListenAddress` |`string` | - | Listen address for the public registration endpoint 
| `TLS` | `bool` | `false` | Enable TLS on this endpoint (will automatically use ACME if certificate paths are not defined)
| `CertificatePath` | `string`| - | Path to certificate to load in on first run
| `PrivateKeyPath`|`string` | - | Path to private key to load into wag on first run |
| `ExternalAddress`|`string` | - |  External address to be baked in to generated wireguard configs, i.e where your wireguard connections connect to.

### Tunnel

The webserver configurations for VPN tunnel handler, this will handle authentication and user exposed apis, such as those that return the user routes.


| Option | Type | Default | Explanation |
| -------- | ------- | --- | -- |
| `Port` | `string` | - | Port for the tunnel endpoint |
| `Domain` | `string` | - | Domain |
| `TLS` | `bool` | `false` | Enable TLS on this endpoint (will automatically use ACME if certificate paths are not defined) |
| `CertificatePath` | `string` | - | Path to certificate to load on first run |
| `PrivateKeyPath` | `string` | - | Path to private key to load on first run |
| `HelpMail` | `string` | - | Email address that is displayed in error messages |
| `MaxSessionLifetimeMinutes` | `int` | - | Maximum session lifetime in minutes |
| `SessionInactivityTimeoutMinutes` | `int` | - | Session inactivity timeout in minutes |
| `DefaultMethod` | `string` | - | Default MFA authentication method |
| `Issuer` | `string` | - | Issuer identifier for authentication |
| `Methods` | `[]string` | - | List of available authentication methods, can be `totp`, `webauthn`, `oidc`, `pam`, some of these methods may require additional configuration |
| `OIDC.IssuerURL` | `string` | - | OpenID Connect issuer URL |
| `OIDC.ClientSecret` | `string` | - | OpenID Connect client secret |
| `OIDC.ClientID` | `string` | - | OpenID Connect client ID |
| `OIDC.GroupsClaimName` | `string` | - | Name of the groups claim in OIDC tokens |
| `OIDC.DeviceUsernameClaim` | `string` | - | Name of the device username claim in OIDC tokens |
| `OIDC.Scopes` | `[]string` | - | List of OIDC scopes to request |
| `PAM.ServiceName` | `string` | - | PAM service name for authentication |


### Management

Configuration options for the management web interface, when password is enable (which is default) an administrative user is generated on first run. 

Otherwise you can configure OIDC for login.

| Option | Type | Default | Explanation |
| -------- | ------- | --- | -- |
| `Domain` | `string` | - | Domain |
| `TLS` | `bool` | `false` | Enable TLS on this endpoint (will automatically use ACME if certificate paths are not defined) |
| `CertificatePath` | `string` | - | Path to certificate to load on first run |
| `PrivateKeyPath` | `string` | - | Path to private key to load on first run |
| `ListenAddress` |`string` | - | Listen address for the management UI endpoint 
| `Enabled` | `bool` | `true` | Enable the management UI |
| `Password.Enabled` | `bool` | - | Enable password authentication |
| `OIDC.Enabled` | `bool` | - | Enable OpenID Connect authentication |
| `OIDC.IssuerURL` | `string` | - | OpenID Connect issuer URL authentication |
| `OIDC.ClientSecret` | `string` | - | OpenID Connect client secret |
| `OIDC.ClientID` | `string` | - | OpenID Connect client ID |


## Clustering

Wag has two modes of clustering, you can either set up an external ETCd cluster then attach wag clients to it, or you can use the in-built local cluster.

### Local Clustering

| Option | Type | Default | Explanation |
| -------- | ------- | --- | -- |
| `Name` | `string` | - | Name of the etcd cluster |
| `ListenAddresses` | `[]string` | - | Listen address of etcd |
| `Peers` | `map[string][]string` | - | Map of peer nodes and their addresses |
| `DatabaseLocation` | `string` | - | Path to store etcd database on disk |
| `ETCDLogLevel` | `string` | - | Log level for ETCD |
| `Witness` | `bool` | - | Enable witness mode for the cluster node, this means that wireguard will not be spun up, this will only be for running etcd |
| `ClusterState` | `string` | - | Initial state of the cluster, i.e are you creating a `new` cluster or joining an `existing` one |
| `TLSManagerStorage` | `string` | - | Where to store automatically generate certificates for etcd |
| `TLSManagerListenURL` | `string` | - | URL for the TLS manager to listen on, if you want to join other wag instances to the local cluster this must be exposed to copy down certificates |

### Remote Clustering

These options are used if wag is connecting to a remote etcd cluster. 
This will disable the cluster management features within wag. 

Please read the ETCD configuration documentation here:

https://pkg.go.dev/go.etcd.io/etcd/client/v3#ConfigSpec



## Wireguard

These are the options for configuring the wireguard device.


| Option | Type | Default | Explanation |
| -------- | ------- | --- | -- |
| `DevName` | `string` | - | Device name for the wireguard interface |
| `ListenPort` | `int` | - | Port for wireguard to listen on |
| `PrivateKey` | `string` | - | Private key for the wireguard interface |
| `Address` | `string` | - | Network range for VPN, i.e 192.168.2.1/24 will give you a `/24` network |
| `MTU` | `int` | - | Maximum transmission unit for the wireguard interface |
| `LogLevel` | `int` | - | Log level for wireguard |
| `ServerPersistentKeepAlive` | `int` | disabled | Persistent keepalive interval in seconds  |
| `DNS` | `[]string` | - | List of DNS servers for wireguard clients |


# Full golang structure

```go
type Config struct {
	Socket        string 
	GID           *int   
	CheckUpdates  bool   
	NumberProxies int
	DevMode       bool 

	ExposePorts []string 
	NAT         *bool    

	Webserver struct {
		Acme struct {
			Email              string
			CAProvider         string
			CloudflareDNSToken string
		}

		Public struct {
			webserverDetails
			DownloadConfigFileName string 
			ExternalAddress        string
		}

		Lockout int

		Tunnel struct {
			Port   string
			Domain string
			TLS    bool

			CertificatePath string
			PrivateKeyPath  string

			HelpMail string

			MaxSessionLifetimeMinutes       int
			SessionInactivityTimeoutMinutes int

			DefaultMethod string 
			Issuer        string
			Methods       []string 

			OIDC struct {
				IssuerURL           string
				ClientSecret        string
				ClientID            string
				GroupsClaimName     string   
				DeviceUsernameClaim string   
				Scopes              []string 
			} 

			PAM struct {
				ServiceName string
			} 
		}

		Management struct {
			webserverDetails

			Enabled bool

			Password struct {
				Enabled *bool 
			} 

			OIDC struct {
				IssuerURL    string
				ClientSecret string
				ClientID     string
				Enabled      bool
			} 
		} 
	}

	Clustering ClusteringDetails

	RemoteCluster *clientv3.ConfigSpec

	Wireguard struct {
		DevName    string
		ListenPort int
		PrivateKey string
		Address    string
		MTU        int

		LogLevel int

		//Not externally configurable
		Range                     *net.IPNet 
		ServerAddress             net.IP     
		ServerPersistentKeepAlive int

		DNS []string 
	}

}

```

# Example configuration


```json
{
    "Socket": "/tmp/wag.sock",
    "NumberProxies": 0,
    "ExposePorts": [
        "10/tcp",
        "100-500/tcp"
    ],
    "NAT": true,

    "Webserver": {
        "Lockout": 5,

        "Tunnel": {
            "Domain": "vpn.test",
            "Port": "8082",

            "MaxSessionLifetimeMinutes": 2,
            "SessionInactivityTimeoutMinutes": 1,

            "HelpMail": "help@example.com",

            "DefaultMethod": "totp",
            "Issuer": "vpn.test",
            "Methods": [
                "totp"
            ],
            "OIDC": {
                "IssuerURL": "",
                "ClientSecret": "",
                "ClientID": "",
                "DeviceUsernameClaim": "",
                "Scopes": []
            },
            "PAM": {
                "ServiceName": ""
            }
        },

        "Public": {
            "ListenAddress": ":8081",
         

            "ExternalAddress": "192.168.121.61",
            "DownloadConfigFileName": "wg0.conf"

        },
        "Management": {
            "Enabled": true,
            "ListenAddress": "127.0.0.1:4433",
            "Password": {
                "Enabled": true
            },
            "OIDC": {
                "IssuerURL": "",
                "ClientSecret": "",
                "ClientID": "",
                "Enabled": false
            }
        }
    },

    "Wireguard": {
        "DevName": "wg1",
        "ListenPort": 53230,
        "PrivateKey": "<REPLACEME>",
        "Address": "192.168.122.1/24",
        "ServerPersistentKeepAlive": 0
        
    },
    "Clustering": {
        "ClusterState": "new",
        "ETCDLogLevel": "error",
        "ListenAddresses": [
            "https://127.0.0.1:2380"
        ],
        "TLSManagerListenURL": "https://127.0.0.1:3434"
    }
}
```