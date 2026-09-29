# Changelog

All notable changes to Trenches: WW1 Tactics. Dates are App Store Connect / build dates.

## [1.0.2] — approved 2026-09-29, automatic release (build 6)

### Added
- App Store rating prompt after the 2nd, 5th and 10th mission won (`expo-store-review`, iOS rate-limits it).
- `periodDates.js`: shared helper for period-accurate dates.

### Changed
- Newspapers and letters home are dated 1–5 days after the mission's historical date, with the correct weekday (previously a random 1914–18 date).
- Newspaper names: removed papers that still publish (Daily Mail, The Times, Telegraph, Guardian, Evening Standard, Le Figaro, L'Humanité, NYT, Washington Post, Chicago Tribune, Boston Globe, Stars and Stripes). Replaced with closed wartime papers; German and American players now get papers from their own nation.
- Victory screen survival percentage uses a readable green (`#6abf4b`).

### Fixed
- iOS build on Xcode 26: `plugins/withFmtCxx17.js` compiles the `fmt` pod as C++17.
- App icon restored to the live 1.0.1 icon (Pickelhaube in clouds) — the repo had the older February icon.

### Store listing (1.0.2 draft)
- New screenshots 1–3 from real gameplay (Battle, Briefing, Victory) + snow battle; dropped 3 old shots.
- Removed both AI-art preview videos. A 28 s gameplay preview was made (`store/out/preview_886x1920_small.mp4`) but pulled because Apple's processing blocked submission; add it in 1.0.3.
- What's New text added.

### Marketing (alongside 1.0.2)
- Vercel landing page rewritten from a pre-launch "Pre-Register" page to an accurate "out now" page with App Store links; fake email form removed.
- Instagram: name, bio and link order updated; 10 AI-avatar videos archived; gameplay Reel posted and 3 posts pinned (2026-09-29).

### Repo / infrastructure
- Repo re-linked to EAS project; `ascAppId` set for `eas submit`; EAS image `latest`.
- `ios/`, `android/`, store working folders git-ignored.
- Website (`docs/`), README and metadata now say 25 missions.

## [1.0.1] — 2026-03-02 (build 3)
- New app icon (Pickelhaube in clouds).
- Updated App Store screenshots and marketing assets.
- Source was never pushed; recovered from `Steve backup/Dormant Projects/trenches-ww1-tactics` on 2026-09-28 (only the icon and config differed from `main`).

## [1.0.0] — 2026-02-23 (build 2)
- Initial release: 25 missions, 4 nations, 9 unit types, weather, skirmish mode, war diary, letters home, newspapers, medals, undo.
