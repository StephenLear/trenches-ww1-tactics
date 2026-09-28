# Trenches: WW1 Tactics — project rules

Read first: `ARCHITECTURE.md` (where everything lives), `CHANGELOG.md`, and the newest `handoffs/HANDOVER-*.md`.

- **This repo is the only source.** Before release work, check it matches the live App Store build: icon, `version`, `buildNumber`, and `eas build:list`. Commit and push after every store build.
- **Build with EAS only:** `eas build --platform ios --profile production`, then `eas submit --platform ios --profile production --latest`. Commit the `buildNumber` bump. No local Xcode/simulator builds on this Mac: they break on RN 0.76 and slow the laptop down.
- **`ios/` and `android/` must not exist in the checkout.** EAS generates them.
- **Screenshots and recordings** come from Stephen's phone. `store/compose.py` turns captures into 1290×2796 store images.
- **App Store Connect media:** upload one file at a time, and don't navigate away until each appears. Previews can take hours to process.
- **Git:** read `git status` before committing and add paths by name. The repo is public.
- **Content:** real battles, fictional people. Only use newspaper names of papers that no longer publish. Missions must match their historical dates.
