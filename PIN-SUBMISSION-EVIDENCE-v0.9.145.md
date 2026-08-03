# v0.9.145 Pin and Submission Certification

## Pin formula recovered from WAMain.dll

The original executable calculates:

`PinScore = 2 × (pinner remaining Total Momentum − defender Total Momentum)
          + HP bracket score
          + 20 if the last connected Move was a Finisher`

HP bracket score:

- above 85% HP: 0
- 50–85%: 20
- 25–49%: 40
- 10–24%: 60
- 1–9%: 80
- 0 HP: 100 / automatic pin

The executable then fires `Affect_Pin_Score`, rolls 1–100 once, and the pin succeeds when
the roll is less than or equal to PinScore.

Pin attempt cost remains 0, 1, 2, 3... Attitude based on prior attempts.

## Pin Specials

Implemented from original card text/scripts:

- Get a Shoulder Up: pin fails; defender gains control; twice per match.
- That Was Three!: pin fails; defender gains control; original Event restrictions.
- Grab The Ropes: draw one page; pin fails; pinner remains in control and cannot pin
  again until another Move is played.

## Submissions

- Submission points persist by Head, Arm, Leg, and Back for the whole match.
- First-turn successful submission damage is recorded immediately.
- Continued hold damage adds persistent submission points and HP/body-part damage.
- Tap-out occurs when any persistent submission body-part total is above current HP.
- Original `Damage_Bonus`, `Prevent_Submission_Damage`,
  `Submission_Hold_Applied`, and `No_Counter_Played` hooks fire at the correct stages.
- Original `WABreakHold` flag now determines whether the defender or attacker keeps control.
