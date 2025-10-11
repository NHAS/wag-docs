# Client API

Wag exposes some API endpoints that your end user devices can poll for automation. 
Most importantly:

`/api/routes`: This api will return a comma delimited list of IP addresses that Wag "guards". 

As wireguard itself has no ability to accept "pushed" routes from a central source, you must use this to automate your client devices. 

The simplest way of doing this would be to forward all traffic through `Wag` with a `0/0` AllowedIps, then wag will filter all the device traffic. 
However you may want to just restrict your users down to what the wag gateway is actually responsible for.

In that case unfortunately you will have to write that automation yourself.


[Full reference](api/tunnel)