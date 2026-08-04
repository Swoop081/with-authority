# v0.9.156 Card Collection Fix

The Card Collection screen was blank because it called a missing `filterCards`
function. The renderer is restored.

- All catalogue pages render again.
- Booster-owned cards sort first.
- Each owned card displays its saved copy count.
- Unowned cards remain visible for reference.
- Search and card-class filters work.
- Older saved collection keys migrate to the current canonical card ID.
- Booster results and the Card Collection use the same collection-count lookup.
