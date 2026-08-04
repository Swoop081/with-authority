# v0.9.167 Submission Hand Visibility

The continued-submission draw was already adding a page to the defender's hand, but
the match renderer hid the entire hand whenever a submission was active.

Fixed:
- the player's full hand remains visible during a submission;
- the newly drawn card is named in the submission panel and match log;
- the drawn page appears in the hand before the escape decision;
- normal card play remains locked while trapped in the hold;
- Counter, Special and Autocounter escapes continue through the dedicated button.
