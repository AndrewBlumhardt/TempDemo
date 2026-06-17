# First Five Game Concepts

This is the planning pass for the first five games. Each one should be built as its own prompted development effort, with its own loop, scoring model, pacing, visual language, and failure state.

## 1. Catacomb Relay

- Genre: dungeon crawler
- Core idea: navigate a shifting mini-dungeon, collect keys, and choose between safe rooms and greedy routes
- Character: a lantern-bearer with a visible inventory belt
- Scoring: points for relics, bonus for exiting with unused time, penalty for trapped detours
- Mechanics: room-by-room movement, fog of war, door locks, inventory-based shortcuts
- Feel: tense exploration with occasional risk/reward decisions
- Unique presentation: top-down stone rooms, warm lantern glow, narrow corridors, small HUD with inventory slots

## 2. Roofline Sprint

- Genre: jumping / platform speed game
- Core idea: race across rooftops, timing jumps, vaults, and wall kicks to reach checkpoints
- Character: a courier with a cape and momentum-based animation
- Scoring: speed bonus, combo bonus for clean jumps, penalty for falls and hesitation
- Mechanics: jump timing, moving platforms, slide under obstacles, rooftop gaps
- Feel: fast, readable, arcadey, with rhythm and acceleration
- Unique presentation: side-scrolling skyline, dynamic camera, pace meter, checkpoint banners

## 3. Switchback Chase

- Genre: speed-run escape game
- Core idea: stay ahead of an enemy convoy while taking branching shortcuts through a city route
- Character: a runner with a chase meter and route choice prompts
- Scoring: distance survived, shortcut bonus, near-miss bonus, penalty for taking wrong turns
- Mechanics: branch selection, chase pressure, roadblock avoidance, stamina meter
- Feel: stressful but readable, more about route planning than raw reflexes
- Unique presentation: overhead road map, forked paths, warning signs, animated pursuit line

## 4. Arena of Echoes

- Genre: survival arena
- Core idea: hold a circular arena against escalating enemy waves while choosing between attack styles
- Character: a fighter with one primary move and one special move tied to cooldown
- Scoring: wave score, crowd bonus, streak bonus, survival multiplier over time
- Mechanics: wave spawning, knockback, weapon pickup, cooldown management
- Feel: compact, aggressive, and tactical under pressure
- Unique presentation: enclosed arena, bright combat telegraphs, score ticker, wave banners

## 5. Glyph Logic

- Genre: puzzle / pattern game
- Core idea: rotate and place rune tiles to complete patterns before the board fills up
- Character: a puzzle artisan or archivist, not a combat avatar
- Scoring: pattern completions, chain bonuses, clean board bonus, penalty for wasted placements
- Mechanics: tile rotation, adjacency matching, limited move buffer, escalating pattern demands
- Feel: deliberate and cerebral, completely different from the action games above
- Unique presentation: flat table layout, soft ink-and-paper style, calm UI, no action camera

## Design Rule For The First Five

- Do not reuse the same scoring formula across games.
- Do not reuse the same control scheme unless the genre genuinely needs it.
- Do not reuse the same visual framing or HUD structure.
- Treat each title like a separate requested game, not like a variant of a template.

## Suggested Build Order

1. Catacomb Relay
2. Roofline Sprint
3. Switchback Chase
4. Arena of Echoes
5. Glyph Logic

## Review Goal

After the first five are built, review them for:

- distinctness of play loop
- distinctness of scoring
- distinctness of visual identity
- whether each feels like an authored mini-game instead of a reskin
- whether the browser index presents them clearly as separate projects