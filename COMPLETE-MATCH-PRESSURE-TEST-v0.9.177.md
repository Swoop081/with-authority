# v0.9.177 Complete-Match Runtime Pressure Test

## Scope
Actual game runtime loaded in headless Chromium with the three competitive decks: Stone Cold Steve Austin, The Rock 1st Edition, and The Rock 2nd Edition. Both player and CPU turns used the same live legality, counter, card effect, pin, stun, draw, search and discard code used by the game.

## Additional defects found and corrected
1. Damage Specials could pass the hand legality check, then fail to find a compatible Move after resolution set `state.busy=true`. The attached-Move search now evaluates before the busy resolution lock is applied.
2. Original `WAMessage` calls were rendered as the numeric message-channel argument (for example `Arm Drag Takedown: -1`). The runtime now removes the channel parameter and displays the recovered commentary text.
3. Arm Drag Takedown had both an explicit draw hook and its recovered original `Move_Connected` script. The duplicate hook was removed so Knowledge Momentum produces exactly one draw.

## Completed seeded matches
- Austin vs Rock 1st Edition: Rock won by pinfall on turn 26. Austin 33 HP; Rock 70 HP. Rock connected 5 distinct moves and used Stunning Blow correctly with an Impact Move. No late Entrance, proactive reactive-page, unattached Damage Special, or script-runtime violations were detected.
- Rock 1st Edition vs Austin: Austin won by pinfall on turn 40 after Stone Cold Stunner reduced Rock to 0 HP. Rock 0 HP; Austin 13 HP. The match recorded counters, a successful Stunner, kick-outs and a legal final pin. No monitored legality or script-runtime violations were detected.
- Rock 2nd Edition vs Austin: Rock won by pinfall on turn 28. Rock 69 HP; Austin 26 HP. With Authority! attached to Gut Buster and the attached Move resolved for 10 damage. No monitored legality or script-runtime violations were detected.

## Extended run
Austin vs Rock 2nd Edition reached turn 31 with both wrestlers active. It was stopped by the automation step ceiling while an attack-resolution timer was pending, not by a detected game deadlock. At the stop: Austin 13 HP, Rock 49 HP, and no monitored legality or script-runtime violation had occurred.

## Checks applied throughout
- Entrances legal only on turns 1-2.
- Reactive-only pages never legal as ordinary plays.
- Damage Specials legal only with at least one compatible legal Move.
- Player and CPU use the same `legalReason` checks.
- Original-script runtime failures captured.
- Draw/search, Stun, counter, Autocounter, pin and 0-HP pin requirements observed through live logs.

## Validation
- `node --check app.js`: passed.
- All changed JSON: valid.
- Patch contains changed root files only.
