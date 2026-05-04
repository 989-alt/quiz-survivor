# Survivor Quiz Brawl - Design Assets Checklist

## 🎮 Player Character
| Asset | Size | Description | Status |
|-------|------|-------------|--------|
| player_idle | 32x32 | Default standing pose | 🟡 Placeholder |
| player_walk_1-4 | 32x32 | Walking animation frames | ❌ Needed |
| player_hurt | 32x32 | Damage taken flash | ❌ Needed |
| player_dead | 32x32 | Death animation | ❌ Needed |

## 👾 Monsters
| Asset | Size | Description | Status |
|-------|------|-------------|--------|
| monster_basic | 24x24 | Common enemy (slime-like) | 🟡 Placeholder |
| monster_fast | 20x20 | Fast small enemy | 🟡 Placeholder |
| monster_tank | 32x32 | Large slow enemy | 🟡 Placeholder |
| monster_boss | 48x48 | Boss enemy | 🟡 Placeholder |
| monster_flying | 24x24 | Aerial enemy | ❌ Needed |
| monster_ranged | 24x24 | Enemy that shoots | ❌ Needed |

## ⚔️ 무기 (20종) - 아이 친화적 학용품/자연 테마

### 투사체 무기 (Projectile)
| ID | 에셋명 | 크기 | 설명 | 상태 |
|----|--------|------|------|------|
| banana | weapon_banana | 24x16 | 바나나 부메랑 (돌아옴) | ❌ 필요 |
| acorn | weapon_acorn | 12x12 | 도토리 (튕김) | ❌ 필요 |
| pencil | weapon_pencil | 20x6 | 연필 (빠른 직선) | ❌ 필요 |
| paper_plane | weapon_paper_plane | 24x16 | 종이비행기 (유도) | ❌ 필요 |
| marble | weapon_marble | 12x12 | 구슬 (벽 반사) | ❌ 필요 |
| snowball | weapon_snowball | 16x16 | 눈덩이 (둔화) | ❌ 필요 |
| leaf | weapon_leaf | 16x16 | 나뭇잎 (바람타고) | ❌ 필요 |

### 근접/범위 무기 (Melee/Area)
| ID | 에셋명 | 크기 | 설명 | 상태 |
|----|--------|------|------|------|
| ruler | weapon_ruler | 64x12 | 자 (휘두르기) | ❌ 필요 |
| eraser | weapon_eraser | 48x48 | 지우개 (범위 소멸) | ❌ 필요 |
| crayon | weapon_crayon | 48x16 | 크레파스 (무지개 선) | ❌ 필요 |
| lunch_box | weapon_lunch_box | 40x40 | 도시락 (폭발 범위) | ❌ 필요 |
| bubble | weapon_bubble | 32x32 | 비눗방울 (회전) | ❌ 필요 |
| water_balloon | weapon_water_balloon | 24x24 | 물풍선 (스플래시) | ❌ 필요 |

### 소환/동료 무기 (Companion)
| ID | 에셋명 | 크기 | 설명 | 상태 |
|----|--------|------|------|------|
| hamster | weapon_hamster | 20x20 | 햄스터 친구 (회전) | ❌ 필요 |
| butterfly | weapon_butterfly | 16x16 | 나비 (유도공격) | ❌ 필요 |
| robot_toy | weapon_robot | 24x24 | 장난감 로봇 (자동) | ❌ 필요 |

### 특수 무기 (Special)
| ID | 에셋명 | 크기 | 설명 | 상태 |
|----|--------|------|------|------|
| rainbow | weapon_rainbow | 80x32 | 무지개 파동 | ❌ 필요 |
| star | weapon_star | 24x24 | 별 (랜덤 타격) | ❌ 필요 |
| magnet | weapon_magnet | 24x24 | 자석 (끌어당김) | ❌ 필요 |

## 💎 Collectibles
| Asset | Size | Description | Status |
|-------|------|-------------|--------|
| xp_gem_small | 12x12 | Small XP (1-5) | 🟡 Placeholder |
| xp_gem_medium | 16x16 | Medium XP (10-25) | ❌ Needed |
| xp_gem_large | 20x20 | Large XP (50+) | ❌ Needed |
| health_pickup | 16x16 | HP restore | ❌ Needed |
| magnet_pickup | 16x16 | Attract all gems | ❌ Needed |
| chest | 24x24 | Bonus chest | ❌ Needed |

## 🎨 UI Elements
| Asset | Size | Description | Status |
|-------|------|-------------|--------|
| hp_bar_frame | 120x16 | Health bar container | ✅ CSS |
| hp_bar_fill | varies | Health fill (green/yellow/red) | ✅ CSS |
| xp_bar_frame | 120x16 | XP bar container | ✅ CSS |
| xp_bar_fill | varies | XP fill (blue/purple) | ✅ CSS |
| button_primary | varies | Main action button | ✅ CSS |
| button_secondary | varies | Secondary button | ✅ CSS |
| card_upgrade | varies | Upgrade selection card | ✅ CSS |
| badge_rarity | varies | Rarity indicators | ✅ CSS |
| icon_dot_cluster | 32x32 | Dot pattern decorations | ✅ CSS |

## 🖼️ Backgrounds
| Asset | Size | Description | Status |
|-------|------|-------------|--------|
| bg_game_tile | 64x64 | Repeating game background | 🟡 Generated |
| bg_menu | 1920x1080 | Menu background | ✅ CSS Gradient |
| bg_dot_grid | pattern | Dot grid pattern | ✅ CSS |

## ✨ Effects
| Asset | Frames | Description | Status |
|-------|--------|-------------|--------|
| effect_hit | 4 | Damage impact | ❌ Needed |
| effect_levelup | 8 | Level up celebration | ❌ Needed |
| effect_heal | 4 | Healing sparkle | ❌ Needed |
| effect_death | 6 | Monster death poof | ❌ Needed |
| effect_collect | 3 | Gem collection | ❌ Needed |

## 📊 Quiz UI
| Asset | Size | Description | Status |
|-------|------|-------------|--------|
| quiz_overlay_bg | full | Semi-transparent backdrop | ✅ CSS |
| quiz_timer | 48x48 | Countdown timer display | ✅ CSS |
| quiz_option_a | varies | Option A button | ✅ CSS |
| quiz_option_b | varies | Option B button | ✅ CSS |
| quiz_option_c | varies | Option C button | ✅ CSS |
| quiz_option_d | varies | Option D button | ✅ CSS |
| quiz_correct | 64x64 | Correct answer indicator | ✅ CSS |
| quiz_wrong | 64x64 | Wrong answer indicator | ✅ CSS |

## 🔊 Audio (Future)
| Asset | Type | Description | Status |
|-------|------|-------------|--------|
| bgm_menu | Music | Menu background music | ❌ Needed |
| bgm_game | Music | Gameplay music | ❌ Needed |
| sfx_hit | SFX | Weapon hit sound | ❌ Needed |
| sfx_levelup | SFX | Level up sound | ❌ Needed |
| sfx_quiz_correct | SFX | Correct answer | ❌ Needed |
| sfx_quiz_wrong | SFX | Wrong answer | ❌ Needed |
| sfx_gem_collect | SFX | Gem pickup | ❌ Needed |

---

## Legend
- ✅ Complete
- 🟡 Placeholder (functional but needs polish)
- ❌ Needed (not yet implemented)

## Recommended Art Style
- **Resolution**: 32x32 base, pixel art style
- **Color Palette**: Limited palette (16-32 colors)
- **Animation**: 4-8 frames per animation
- **Theme**: Cute/friendly educational game aesthetic
- **Format**: PNG with transparency

## Priority Order
1. Player animations
2. Fun weapons (banana, acorn, pencil, eraser)
3. Monster variety
4. Collectibles
5. Effects
6. Audio
