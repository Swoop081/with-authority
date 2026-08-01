# With Authority Mobile v0.9.93 — Content, AI and UI Pass

## Requested areas completed

### 2. Card-effect verification

- **914 runtime cards** classified across draw, ditch, recovery, stun, pin, submission, Momentum, Attitude, position, damage, search and ongoing-effect families.
- **914/914** have explicit effect metadata.
- Complex timing/choice language remains identified for deterministic in-browser tests; metadata completeness is not being misrepresented as executable-perfect proof.

### 5. Superstar edition and starter verification

- **24 distinct multi-edition Superstar entries** checked.
- All exact edition source cards were found.
- All linked starter packages were found.
- All edition artwork files were found.
- Edition artwork, ability text and starter links remain separate rather than collapsing wrestlers by base identity.

### 6. Unresolved starter sources

A broad filename/source pass found no new complete packages for Rey Mysterio, Shane McMahon, Brock Lesnar, Shawn Michaels or Scott Hall.

- Rey's `Starter-ReyMysterioLE.gap` is still referenced but absent.
- Shane remains tied to Hardcore Trio material without a complete fixed starter.
- Brock and Shawn remain Official Product Builds from SummerSlam 2002.
- Scott Hall remains an Official Product Build from the WrestleMania X8 collection.

No reconstructed deck is relabelled as an exact recovered starter.

### 7. Original mission decoding

- **7 campaign source files** inspected at binary level.
- They share the proprietary `1OAG` container signature and high-entropy encoded/compressed data.
- No safe plain-text objective or deck extraction was possible.
- Mission0–Mission4 remain preserved and locked rather than having invented content added.
- The three previously decoded Original AI Challenges remain playable.

### 9. AI Recommended runtime validation

- **54/54 selectable Superstar versions** have an unlocked recommendation.
- Every source recommendation resolves.
- Every page ID in those recommendations resolves to a runtime card.
- Deck size and method/Finisher presentation data are available to the UI.

### 10. AI deck presentation

The Choose Playbook screen now shows each recommendation in an original-style steel/red panel with:

- availability status
- Finisher path
- primary methods
- strategy
- deck size
- owned/unlocked status
- View Pages and Use Deck controls

### 11. Original-style UI consistency

- Added stronger red-header, dark-steel and silver-border treatment to the playbook flow.
- Reduced verbose technical wording in normal player-facing screens.
- Campaign archive wording now clearly explains why source files remain locked.

### 12. Mobile and accessibility pass

- Safe-area padding retained for installed iPhone PWAs.
- Minimum search/touch control heights reinforced.
- Keyboard focus styling verified.
- AI deck facts collapse to a single column on narrow phones.
- Landscape-height handling added for compact displays.
- All **52** discovered click-handler functions resolve; no missing routes or duplicate function declarations were found.

## Current result

- Automated checks passed: **10**
- Automated failures: **0**
- Preservation warnings: **2**, both expected and explicitly labelled:
  1. five exact starter packages remain unresolved;
  2. the recovered campaign remains encoded.

## Still requiring direct device testing

- Long-card text and flipped-card scrolling on the smallest iPhones
- Very large match hands
- Gesture conflicts with Safari navigation
- Offline first launch after installation
- Service-worker upgrade from v0.9.92
- Audio resumption after backgrounding the PWA
