# Audio Files Guide

## 📁 Required Audio Files

The AudioManager expects audio files in two directories:
- `src/audio/sounds/` - Sound effects (MP3 format)
- `src/audio/music/` - Background music (MP3 format)

---

## 🔊 Sound Effects (24 files)

### UI Sounds (4 files)
- `ui_click.mp3` - Button click sound
- `ui_select.mp3` - Selection/highlight sound
- `ui_back.mp3` - Back button sound
- `ui_error.mp3` - Error/invalid action sound

### Unit Actions (2 files)
- `unit_select.mp3` - Unit selection sound
- `unit_move.mp3` - Unit movement sound

### Combat Sounds (5 files)
- `attack_rifle.mp3` - Infantry rifle fire
- `attack_artillery.mp3` - Artillery/cannon blast
- `attack_melee.mp3` - Sword/melee attack
- `hit_impact.mp3` - Damage impact sound
- `unit_death.mp3` - Unit destroyed sound

### Special Abilities (3 files)
- `ability_heal.mp3` - Medic heal sound
- `ability_charge.mp3` - Cavalry charge sound
- `ability_barrage.mp3` - Artillery barrage sound

### Mission Events (5 files)
- `mission_start.mp3` - Battle begins sound
- `mission_complete.mp3` - Victory fanfare
- `mission_failed.mp3` - Defeat sound
- `turn_start.mp3` - Turn begins sound
- `turn_end.mp3` - Turn ends sound

### XP and Progression (3 files)
- `xp_gain.mp3` - Experience gained sound
- `rank_up.mp3` - Rank promotion sound
- `veteran_recruit.mp3` - Veteran recruited sound

---

## 🎵 Background Music (5 files)

- `menu_theme.mp3` - Main menu music (calm, heroic)
- `battle_theme.mp3` - Combat music (tense, dramatic)
- `victory_theme.mp3` - Victory screen music (triumphant)
- `defeat_theme.mp3` - Defeat screen music (somber)
- `command_hq_theme.mp3` - HQ menu music (strategic, planning)

---

## 🎼 Recommended Music Style

**WW1 Era Appropriate:**
- Military marches
- Orchestral pieces
- Period-appropriate instruments
- Somber, heroic tones

**Avoid:**
- Modern electronic music
- Rock/metal (too modern)
- Overly cheerful music (wrong tone)

---

## 📥 Where to Get Free Audio

### Sound Effects

**1. Freesound.org** (Best for game SFX)
- URL: https://freesound.org/
- License: Creative Commons
- Search terms: "gunshot", "explosion", "sword", "button click"
- **Recommended tags:**
  - UI: "button", "click", "select", "error beep"
  - Combat: "rifle shot", "cannon", "sword clang", "explosion"
  - Movement: "footsteps", "march"

**2. Zapsplat.com** (High quality, free with attribution)
- URL: https://www.zapsplat.com/
- License: Free with attribution
- Great for: UI sounds, impacts, military sounds

**3. Mixkit.co/free-sound-effects/** (No attribution required)
- URL: https://mixkit.co/free-sound-effects/
- License: Free, no attribution
- Categories: Game sounds, UI, impacts

### Background Music

**1. Incompetech.com** (Kevin MacLeod - very popular)
- URL: https://incompetech.com/music/royalty-free/
- License: Creative Commons (attribution required)
- Search: "march", "epic", "dramatic", "tense"
- **Recommended tracks:**
  - Menu: "Marching with Poise"
  - Battle: "Danse Macabre", "Suonatore di Liuto"
  - Victory: "Fanfare for Space"

**2. FreePD.com** (Public domain)
- URL: https://freepd.com/
- License: Public domain (no attribution needed!)
- Categories: Classical, Dramatic, Military

**3. Bensound.com** (Free with attribution)
- URL: https://www.bensound.com/
- License: Free with credit
- Great for: Cinematic, epic tracks

**4. YouTube Audio Library**
- URL: https://studio.youtube.com/ → Audio Library
- License: Most tracks are free, some require attribution
- Filters: Genre, Mood, Instrument

---

## 🛠️ Audio File Requirements

### Format
- **Format:** MP3 (best compatibility)
- **Alternative:** M4A/AAC also works on iOS

### Quality Settings
- **Bit rate:** 128-192 kbps (good quality, small size)
- **Sample rate:** 44.1 kHz (CD quality)
- **Channels:** Stereo for music, Mono ok for SFX

### File Size
- **Sound effects:** < 100 KB each (short clips)
- **Music:** < 3 MB each (2-3 minute loops)

### Length
- **Sound effects:** 0.5-2 seconds
- **Music:** 60-180 seconds (should loop seamlessly)

---

## 🎹 How to Edit Audio Files

### Free Audio Editors

**1. Audacity** (Desktop - Best option)
- URL: https://www.audacityteam.org/
- Features: Trim, fade, normalize, export to MP3
- Use for: Converting formats, trimming silence, adjusting volume

**2. Online Audio Cutter** (Web-based)
- URL: https://mp3cut.net/
- Features: Quick trim and fade
- Use for: Simple edits without installing software

### Common Edits Needed

**1. Trim Silence**
- Remove dead space at start/end
- Keeps file size small
- Makes sounds play instantly

**2. Normalize Volume**
- Make all sounds similar volume
- Prevents some sounds being too loud/quiet
- Effect → Normalize in Audacity

**3. Fade Out (Music)**
- Add fade out at end for smooth looping
- Effect → Fade Out in Audacity
- Apply to last 2-3 seconds

**4. Convert to MP3**
- File → Export → Export as MP3
- Choose 128-192 kbps quality

---

## 📝 Quick Start: Minimal Audio Setup

**Don't want to spend time on audio yet?** Here's a minimal setup:

### Option 1: Placeholder Silence (Testing)
Create silent MP3 files for now:
```bash
# Use any audio tool to create 1-second silent MP3s
# Name them according to the list above
# This lets you test without audio
```

### Option 2: Essential Sounds Only (10 minutes)
Grab these 5 files to get started:
1. `ui_click.mp3` - Any button click sound
2. `attack_rifle.mp3` - Gunshot sound
3. `hit_impact.mp3` - Thud/impact sound
4. `mission_complete.mp3` - Success/fanfare
5. `battle_theme.mp3` - Any dramatic music

This gives you enough to test audio integration!

### Option 3: Sound Packs (Fastest)
Search for "WW1 game sound pack" or "military game sounds pack"
- Often bundled collections
- Already themed correctly
- May cost $5-20 but saves hours

---

## 📋 Attribution Requirements

If using Creative Commons music, add credits to your app:

**In-game Credits Screen:**
```
Music by Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/

Sound Effects from Freesound.org
[List specific authors if required]
```

**Alternative:** Purchase license to remove attribution requirement

---

## 🎯 Recommended Collection

Here's a curated list of specific tracks to search for:

### Sound Effects
- **UI Click:** "Button Click" by Eponn (Freesound)
- **Rifle:** "Rifle Shot" by michorvath (Freesound)
- **Artillery:** "Cannon Fire" by qubodup (Freesound)
- **Impact:** "Punch Impact" by xtrgamr (Freesound)

### Music
- **Menu:** "Marching with Poise" - Kevin MacLeod
- **Battle:** "Suonatore di Liuto" - Kevin MacLeod
- **Victory:** "Fanfare for Space" - Kevin MacLeod
- **Defeat:** "The Descent" - Kevin MacLeod

---

## ⚙️ Installing Audio Files

Once you have your audio files:

1. **Place in correct folders:**
   ```
   src/audio/sounds/ui_click.mp3
   src/audio/sounds/attack_rifle.mp3
   ...
   src/audio/music/menu_theme.mp3
   ...
   ```

2. **Verify filenames match** AudioManager.js exactly

3. **Test audio:**
   ```javascript
   import { playSFX, playMusic } from './audio/AudioManager';

   // Test sound effect
   playSFX('ui_click');

   // Test music
   playMusic('menu');
   ```

4. **Adjust volumes** in Settings screen if too loud/quiet

---

## 🐛 Troubleshooting

### Sound doesn't play
- Check filename matches AudioManager.js exactly
- Verify file is MP3 format
- Check iOS device is not in silent mode
- Enable sound in Settings screen

### Sound is too loud/quiet
- Normalize all files to similar volume in Audacity
- Adjust volume sliders in Settings screen
- Use `volumeMultiplier` parameter in playSFX()

### Music doesn't loop smoothly
- Add fade out to end of track
- Ensure start and end are silence-free
- Test loop point in audio editor

### File too large
- Reduce bitrate to 128 kbps
- Trim unnecessary silence
- Shorten music to 90-120 seconds

---

## ✅ Audio Setup Checklist

- [ ] Downloaded 24 sound effects
- [ ] Downloaded 5 music tracks
- [ ] Edited files (trim, normalize, fade)
- [ ] Converted to MP3 format
- [ ] Placed in correct folders
- [ ] Verified filenames match AudioManager.js
- [ ] Tested in app
- [ ] Adjusted volumes
- [ ] Added attribution if needed

---

**Estimated time to complete:** 1-3 hours (depending on experience)

**Alternative:** Skip audio for now, add later. The game works fine without it!
