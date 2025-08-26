# Public Endpoint API

The public endpoint presents a minimal number of APIs to the world. This is primarily to reduce the attack surface area of wag.



## `GET /reachability`

Test if the wag node is up, down, or draining (removing all active clients).


| Return code    | Content | Meaning |
| -------- | ------- | -- |
| 200  | OK    | Wag node is up and accepting new clients|
| 410 | Drained     | Wag node is actively trying to remove clients|



## `GET /register_device`
This is the device registration endpoint, when you create a registration token this is where your clients should query.

| Parameters   | Use |  
| -------- | ------- | 
| key  |  The registration token    | 
| pubkey  | Supply a public key, the wag server will not generate a private key    | 


| Return code    | Content | Meaning |
| -------- | ------- | -- |
| 404  | N/A    | Token was either invalid or not found|
| 500 | N/A     | Adding the device/user has failed, check server logs for reason|
| 200 | Wireguard Profile     | The device/user has been added|


## `ANY /webhooks/<webhook_id>`

The webhooks endpoint can take any method, this is where a client should be posting its data. 

This endpoint can take **any** schema of `JSON`

| Required Header   | Use |  
| -------- | ------- | 
| `X-AUTH-HEADER`  |  The authorisation header for this webhook    | 


