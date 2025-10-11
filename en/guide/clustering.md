# High Availability

Wag supports clustering for production deployments. 
There are two modes of clustering, the first is to use the embedded etcd cluster which will generate its own certificates.

```json
    "Clustering": {
        "ClusterState": "new",
        "ETCDLogLevel": "error",
        "ListenAddresses": [
            "https://<external address>:2380"
        ],
        "TLSManagerListenURL": "https://<external address>:3434"
    },
```


Then from the management UI you can go to the "Cluster Management" and add a new wag member.

::: tip Clustering
Use the `-join` flag when starting additional nodes to join an existing cluster.
:::


Or you can connect as many wag instances as you like to an external etcd cluster. 

This is done by configuring the `RemoteClustering` option in the configuration file. 
