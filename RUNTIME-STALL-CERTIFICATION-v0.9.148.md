# v0.9.148 Runtime Stall Certification

## Fixed: rejected CPU pin loop

The CPU previously returned from `cpuTurn()` whenever it decided to try a pin, even if `attemptPin()` rejected that pin because the wrestlers were not both in the ring or another pin gate failed. The state did not change, so the CPU scheduled itself and repeated the same rejected pin indefinitely.

`attemptPin()` now returns a success flag. A rejected CPU pin falls through to normal legal-card selection or Pass.

## Measured execution

- 320 ordered matches completed at the full 20-turn diagnostic limit after the fix.
- 0 stalls in those 320 matches.
- 960 additional short control-flow matches completed.
- 0 stalls in those 960 matches.
- 64 ready Superstar editions were represented by the runtime harness.

The complete 4,096-match 64x64 matrix did not finish within this execution window, so the unexecuted remainder is not labelled as passed.
