# v0.9.136 Match Start Hotfix

Fixed the Safari runtime error `Can't find variable: cardMethodName`.

- Exposes the helper explicitly as `window.cardMethodName`.
- Keeps a local alias for same-file calls.
- Cache-busts all three JavaScript files and the stylesheet.
- Adds both interpreter JavaScript files to the service-worker core cache.
- Advances the service-worker cache name so stale v0.9.135 files cannot be mixed with the hotfix.
