# Trenches: WW1 Tactics — Architecture

Turn-based WW1 tactics game for iOS. React Native + Expo (managed workflow), fully offline, no ads, no IAP.

- **App Store:** https://apps.apple.com/app/id6758896860 (bundle `com.trenches.ww1tactics`, Apple team `U9XRCK6Q6D`)
- **Repo:** https://github.com/StephenLear/trenches-ww1-tactics (public) — single source of truth
- **Local checkout:** `~/Projects/trenches-ww1-tactics`

## Where everything lives

| Thing | Location | Notes |
|---|---|---|
| Game source | this repo, `main` | Everything since 1.0.1 is committed here |
| EAS project | `@stephenlear1/trenches-ww1-tactics` (ID `02fef9d5-d764-48b7-8352-ba72cddfa5d5`) | Linked in `app.json` → `extra.eas.projectId` |
| Signing + ASC API key | Stored on EAS servers | `eas build` / `eas submit` need no local credentials |
| App Store listing | App Store Connect, app ID `6758896860` | Only English (U.S.) localization; UK store uses it |
| Support / privacy site | GitHub Pages from `docs/` → https://stephenlear.github.io/trenches-ww1-tactics/ | `docs/index.html`, `privacy-policy.html`, `support.html` |
| Marketing landing page | Vercel project `ww1-trenches-game` → https://ww1-trenches-game.vercel.app | Source: `~/ClaudeIdeas/landing-pages/ww1-trenches/index.html` (repo `StephenLear/claude-ideas`). Linked from Instagram and X bios |
| Store screenshot tooling | `store/compose.py` | Raw captures `store/raw/`, output `store/out/` (both git-ignored) |
| Store asset backups | `store/backup_1.0.1/` (local only) | The 10 screenshots live on 1.0.1 |
| Old working copies | `/Volumes/Steve backup/Dormant Projects/trenches-ww1-tactics` (real 1.0.1 source), `/Volumes/Steve backup/WW1TacticalGame` (older clone) | Archive only — do not build from these |
| Marketing video/art | `/Volumes/Steve backup/WW1 Trenches/` | Old AI-art preview videos, launch teasers |

## App structure

```
App.js                     → StatusBar + AppNavigator
src/
  navigation/              AppNavigator (native-stack), screenTransitions
  screens/                 20 screens (see flow below)
  components/              GridTile, UnitSprite, UnitInfoPanel, BattleLog, WeatherEffects, Tooltip, …
  game/                    Pure game logic and content (no React)
  audio/AudioManager.js    expo-av wrapper for music + SFX (assets/Audio/SFX)
  styles/                  colors.js (COLORS palette), commonStyles.js
  utils/logger.js
assets/                    icon.png (Pickelhaube, 1024²), splash, photos/ (22 historical photos)
plugins/withFmtCxx17.js    Expo config plugin — see Build
```

### Screen flow

```
Intro → LanguageSelect → Menu
Menu → CampaignMap → Briefing → Deployment → Battle → Victory | Defeat → Menu
Menu → Skirmish (any mission map) → Briefing → …
Menu → CommandHQ, Upgrades, WarDiary, Medals, Achievements, Statistics, Leaderboard, Memorial, Tutorial, Settings
```

### Game modules (`src/game/`)

| Module | Role |
|---|---|
| `missions.js` | 25 missions keyed by id: name, location, `date`, map, units, objectives, briefings, diary text |
| `constants.js` | `UNIT_TYPES` (infantry, machinegun, officer, scout, cavalry, tank, artillery, medic, sniper), terrain, weather, difficulty |
| `movement.js`, `combat.js`, `artillery.js`, `fogOfWar.js`, `morale.js`, `supplyLines.js`, `reinforcements.js`, `unitAbilities.js` | Battle rules |
| `progression.js`, `unitUpgrades.js`, `unitCustomisation.js`, `medals.js`, `achievements.js`, `leaderboards.js`, `battleStats.js` | Meta-progression |
| `diary.js`, `lettersHome.js`, `newspaperHeadlines.js`, `historicalFacts.js`, `historicalPhotos.js`, `unitBios.js`, `radioChatter.js` | Narrative content |
| `periodDates.js` | Dates newspapers/letters just after the mission's historical `date` |
| `storage.js` | AsyncStorage save/load (single save slot + save info) |

Game state (completed missions, veterans, medal stats, requisition points, faction, difficulty) is one JSON blob in AsyncStorage. `BattleScreen` writes `completedMissions` before navigating to `VictoryScreen`.

## Build and release

```bash
cd ~/Projects/trenches-ww1-tactics
eas build --platform ios --profile production   # builds on Expo servers, auto-increments buildNumber
eas submit --platform ios --profile production --latest   # uploads to App Store Connect / TestFlight
```

- **Versioning:** `app.json` → `expo.version` (marketing) and `expo.ios.buildNumber` (auto-incremented locally by EAS; commit the bump). Build numbers so far: 1.0.0 (2), 1.0.1 (2, 3), 1.0.2 (4 failed, 5, 6).
- **Xcode / SDK:** `eas.json` production uses `"image": "latest"` so builds use the iOS 26 SDK Apple requires.
- **`plugins/withFmtCxx17.js`:** React Native 0.76 ships `fmt` 11, which fails to compile on Xcode 26 (`consteval` errors). The plugin appends a Podfile `post_install` step that builds only the `fmt` pod as C++17. Remove it once the app moves to an Expo SDK / RN version that bundles a fixed `fmt`.
- **Native folders:** `ios/` and `android/` are git-ignored and must not exist in the checkout — EAS generates them (prebuild). If one appears locally (e.g. after `expo run:ios`), delete it.
- **Local simulator builds don't work on this Mac** (Xcode 27 SDK rejects the RN 0.76 pods). Test via TestFlight.

## Store assets

- Screenshots: 6.9" set (1290×2796) only; 6.5" slot is set to "Using 6.9" Display". iPad set is still Feb 2026 raw simulator shots.
- `store/compose.py` builds captioned screenshots from raw phone captures (Baskerville, dark `#0F0B08` → `#1A1410` gradient, khaki `#C8A96E`, cream `#F0E8D8`).
- App preview: `store/out/preview_886x1920_small.mp4` — 28 s gameplay cut from a phone screen recording (Apple requires captured app footage only).

## Known constraints

- React Native 0.76 / Expo SDK 52 is old; the fmt plugin is a workaround, not a fix. Plan an SDK upgrade before the next major feature.
- Newspapers must only use names of papers that no longer publish (trademark risk in store screenshots).
- No analytics or crash reporting in the app; App Store Connect is the only data source.
