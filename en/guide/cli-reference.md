# Command Line Management

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

