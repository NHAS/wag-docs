# High Availability

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
