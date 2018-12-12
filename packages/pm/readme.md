# @nore/pm

A cross-platform Node.js process manager.

### Install

```sh
npm install @nore/pm
```

### Usage

```js
import PM from "@nore/pm";

const command = ["node", "script.js", "--debug"];
const options = { cwd: "/path/to/directory", restartLimit: 2 };

const pm = new PM(command, options);
```

Options:

- `killTimeout` – wait `?` milliseconds for the process to exit else send a SIGKILL, **default**: `30000`
- `restartDelay` – wait `?` milliseconds between restarts, **default**: `1000`
- `restartLimit` – the number of times a process can be restarted automatically; setting `null` will restart it indefinitely, **default**: `0`
- other options are directly passed to the spawned process, follow the [official documentation](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)

### API

- `await` `pm.start()` – start the process
- `await` `pm.stop()` – stop the process
- `await` `pm.restart()` – restart the process
- `pm.on('start' () => {})` – emitted when the process is started
- `pm.on('stop' () => {})` – emitted when the process is stopped
- `pm.on('spawn', (process) => {})` – emitted when a new process was spawned
- `pm.on('error', (error) => {})` – emitted on process error
- `pm.on('exit', (code, signal) => {})` – emitted on process exit
- `pm.status` – the status of the process

**`pm.status`**:

- `initial` – the inital state after creating the `pm` instance
- `running` – after the process was started
- `sleeping` – during the delay period while the process is restarting
- `stopping` – during the `.stop()` process
- `stopped` – after the `.stop()` was completed
- `crashed` – process crashed on error or exited without being stopped

---

> License [ISC](license) &nbsp;&middot;&nbsp;
> GitHub [@ugin](https://github.com/ugin) &nbsp;&middot;&nbsp;
> Twitter [@navaru](https://twitter.com/navaru)
