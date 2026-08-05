#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
node --check app.js
node --check wa-game-state-adapter.js
node --check wa-script-interpreter-core.js
node --check wa-original-runtime.js
node --check service-worker.js
ln -sf ../wa-script-interpreter-core.js tests/wa-script-interpreter-core.js
ln -sf ../wa-game-state-adapter.js tests/wa-game-state-adapter.js
ln -sfn ../data tests/data
for test in \
  tests/original-runtime-foundation.test.js \
  tests/original-runtime-integration.test.js \
  tests/test-original-card-page-lists-v09185.js \
  tests/test-original-preplay-targets-v09186.js \
  tests/test-original-counter-runtime-v09187.js \
  tests/test-original-persistent-lifecycle-v09188.js \
  tests/test-original-pin-submission-damage-v09189.js \
  tests/test-original-damage-bonus-v09190.js \
  tests/test-original-move-stun-lifecycle-v09191.js \
  tests/test-original-event-completion-v09192.js
do
  node "$test"
done
