# Authentic Attitude Rule — v0.9.124-rebuild

## Direct original evidence

Extracted from the original `WAMain.dll` in `WAFull(1).zip`:

> You gain 1 Attitude Momentum whenever you hit your opponent with a Move Page.
> You lose 1 Attitude Momentum whenever your opponent hits YOU with a Move Page.

## Implemented rule

After a Move Page successfully hits:

- attacker gains exactly 1 Attitude;
- defender loses exactly 1 Attitude, to a minimum of 0;
- the card's `momentumGain` field is not used to calculate this global change;
- damage amount does not alter the Attitude change;
- a failed or countered Move does not trigger this successful-hit rule.

This applies to every Superstar and every Move Page.
