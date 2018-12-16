import { exec } from "child_process";
import ps from "ps-tree";
import os from "os";

function tryToKill(pid, signal) {
  try {
    process.kill(pid, signal);
  } catch (err) {
    // do nothing
  }
}

export default (pid, signal = "SIGTERM") => {
  if (os.platform() === "win32") {
    exec(`taskkill /pid ${pid} /T /F`);
  } else {
    ps(pid, function(_, pids = []) {
      tryToKill(pid, signal);

      for (const entry of pids) {
        tryToKill(parseInt(entry.PID), signal);
      }
    });
  }
};
