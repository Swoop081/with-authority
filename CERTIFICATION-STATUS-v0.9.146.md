# v0.9.146 Current Certification Status

## Corrected and verified

- Replaced all remaining live `cardClass === "Move"` assumptions whose original rule refers to a Move Page.
- Move Pages now consistently include standard Moves, Submissions, and Trademarks.
- Corrected Got All Of It!, He’s Calling For It, Break EX2, Bounce Off The Ropes, High Spot, Booker T — Can You Dig It?, Tazz — Change The Mood, The Hurricane — Super Powers, X-Pac — Martial Arts Pro, and successful-move triggers.
- 1,559 of 1,559 recovered original scripts execute without interpreter failure.
- All 70 authentic starters retain their protected opening five.
- Every starter entry maps to a live runtime card.
- JavaScript syntax validation passed.

## Not falsely certified

The container’s headless Chromium process timed out during the browser startup attempt. Therefore this report does not claim that every ordered full match has completed in a real browser. The build includes the corrected engine and test accessors needed for that browser matrix, but the matrix remains a separate runtime/device certification requirement.
