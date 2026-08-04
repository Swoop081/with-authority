# v0.9.152 Rapid-Tap and Duplicate-Action Protection

A shared input lock now protects 13 match interactions, including card
play, Pass, pins, submission maintenance/release, Superstar abilities, Ringside
actions, CPU acknowledgement, table removal, Autocounter ditching, and card flips.

The CPU scheduler now retains only one timer and binds each callback to the active
match ID and action generation. Old callbacks cannot act after a new state transition,
match end, or new match.

Pointer-up handlers prevent the browser from synthesising a second click after a touch
gesture. Match completion cancels the CPU timer and invalidates all delayed actions.

Static guard coverage: 13/13.
JavaScript syntax validation: PASS.

This is code-level and deterministic state protection. Final iPhone validation still
requires deliberate double-tap testing on the installed PWA.
