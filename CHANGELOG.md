# Changelog

## Unreleased

- Add `SettingsPage` at `src/pages/SettingsPage.jsx` and route `/settings`.
- Protect `/admin` route using `ProtectedRoute` and lazy-load `AdminDashboard`.
- Add `ConfirmationModal` usage to `DemoControls` to confirm clearing `khuta_users` in localStorage before reload.
- Add `useLocalStorageState` hook and persist users list in `AdminDashboard`. 