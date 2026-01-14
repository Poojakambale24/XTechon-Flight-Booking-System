/* eslint-disable no-console */

/**
 * Best-effort dev port cleanup (Windows-friendly).
 *
 * CRA prompts when a port is in use; we pre-kill known dev ports to make
 * `npm run dev` deterministic.
 */

const portsToKill = [4000, 3002];

async function main() {
  let killPort;
  try {
    // kill-port is a devDependency in the repo root
    killPort = require('kill-port');
  } catch {
    console.warn('[predev] kill-port not installed; skipping port cleanup');
    return;
  }

  await Promise.all(
    portsToKill.map(async (port) => {
      try {
        // kill-port supports (port) and (port, protocol)
        await killPort(port);
        console.log(`[predev] Freed port ${port}`);
      } catch {
        // Port wasn't in use or couldn't be killed; don't block dev startup
      }
    })
  );
}

main().catch(() => {
  // Never block dev startup
});
