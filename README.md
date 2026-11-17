# Facebook Friends Feed

Adds a Friends feed shortcut beside Home in Facebook’s desktop navigation.

## Privacy policy

Public URL: https://phong-lu.github.io/friends-feed/

The buildless privacy page is in `docs/index.html`. GitHub Pages serves the `docs/` directory on `main`. Paste the public URL into the Chrome Web Store Privacy policy URL field after deployment.

To preview locally, run `python -m http.server 8000 --directory docs` and open http://localhost:8000. No build, package installation, or lint toolchain is needed for this static page. Review policy statements whenever extension data handling changes.

## Extension source and verification

Chrome source is in `src/chrome/`; Firefox source is in `src/firefox/`. See their README files for installation and manual browser checks.

Run `powershell -NoProfile -File tests/check-browser-parity.ps1` to check shared extension source parity.
