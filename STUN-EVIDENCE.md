# Authentic Stun Certification — v0.9.140

## Direct original evidence

`WAMain.dll` states that a Stunned Superstar cannot play Moves, Counters or Specials unless a page explicitly permits play while Stunned.

The original card scripts establish the duration encoding:

- `WAStun ... 1` appears on countered high-risk moves whose text says the user is Stunned **until the end of the current turn**.
- `WAStun ... 2` appears on cards whose text says Stunned **until the end of the next turn**.
- `WAStun ... 3` appears on cards whose text says Stunned **for the next two turns**.

Therefore the WAStun value includes the current turn. The prior recreation incorrectly treated the number as future skipped turns.

## Implemented

- Absolute turn expiry instead of a future-turn countdown.
- WAStun 1 expires at the end of the current turn and does not skip the next turn.
- WAStun 2 covers the current turn and the next turn.
- WAStun 3 covers the current turn and the following two turns.
- `Can_Stun` lifecycle hooks execute before applying a Stun.
- Tough Guy removes itself to prevent the next Stun.
- Playing Tough Guy while Stunned clears the Stun through its original `Stunned_For_Turns = 0` script.
- 150 Pounds of Toughness prevents Stuns while the opponent is in control, through its original `Can_Stun` script.
- Kane ignores the first Stun received, exactly as printed on both original Superstar editions.
- Hardcore EX3 prevents Stuns while its five-turn effect is active.
- `Stunned` lifecycle hooks fire immediately when Stun is applied, so Sensing Victory, Working Stiff, One Step Ahead, Achilles' Heel and similar pages leave play at the correct time.
- Exact pages whose original text permits play while Stunned bypass the normal Stun legality block.
- A Stunned control opportunity cannot play ordinary Moves, Counters or Specials and passes control when resolved.
- Location is not reset by Stun; Ringside and count-out state remain separate.

## Duration refresh

A new Stun cannot shorten an existing longer Stun. The later expiry is retained.
