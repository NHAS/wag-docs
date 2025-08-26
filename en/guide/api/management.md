# Management API
This API is served over a **Unix Socket** and not over the management listener. 

By default the wag socket is open to `/tmp/wag.sock`, however this is configurable.


This API is HTTP over `UNIX` socket.


```go
ctrl = wagctl.NewControlClient("/tmp/wag.sock")

version, err := ctrl.Version()
// handle your errors here
```


You can view the avaible functions here:  
https://github.com/NHAS/wag/blob/main/pkg/control/wagctl/client.go
