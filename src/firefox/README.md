# Facebook Friends Feed — Firefox

Adds a people icon immediately after Home in Facebook's desktop navigation. Click it to open `https://www.facebook.com/?filter=friends&sk=h_chr`.

## Install for development

1. Open `about:debugging#/runtime/this-firefox` in Firefox 140 or newer.
2. Click **Load Temporary Add-on**.
3. Select `manifest.json` inside this `src/firefox` folder.
4. Refresh an open Facebook tab, or open `https://www.facebook.com/`.

Temporary add-ons are removed when Firefox restarts. Persistent installation in standard Firefox requires packaging and signing through Mozilla Add-ons.

No build, dependencies, background service, or remote code is required. The extension collects no data. Facebook controls the behavior of the friends filter.

## Verify changes

Reload the add-on and refresh Facebook after editing files. Check that the icon appears once after Home, opens the filtered feed, survives navigation between Facebook pages, and works with keyboard Tab/Enter. Check light and dark themes. The shortcut requires Facebook's desktop navigation; layout changes may require updating the selectors in `content.js`.

The JavaScript and CSS are identical to the Chrome version. Keep both copies synchronized when making changes.

Run `powershell -NoProfile -File tests/check-browser-parity.ps1` from the repository root to check that both browsers have matching versions, content script configuration, scripts, styles, and active icons. Browser-specific Firefox settings are allowed. This checks source parity; use the manual checks above to verify Facebook in each browser.
