# v0.9.150 Persistent Pages and Superstar Abilities

## Fixed

- Player and CPU in-play pages now appear beside the central play pile.
- Tapping an in-play page displays its normal full front/back card in the pile.
- Remaining duration is shown for temporary pages; match-long pages show `MATCH`.
- Removed or expired pages disappear immediately from the persistent area.
- Pages whose printed rule removes them when their owner is Stunned now leave play
  when the Stun is successfully applied.
- `Out_Of_Play` scripts fire when those pages leave play.
- The SPECIAL button and CPU ability logic now use the same exact readiness gate.
- Timing, usage limit, required Attitude, required hand/deck targets, position, control,
  and turn restrictions are checked before an ability is offered.

## Audit

- 25 callable Superstar base ability paths received explicit readiness checks.
- Player, CPU, and Ric Flair reaction activation use the shared gate.
- JavaScript syntax validation passed.
