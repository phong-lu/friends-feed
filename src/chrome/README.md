# Facebook Friends Feed — Chrome

Adds a people icon immediately after Home in Facebook's desktop navigation. Click it to open `https://www.facebook.com/?filter=friends&sk=h_chr`.

## Install

1. Open `chrome://extensions` and enable **Developer mode**.
2. Click **Load unpacked** and select this `src/chrome` folder.
3. Refresh an open Facebook tab, or open `https://www.facebook.com/`.

No build, dependencies, background service, or remote code is required. The content script runs only on Facebook. Facebook controls the behavior of the friends filter.

## Verify changes

Reload the extension and refresh Facebook after editing files. Check that the icon appears once after Home, opens the filtered feed, survives navigation between Facebook pages, and works with keyboard Tab/Enter. Check light and dark themes. The shortcut requires Facebook's desktop navigation; layout changes may require updating the selectors in `content.js`.

Run `powershell -NoProfile -File tests/check-browser-parity.ps1` from the repository root to verify shared functionality and active assets remain synchronized with Firefox. This checks source parity; browser behavior still requires the manual checks above.
