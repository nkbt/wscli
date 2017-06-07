# wscli

Hash publishable NPM package content

## CLI Installation

```bash
npm install -g wscli
```

## CLI Usage

```bash
wscli HOST [COUNT=1] [MSG]

# COUNT: expected responses count (defaults to 1)
# COUNT=-1 wscli will keep listening forever
# COUNT=0 wscli will connect and send message and ignore any incoming messages
#   might be useful to test that connection is ok and there are no errors sending messages
```


## Examples

```bash
wscli ws://localhost:10000 {"action":"PING"}
> {"action":"PONG","req":{"action":"PING"},"res":{"time":1496798038289}}


wscli ws://localhost:10000 -1 {"action":"PING"}
> {"action":"PONG","req":{"action":"PING"},"res":{"time":1496798038000}}
> {"action":"PONG","req":{"action":"PING"},"res":{"time":1496798039000}}
> {"action":"PONG","req":{"action":"PING"},"res":{"time":1496798040000}}
```

## Timeout

By default `wscli` does not have any timeout, so if expected message never arrives,
process will hang forever.

To avoid this issue, use `timeout` command like:

```bash
timeout 10 wscli ws://localhost:10000 -1
```

On MacOS you can install `timeout` as part of `coreutils` or use simple cross-platform replacement:

```bash
npm install -g @nkbt/timeout
timeout 10 wscli ws://localhost:10000 -1
```
