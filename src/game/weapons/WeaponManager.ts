import type { GameScene } from '../scenes/GameScene';
import type { Player } from '../entities/Player';
import { WeaponBase } from './WeaponBase';

// Import all weapons - Child-friendly theme (학용품/자연)
import { Banana } from './weapons/Banana';
import { Acorn } from './weapons/Acorn';
import { Pencil } from './weapons/Pencil';
import { PaperPlane } from './weapons/PaperPlane';
import { Marble } from './weapons/Marble';
import { Snowball } from './weapons/Snowball';
import { Leaf } from './weapons/Leaf';
import { Ruler } from './weapons/Ruler';
import { Eraser } from './weapons/Eraser';
import { Crayon } from './weapons/Crayon';
import { LunchBox } from './weapons/LunchBox';
import { Bubble } from './weapons/Bubble';
import { WaterBalloon } from './weapons/WaterBalloon';
import { Hamster } from './weapons/Hamster';
import { Butterfly } from './weapons/Butterfly';
import { RobotToy } from './weapons/RobotToy';
import { Rainbow } from './weapons/Rainbow';
import { Star } from './weapons/Star';
import { Magnet } from './weapons/Magnet';
import { MagnifyingGlass } from './weapons/MagnifyingGlass';

// Import passives
import { PassiveManager } from './PassiveManager';
import type { PassiveId } from './PassiveManager';

export type WeaponId =
  | 'banana' | 'acorn' | 'pencil' | 'paper_plane' | 'marble'
  | 'snowball' | 'leaf' | 'ruler' | 'eraser' | 'crayon'
  | 'lunch_box' | 'bubble' | 'water_balloon' | 'hamster' | 'butterfly'
  | 'robot_toy' | 'rainbow' | 'star' | 'magnet' | 'magnifying_glass';

export type WeaponCategory = 'ranged' | 'melee' | 'companion' | 'special';

export interface WeaponInfo {
  id: WeaponId;
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  maxLevel: number;
  category: WeaponCategory;
  evolutionPair?: string;
  evolvedForm?: string;
}

const WeaponRegistry: Record<WeaponId, new (scene: GameScene, player: Player) => WeaponBase> = {
  banana: Banana,
  acorn: Acorn,
  pencil: Pencil,
  paper_plane: PaperPlane,
  marble: Marble,
  snowball: Snowball,
  leaf: Leaf,
  ruler: Ruler,
  eraser: Eraser,
  crayon: Crayon,
  lunch_box: LunchBox,
  bubble: Bubble,
  water_balloon: WaterBalloon,
  hamster: Hamster,
  butterfly: Butterfly,
  robot_toy: RobotToy,
  rainbow: Rainbow,
  star: Star,
  magnet: Magnet,
  magnifying_glass: MagnifyingGlass,
};

export const WeaponInfoList: WeaponInfo[] = [
  // 원거리 무기 (Ranged) - 1~7
  { id: 'banana', name: 'Banana', nameKo: '바나나', description: 'Boomerang banana that returns', descriptionKo: '돌아오는 바나나 부메랑', maxLevel: 8, category: 'ranged' },
  { id: 'acorn', name: 'Acorn', nameKo: '도토리', description: 'Bouncing acorns', descriptionKo: '튕기는 도토리', maxLevel: 8, category: 'ranged' },
  { id: 'pencil', name: 'Pencil', nameKo: '연필', description: 'Fast straight shots', descriptionKo: '빠른 직선 공격', maxLevel: 8, category: 'ranged' },
  { id: 'paper_plane', name: 'Paper Plane', nameKo: '종이비행기', description: 'Homing paper planes', descriptionKo: '유도하는 종이비행기', maxLevel: 8, category: 'ranged' },
  { id: 'marble', name: 'Marble', nameKo: '구슬', description: 'Bounces off walls', descriptionKo: '벽에 반사되는 구슬', maxLevel: 8, category: 'ranged' },
  { id: 'snowball', name: 'Snowball', nameKo: '눈덩이', description: 'Slows enemies', descriptionKo: '적을 느리게 만드는 눈덩이', maxLevel: 8, category: 'ranged' },
  { id: 'leaf', name: 'Leaf', nameKo: '나뭇잎', description: 'Drifting leaf projectile', descriptionKo: '바람에 흔들리는 나뭇잎', maxLevel: 8, category: 'ranged' },
  // 근접/범위 무기 (Melee/Area) - 8~13
  { id: 'ruler', name: 'Banana Shooter', nameKo: '바나나 발사기', description: 'Auto-targets nearby enemies', descriptionKo: '주변 적을 자동 조준해 발사', maxLevel: 8, category: 'ranged' },
  { id: 'eraser', name: 'Eraser', nameKo: '지우개', description: 'Erases enemies in area', descriptionKo: '범위 내 적을 지우는 지우개', maxLevel: 8, category: 'melee' },
  { id: 'crayon', name: 'Crayon', nameKo: '크레파스', description: 'Draws rainbow damage', descriptionKo: '무지개 선을 그리는 크레파스', maxLevel: 8, category: 'melee' },
  { id: 'lunch_box', name: 'Lunch Box', nameKo: '도시락', description: 'Explosive area damage', descriptionKo: '폭발하는 도시락', maxLevel: 8, category: 'melee' },
  { id: 'bubble', name: 'Bubble', nameKo: '비눗방울', description: 'Orbiting bubbles', descriptionKo: '주위를 도는 비눗방울', maxLevel: 8, category: 'melee' },
  { id: 'water_balloon', name: 'Water Balloon', nameKo: '물풍선', description: 'Splash damage on impact', descriptionKo: '터지면 튀는 물풍선', maxLevel: 8, category: 'melee' },
  // 보조/동료 무기 (Companion) - 14~16
  { id: 'hamster', name: 'Hamster', nameKo: '햄스터', description: 'Spinning hamster friend', descriptionKo: '회전하는 햄스터 친구', maxLevel: 8, category: 'companion' },
  { id: 'butterfly', name: 'Butterfly', nameKo: '나비', description: 'Homing butterfly attack', descriptionKo: '유도하는 나비 공격', maxLevel: 8, category: 'companion' },
  { id: 'robot_toy', name: 'Robot Toy', nameKo: '로봇 장난감', description: 'Auto-attacking robot', descriptionKo: '자동으로 공격하는 로봇', maxLevel: 8, category: 'companion' },
  // 특수 무기 (Special) - 17~20
  { id: 'rainbow', name: 'Rainbow', nameKo: '무지개', description: 'Rainbow wave attack', descriptionKo: '무지개 파동 공격', maxLevel: 8, category: 'special' },
  { id: 'star', name: 'Star', nameKo: '별', description: 'Random lightning strikes', descriptionKo: '무작위 별똥별 공격', maxLevel: 8, category: 'special' },
  { id: 'magnet', name: 'Magnet', nameKo: '자석', description: 'Pulls and damages enemies', descriptionKo: '적을 끌어당겨 공격', maxLevel: 8, category: 'special' },
  { id: 'magnifying_glass', name: 'Magnifying Glass', nameKo: '돋보기', description: 'Focus sunlight to burn enemies', descriptionKo: '햇빛을 모아 적을 태우는 공격', maxLevel: 8, category: 'special' },
];

export class WeaponManager {
  private scene: GameScene;
  private player: Player;
  private weapons: Map<WeaponId, WeaponBase> = new Map();
  private passiveManager: PassiveManager;
  private maxWeapons: number = 6;

  constructor(scene: GameScene, player: Player) {
    this.scene = scene;
    this.player = player;
    this.passiveManager = new PassiveManager(player);
  }

  update(delta: number): void {
    this.weapons.forEach((weapon) => {
      weapon.update(delta);
    });
  }

  addWeapon(id: WeaponId): boolean {
    if (this.weapons.has(id)) {
      return this.upgradeWeapon(id);
    }

    if (this.weapons.size >= this.maxWeapons) {
      return false;
    }

    const WeaponClass = WeaponRegistry[id];
    if (!WeaponClass) {
      console.warn(`Weapon ${id} not found in registry`);
      return false;
    }

    const weapon = new WeaponClass(this.scene, this.player);
    this.weapons.set(id, weapon);
    return true;
  }

  upgradeWeapon(id: WeaponId): boolean {
    const weapon = this.weapons.get(id);
    if (!weapon) return false;

    if (weapon.isMaxLevel()) return false;

    weapon.upgrade();
    return true;
  }

  hasWeapon(id: WeaponId): boolean {
    return this.weapons.has(id);
  }

  getWeapon(id: WeaponId): WeaponBase | undefined {
    return this.weapons.get(id);
  }

  getWeaponCount(): number {
    return this.weapons.size;
  }

  getActiveWeapons(): WeaponBase[] {
    return Array.from(this.weapons.values());
  }

  // Passive management
  addPassive(id: PassiveId): boolean {
    return this.passiveManager.addPassive(id);
  }

  upgradePassive(id: PassiveId): boolean {
    return this.passiveManager.upgradePassive(id);
  }

  hasPassive(id: PassiveId): boolean {
    return this.passiveManager.hasPassive(id);
  }

  getPassiveCount(): number {
    return this.passiveManager.getPassiveCount();
  }

  // Evolution check
  checkEvolutions(): { weaponId: WeaponId; passiveId: PassiveId; resultId: string }[] {
    const available: { weaponId: WeaponId; passiveId: PassiveId; resultId: string }[] = [];

    this.weapons.forEach((weapon, id) => {
      if (weapon.canEvolve()) {
        const passiveId = weapon.getInfo().evolutionPair as PassiveId;
        if (this.passiveManager.hasPassive(passiveId) && this.passiveManager.isMaxLevel(passiveId)) {
          const info = WeaponInfoList.find(w => w.id === id);
          if (info?.evolvedForm) {
            available.push({
              weaponId: id,
              passiveId,
              resultId: info.evolvedForm,
            });
          }
        }
      }
    });

    return available;
  }

  evolveWeapon(weaponId: WeaponId): boolean {
    const weapon = this.weapons.get(weaponId);
    if (!weapon || !weapon.canEvolve()) return false;

    weapon.evolve();
    return true;
  }

  // Maximum weapons before stopping new weapon choices
  private maxWeaponChoices: number = 8;

  // Get available upgrades for level up
  // Rules: 1 upgrade + 2 new weapons. After 8 weapons, only upgrades.
  getAvailableUpgrades(count: number = 3): Array<{ type: 'weapon' | 'passive'; id: string; isNew: boolean; isEvolution?: boolean }> {
    const result: Array<{ type: 'weapon' | 'passive'; id: string; isNew: boolean; isEvolution?: boolean }> = [];

    // Check evolutions first (highest priority - always include if available)
    const evolutions = this.checkEvolutions();
    if (evolutions.length > 0) {
      const evo = evolutions[Math.floor(Math.random() * evolutions.length)];
      result.push({
        type: 'weapon',
        id: evo.weaponId,
        isNew: false,
        isEvolution: true,
      });
    }

    // Collect upgrade options (existing weapons/passives that can be upgraded)
    const upgradeOptions: Array<{ type: 'weapon' | 'passive'; id: string }> = [];

    this.weapons.forEach((weapon, id) => {
      if (!weapon.isMaxLevel() && !evolutions.find(e => e.weaponId === id)) {
        upgradeOptions.push({ type: 'weapon', id });
      }
    });

    this.passiveManager.getActivePassives().forEach(({ id, level, maxLevel }) => {
      if (level < maxLevel) {
        upgradeOptions.push({ type: 'passive', id });
      }
    });

    // Shuffle upgrade options for variety
    this.shuffleArray(upgradeOptions);

    // Collect new weapon/passive options
    const newOptions: Array<{ type: 'weapon' | 'passive'; id: string }> = [];

    // Only add new weapons if we have less than 8 weapons AND have weapon slots available
    const totalWeapons = this.weapons.size;
    if (totalWeapons < this.maxWeaponChoices && totalWeapons < this.maxWeapons) {
      const availableWeapons = WeaponInfoList.filter((w) => !this.weapons.has(w.id));
      availableWeapons.forEach((w) => {
        newOptions.push({ type: 'weapon', id: w.id });
      });
    }

    // Add new passives if slots available
    if (this.passiveManager.getPassiveCount() < 6) {
      const availablePassives = this.passiveManager.getAvailablePassives();
      availablePassives.forEach((p) => {
        newOptions.push({ type: 'passive', id: p });
      });
    }

    // Shuffle new options for variety
    this.shuffleArray(newOptions);

    // Build the result: 1 upgrade + 2 new choices (if available)
    // If we already have 8+ weapons, only show upgrades
    const hasReachedWeaponLimit = totalWeapons >= this.maxWeaponChoices;

    if (hasReachedWeaponLimit) {
      // Only upgrades after 8 weapons
      while (result.length < count && upgradeOptions.length > 0) {
        const opt = upgradeOptions.shift()!;
        result.push({ type: opt.type, id: opt.id, isNew: false });
      }
    } else {
      // Normal case: 1 upgrade + 2 new choices
      // Add 1 upgrade (if available and not already filled by evolution)
      if (result.length < 1 && upgradeOptions.length > 0) {
        const opt = upgradeOptions.shift()!;
        result.push({ type: opt.type, id: opt.id, isNew: false });
      }

      // Add 2 new choices (if available)
      let newCount = 0;
      while (newCount < 2 && newOptions.length > 0 && result.length < count) {
        const opt = newOptions.shift()!;
        result.push({ type: opt.type, id: opt.id, isNew: true });
        newCount++;
      }

      // Fill remaining slots with upgrades if we don't have enough new options
      while (result.length < count && upgradeOptions.length > 0) {
        const opt = upgradeOptions.shift()!;
        result.push({ type: opt.type, id: opt.id, isNew: false });
      }

      // If still not enough, add more new options
      while (result.length < count && newOptions.length > 0) {
        const opt = newOptions.shift()!;
        result.push({ type: opt.type, id: opt.id, isNew: true });
      }
    }

    return result;
  }

  // Fisher-Yates shuffle for better randomization
  private shuffleArray<T>(array: T[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
