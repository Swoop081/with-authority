# Authentic Ringside and Count-out Rules — v0.9.139

Directly extracted from the original `Ring.gah`, `ThrowOverTheRopes.gac`,
`MoveToRingside.gac`, and original Referee scripts in `WAFull(1).zip`.

## Original count-out rule

At Ringside, at the beginning of a move opportunity:

- the Superstar in control must have spent at least 5 turns at Ringside;
- the referee must not be distracted;
- `RefNoCountOut` must not be active;
- the original game rolls 1–100;
- a roll of 50 or higher disqualifies the Superstars currently at Ringside;
- a lower roll produces the referee warning to get back into the ring.

Referee Jimmy Korderas prevents count-outs until the affected Superstar has been at
Ringside for at least 7 turns. The original script does this through `RefNoCountOut`.
Other original cards such as General Manager Eric Bischoff and Referee Earl Hebner use
the same flag and are honoured by the original script interpreter.

## Take It Inside

When in control at Ringside, not in a submission, and the turn's Special action has not
been used:

- the Superstar may Take It Inside;
- this uses the turn's Special action;
- if the opponent is also at Ringside, both return to the ring and the opponent is put
  on the mat;
- otherwise only the acting Superstar returns.

## Move Outside

When in control in the ring and another Superstar is at Ringside:

- the Superstar may Move Outside;
- this uses the turn's Special action.

## Separate states

Ring location and body position are separate. A Superstar may be standing or grounded
at either InTheRing or Ringside.
