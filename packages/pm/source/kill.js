import { exec } from "child_process";
import ps from "ps-tree";
import os from "os";

export default (pid, signal) => {
  if (os.platform() === "win32") {
    exec(`taskkill /pid ${pid} /T /F`);
  } else {
    ps(pid, function(_, pids = []) {
      pids = [...pids, pid].map(item => parseInt(item.PID, 10));

      for (const pid of pids) {
        try {
          process.kill(pid, signal);
        } catch (err) {
          // do nothing
        }
      }
    });
  }
};
