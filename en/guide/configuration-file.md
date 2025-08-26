# Configuration File Reference


```go
type Config struct {
	Socket        string `json:",omitempty"`
	GID           *int   `json:",omitempty"`
	CheckUpdates  bool   `json:",omitempty"`
	NumberProxies int
	DevMode       bool `json:",omitempty"`

	ExposePorts []string `json:",omitempty"`
	NAT         *bool    `json:",omitempty"`

	Webserver struct {
		Acme struct {
			Email              string
			CAProvider         string
			CloudflareDNSToken string
		}

		Public struct {
			webserverDetails
			DownloadConfigFileName string `json:",omitempty"`
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

			DefaultMethod string `json:",omitempty"`
			Issuer        string
			Methods       []string `json:",omitempty"`

			OIDC struct {
				IssuerURL           string
				ClientSecret        string
				ClientID            string
				GroupsClaimName     string   `json:",omitempty"`
				DeviceUsernameClaim string   `json:",omitempty"`
				Scopes              []string `json:",omitempty"`
			} `json:",omitempty"`

			PAM struct {
				ServiceName string
			} `json:",omitempty"`
		}

		Management struct {
			webserverDetails

			Enabled bool

			Password struct {
				Enabled *bool `json:",omitempty"`
			} `json:",omitempty"`

			OIDC struct {
				IssuerURL    string
				ClientSecret string
				ClientID     string
				Enabled      bool
			} `json:",omitempty"`
		} `json:",omitempty"`
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
		Range                     *net.IPNet `json:"-"`
		ServerAddress             net.IP     `json:"-"`
		ServerPersistentKeepAlive int

		DNS []string `json:",omitempty"`
	}

	Acls Acls
}

```