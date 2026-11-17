# Repository Guidelines

## Project Structure & Module Organization

This repository currently contains no application code, tests, assets, or build configuration. As the project is initialized, keep application source in `src/`, automated tests in `tests/`, and static assets in `assets/` when those directories suit the chosen framework. Group related modules by feature and document any framework-specific layout in `README.md`.

## Build, Test, and Development Commands

No build, test, or development commands are configured yet. When introducing a toolchain, add reproducible commands to the project manifest and document them in `README.md`. Include commands for local development, production builds, tests, and linting. For example, a Node.js setup could expose `npm run dev`, `npm run build`, `npm test`, and `npm run lint`; these are proposed names, not currently available commands.

## Coding Style & Naming Conventions

Follow the conventions of the selected language and framework. Configure a formatter and linter early, and commit their configuration so contributors use consistent indentation and formatting. Use descriptive names, match filenames to their primary module or component, and keep naming consistent within each directory. Avoid unrelated formatting changes in functional patches.

## Testing Guidelines

No testing framework or coverage threshold is established. Add tests alongside new behavior once a framework is selected. Use descriptive test names that explain the expected outcome, and follow that framework’s file conventions. Cover normal behavior, important edge cases, and regressions. Document the exact test command and any required setup before expecting contributors to run it.

## Commit & Pull Request Guidelines

No Git history is available to establish an existing commit convention. Use concise, imperative commit subjects, such as `Add feed filtering`, and keep each commit focused. Pull requests should describe the change, explain its purpose, link relevant issues, and report validation performed. Include screenshots for visible interface changes and identify any setup or migration steps.

## Security & Configuration

Keep secrets and local credentials out of version control. When configuration is introduced, provide an example environment file with placeholder values and document required variables.
