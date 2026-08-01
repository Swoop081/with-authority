With Authority Mobile v0.9.55

Consolidated mobile UI fixes and opponent-selection repair.
WITH AUTHORITY! MOBILE v0.9.53

FINAL PRESERVATION AUDIT + HOME-SCREEN ICON
- Added original-branding Apple touch icon and PWA icons (180, 192, 512, 1024).
- Added Final Preservation Report in the main menu.
- Updated offline cache to include icons and audit data.
- Preserved all existing cards, starter decks, roster, rules, boosters, missions, tutorials, saves, and offline support.

Mobile QA, Offline Reliability & Save Recovery pass.

Preserves the full offline reconstruction from v0.9.50, including 35 original Superstars, 65 authentic starter variants, 907 runtime card records, fixed Lead Off hands, original missions, tutorials, booster rewards and collection progression.

Added:
- installable/offline PWA service worker
- runtime caching for card artwork and data after first use
- automatic previous-save backup before each local save
- restore previous local save option
- safer imported-save validation
- system diagnostics screen
- runtime error capture
- updated v0.9.51 manifest and export filename

Audio and all original online/store systems remain excluded.
GitHub Pages root structure and .nojekyll are preserved.

v0.9.53 integrates recoverable original offline logos, page backs, ring presentation, metallic menu styling, result branding and an in-game branding audit. Online and store-only interface branding remain intentionally excluded.


v0.9.54 restores 63 recoverable original audio assets. Mobile browsers require a user tap before playback. Music and sound effects can be controlled separately in Settings.


v0.9.59: submission loop repair, original-style portrait HUD and crowd, card flip, swipe play/ditch, dynamic hand ordering, contextual actions, full-screen card resolution.

v0.9.61: fixed missing momentumIcons match-start crash; added launch-time version.json update check and versioned cache replacement.


v0.9.65 AI Recommended Deck Engine
- Multiple finisher paths per Superstar
- Complete Collection target and Owned Cards builds
- Up to five copies per card
- Full authentic booster/fixed-product candidate pool
- Starter Deck remains exact and unchanged


v0.9.66: Replaced broad AI decks with strict Finisher-path optimization; separated competitive and catalogue showcase decks; added candidate and matchup validation metadata.


v0.9.69 structural cleanup:
- consolidated duplicate screen functions
- retained one authoritative renderer per screen
- restored full-art starter flip cards
- corrected diagnostics and version metadata
- expanded startup offline cache
- marked obsolete simulation wording as historical


v0.9.70 match HUD cleanup:
- Removed the match title/control header.
- Added compact two-digit Momentum counters and larger wrestler portraits.
- Moved the active-turn badge onto the active wrestler.
- Added an in-match gear menu for sound, music, match log and quitting.


v0.9.78: Corrected Superstar artwork resolver to require Superstar-class source mappings; fixed Ric Flair, Kevin Nash, Trish Stratus and Scotty 2 Hotty roster art.


v0.9.78 changes:
- Removed universal Recover Page action from player match controls.
- Removed CPU automatic generic discard recovery.
- Card and Superstar effects that explicitly recover pages remain supported.
- Replaced PWA/iPhone home-screen icons with the approved With Authority Mobile orange-burst logo.
