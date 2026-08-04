# v0.9.151 Counter and Autocounter Certification

## Corrected

- Counter candidates are restricted to legal Move Pages, including Submissions and Trademarks.
- When the player has multiple legal counters, a chooser shows every valid option with cost and damage.
- CPU counter choice uses the same legal option set.
- A countered incoming Move deals no damage and cannot create its submission hold or Finisher pin bonus.
- Once the counter chain ends, the final counter Move now resolves its own printed damage, position, submission, connected effects, Attitude changes, draw, and control exactly once.
- Recounters use the same matching and legality rules, to a maximum chain depth of three counters.
- Autocounter payment must equal the required point value exactly. Pages with special values, including Will To Win, are counted correctly.
- CPU Autocounter selection now finds an exact legal subset and cannot overpay.

## Audit

- 280 counter-capable Move Pages audited.
- Move: 245; Submission: 11; Trademark: 24.
- 21 distinct printed counter targets represented.
- JavaScript syntax validation passed.
