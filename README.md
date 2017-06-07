# wscli

CLI WebSocket client

**NOTE**: Since this tool is intended to be used in development, it sets 
[rejectUnauthorized](https://nodejs.org/api/tls.html#tls_tls_connect_options_callback)
option to `false`. It lets to bypass SSL Certificate checks when connecting to dev servers


## Installation

```sh
npm install -g wscli
```

## Usage

```sh
wscli HOST [COUNT=1] [MSG]
```

- `HOST`: full path to websocket endpoint, e.g. `ws://localhost:10000`
- `COUNT`: expected responses count (optional, defaults to 1).
  - `COUNT=-1`: `wscli` will keep listening forever
  - `COUNT=0`: `wscli` will connect and send message and ignore any incoming messages
  might be useful to test that connection is ok and there are no errors sending messages
- `MSG`: optional message to send to server on connection


## Examples

```sh
# Expect 1 message back and quit with exit code 0
wscli ws://localhost:10000 '{"action":"PING"}'
> {"action":"PONG","req":{"action":"PING"},"res":{"time":1496798038289}}
✔


# Expect 2 messages back and quit with exit code 0
wscli ws://localhost:10000 2 '{"action":"PING"}'
> {"action":"PONG","req":{"action":"PING"},"res":{"time":1496798038000}}
> {"action":"PONG","req":{"action":"PING"},"res":{"time":1496798039000}}
✔


# Listen forever, until interrupted
wscli ws://localhost:10000 -1
^C
✘-INT


# Any error, or server closes connection
14:14 $ wscli ws://localhost:10000 -1
Server has closed connection
✘-1
```


## Timeout

By default `wscli` does not have any timeout, so if expected message never arrives,
process will hang forever.

To avoid this issue, use `timeout` command like:

```sh
timeout 10 wscli ws://localhost:10000 -1
```

On MacOS you can install `timeout` as part of `coreutils` or use simple cross-platform replacement:

```sh
npm install -g @nkbt/timeout
timeout 10 wscli ws://localhost:10000 -1
```
