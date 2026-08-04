# v0.9.149 Pin and Submission Runtime Certification

- Runtime tests: **11/11 passed**
- Submission-class/runtime submission pages inventoried: **50**
- JavaScript syntax: **PASS**

## Defects corrected

- Submission phases now advance the match turn counter.
- Active holds can no longer bypass the configured turn limit.
- A turn-limit draw clears active hold and pin-pending state.
- CPU submission logic evaluates legal Moves in the post-release Grounded state.
- CPU releases a hold when a materially stronger legal non-submission Move is available.

## Certified scenarios

- **PASS — Pin HP brackets**
- **PASS — Failed pin transfers control**
- **PASS — Zero HP pin succeeds**
- **PASS — Pin special GetAShoulderUp.gac**
- **PASS — Pin special GrabTheRope.gac**
- **PASS — Pin special HeyRefThatWasThree.gac**
- **PASS — Submission damage persists and increments**
- **PASS — Voluntary submission release**
- **PASS — Pin kickout respects turn limit**
- **PASS — Submission entry respects turn limit**
- **PASS — CPU releases for stronger legal move**

## Scope note

These are deterministic engine state-transition tests. Real iPhone touch timing and every individual card combination still require device play, and are not represented as completed here.
