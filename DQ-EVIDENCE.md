# Warnings and Disqualification Evidence — v0.9.128-rules-core

## Direct original evidence

Extracted from the original `WAMain.dll`:

> Whenever you get DQ points you have a 5 × #DQ Points percent chance of being disqualified from the game and losing the match. This check is made only in a match that supports Disqualification and if your DQ Point total is greater than or equal to 5.

Extracted from original page files in `WAFull(1).zip`:

- `DQWarning.gac`: once a Superstar has 5 or more Warnings, there is a 5% chance per Warning of being disqualified.
- `DistractTheReferee.gac`: distracted referees do not give Warnings, count pins, or accept submissions.
- `RefereeMikeChioda.gac`: Superstars cannot be disqualified unless they have 9 Warnings; the script raises `WarningThreshold` by 4 while the page is in play.
- `RefereeNickPatrick.gac`: if a Superstar ends a turn with more than 5 Warnings, the referee gives them 10 more.
- `GoodOfficiating.gac`: the first time an opponent receives Warnings each turn, they receive 4 more if a Referee is in play.
- `GeneralManagerEricBischoff.gac`: no Warnings can be given while its effect is active.
- Illegal pages such as `LowBlow.gac`, `ChairShot.gac`, and `Table.gac` specify their exact Warning amounts in their printed text/scripts.

## Important correction

The prior audit incorrectly labelled the `Warnings × 5%` formula as fabricated. Direct evidence from `WAMain.dll` proves that formula is authentic. The problem in the recreation was not that formula itself; it was the incomplete handling of thresholds, match support, referee distraction, and referee/effect modifiers.

## Implemented

- Default DQ threshold: 5 Warnings.
- Referee Mike Chioda threshold: 9 Warnings.
- DQ chance on each Warning gain at or above threshold: exactly 5% × current Warnings.
- No DQ check in a match that does not support disqualification.
- Distracted referee prevents Warnings.
- General Manager Eric Bischoff prevents Warnings.
- Good Officiating adds 4 Warnings only the first time the affected wrestler receives Warnings during that turn and only with a Referee in play.
- Referee Nick Patrick adds 10 Warnings when a wrestler ends a turn above 5.
- Card-specific Warning amounts continue to come from printed page text or explicit page handling.

## Still outside this phase

- Full scripted lifecycle for every Referee page.
- Every card-specific exception and reset.
- Count-out rules.
- Match-type selection beyond the current Standard match.
