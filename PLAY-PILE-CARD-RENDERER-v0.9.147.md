# v0.9.147 Play Pile Card Renderer

The play pile no longer uses its separate compressed front/back renderer. It now uses the same `originalPageCard`, `originalPageFlip`, `originalPageFront`, and `originalPageBack` structure as cards in the live hand.

- Front artwork and printed bars match the hand card.
- Back text and metadata match the hand card.
- iOS uses explicit face switching, preventing mirrored text.
- Result status and flip hint remain overlays and do not alter either card face.
