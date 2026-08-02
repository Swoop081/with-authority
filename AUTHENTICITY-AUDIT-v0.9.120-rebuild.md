# With Authority! Mobile — Authenticity Audit

## Build

v0.9.120-rebuild, based directly on the user-confirmed working v0.9.119 package.

## Proven fabricated rules removed

The shared successful-move resolver previously applied these rules to every connected move:

1. Attacker gained `1 + card.momentumGain` Attitude.
2. Defender automatically lost 1 Attitude.

Neither change came from an explicit page effect or Superstar ability. Both have been removed globally. This affects every Superstar and every move, not only Austin and The Rock.

A connected move now changes Attitude only when an explicit original page field, recovered original script, verified Superstar ability, pin rule, or other separately verified rule instructs it to do so.

## Permanent method Momentum

Playing a Momentum page adds its printed method Momentum. That value remains and is not spent when a move is attempted or connected. It may only be reduced by an explicit page or ability effect.

## Hard-coded mechanics still requiring original-game proof

The following systems exist in v0.9.119 source but are not certified as authentic merely because they run. They must be compared with the original game/rulebook before being described as exact:

- Pin probability formula and its health/Momentum/finisher weighting.
- Automatic Attitude awarded after a kick-out.
- Warning-based random disqualification probability.
- Time-limit decision tiebreak order and final random tiebreak.
- AI Autocounter acceptance probabilities.
- Random choices used when an original effect requires a player choice.
- CPU submission-release valuation.
- Text-derived body-part assignment when a page lacks explicit recovered zone data.
- Any `damageBonus` or random-duration field not directly traceable to original data.
- Generic card-text parsing used to infer persistent durations or submission behaviour.

These items have not been silently removed in this patch because some may be authentic. They are now explicitly classified as **unverified**, not certified.

## Policy for future fixes

Every gameplay rule must be traceable to one of:

1. recovered original executable/page script;
2. original rulebook or official documentation;
3. repeatable observation in the original game supplied by the user.

Unverified behaviour must remain labelled unverified and may not be presented as an exact recreation.
