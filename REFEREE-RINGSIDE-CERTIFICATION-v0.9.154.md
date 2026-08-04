# v0.9.154 Referee, Ringside and Location Certification

## Fixed

- Turns-at-location now increase only while the wrestler is actually at Ringside.
- Returning to the ring resets the Ringside counter.
- Scripted `RefDistracted` game-map state is now recognised by pin, count-out and
  warning checks, not only visually named persistent cards.
- Single and double count-outs now use complete match-ending cleanup.
- Turn-limit draws use the same non-victory cleanup.
- A rejected Move Outside action releases the iPhone input lock.
- Original `WAMove` scripts now use the same location setter as manual actions.
- Original `WAWarn` scripts continue through the shared warning, referee and DQ system.

## Inventory

- 41 referee-related cards/scripts
- 153 location-related cards/scripts
- 63 warning-related cards/scripts

JavaScript syntax validation: PASS.
