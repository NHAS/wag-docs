# Tunnel/Client API

This API is present on the tunnel HTTP/S listener and is exposed to the wireguard peers on the wag host IP address.


## `GET` `/public_key` or `/api/public_key`
This endpoint returns the server public wireguard key.


| Return code    | Content | Meaning |
| -------- | ------- | -- |
| 500 | N/A     | Failed to query wireguard device, check server logs|
| 200 | Server public key as `text/plain`     | |


## `GET` `/status` or `/api/status` 

Return JSON object representing user authorisation status and mfa/allow/denied routes. 

State Object Schema (v9.1.4):
```json
{
	"IsAuthorised": "bool",
	"MFA":    ["string"],
	"Public": ["string"],
	"Deny":   ["string"]
}
```

The various rules will be in Wag rule syntax, e.g:
```json
["somehost.somewhere 22/tcp", "1.1.1.1/32"]
```

| Return code    | Content | Meaning |
| -------- | ------- | -- |
| 500 | N/A     | Failed to query wireguard device, check server logs|
| 200 | Authorisation state `application/json`     | |

## `GET` `/routes` or `/api/routes` 
Returns a comma (`,`) delimited list of ip addresses that the VPN is responsible for.

| Return code    | Content | Meaning |
| -------- | ------- | -- |
| 500 | N/A     | Failed to query wireguard device, check server logs|
| 200 | IP addresses `text/plain`     | The routes the vpn client can send to the vpn (i.e whats captured by the vpn) |


## `POST` `/logout` or `/api/logout` 

End the authorised session of the client

| Return code    | Content | Meaning |
| -------- | ------- | -- |
| 500 | N/A     | Failed to query wireguard device, check server logs|
| 204 | N/A     | Client session has been ended, no longer able to access MFA routes |
| 404 | N/A     | Client wasnt already authorised |

