# Original Script Live Integration — v0.9.134

All 1,559 scripts parse and execute in the coverage harness. The live engine now dispatches the principal gameplay lifecycle hooks.

## Direct live hooks
- `Can_Be_Played`
- `Begin_Game`
- `Begin_Refresh`
- `End_Refresh`
- `Stunned`
- `Begin_Move`
- `Damage_Bonus`
- `Move_Countered`
- `Begin_Counter`
- `No_Counter_Played`
- `End_Move`
- `Can_Submit`
- `Can_Warn`
- `Attempt_Pin`
- `Out_Of_Play`
- `Control_Changed`
- `Page_Played`
- `Move_Connected`

## Context-specific hooks retained in interpreter
- `AI_AutoCounter`
- `AI_AutoDitch`
- `AI_PinTarget`
- `AI_PlayPage`
- `AI_UseSpecial`
- `Affect_Auto_Counter`
- `Can_Auto_Counter`
- `Can_Move`
- `Can_Pin`
- `Can_Stun`
- `Get_Page_List`
- `Give_Additional_Momentum`
- `Prevent_Damage`
- `Prevent_Submission_Damage`
- `Special_Special`

These remaining hooks are invoked by original scripts through the adapter or require a specific AI/UI decision context; they are not replaced with guessed outcomes.
