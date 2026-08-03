# v0.9.144 Turn Limit Fix

The old engine checked the limit only after drawing a page and incrementing into the
next turn. At a 50-turn limit, Turn 50 appeared to do nothing and the result was not
resolved until Turn 51 was attempted.

The check now happens at the very start of `beginTurn`, before:

- location counters advance;
- refresh effects run;
- a page is drawn;
- the round increments;
- CPU actions are scheduled.

Therefore, after Turn 50 is completed, the attempted transition to a new turn ends the
match immediately as a draw and Turn 51 never starts.
