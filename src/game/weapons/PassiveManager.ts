import type { Player } from '../entities/Player';

export type PassiveId =
  | 'spinach' | 'armor' | 'hollow_heart' | 'pummarola' | 'empty_tome'
  | 'candelabrador' | 'bracer' | 'spellbinder' | 'duplicator' | 'wings'
  | 'attractorb' | 'clover' | 'crown' | 'stone_mask' | 'skull'
  | 'silver_ring' | 'gold_ring' | 'metaglio_left' | 'metaglio_right' | 'tiragisu';

export interface PassiveInfo {
  id: PassiveId;
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  maxLevel: number;
  stat: string;
  valuePerLevel: number;
  isPercentage: boolean;
}

export const PassiveInfoList: PassiveInfo[] = [
  { id: 'spinach', name: 'Spinach', nameKo: '시금치', description: '+10% Damage', descriptionKo: '데미지 +10%', maxLevel: 5, stat: 'damage', valuePerLevel: 0.1, isPercentage: true },
  { id: 'armor', name: 'Armor', nameKo: '갑옷', description: '+1 Armor', descriptionKo: '방어력 +1', maxLevel: 5, stat: 'armor', valuePerLevel: 1, isPercentage: false },
  { id: 'hollow_heart', name: 'Hollow Heart', nameKo: '빈 심장', description: '+20% Max HP', descriptionKo: '최대 HP +20%', maxLevel: 5, stat: 'maxHp', valuePerLevel: 0.2, isPercentage: true },
  { id: 'pummarola', name: 'Pummarola', nameKo: '푸마롤라', description: '+0.2 HP/s', descriptionKo: 'HP 회복 +0.2/초', maxLevel: 5, stat: 'hpRegen', valuePerLevel: 0.2, isPercentage: false },
  { id: 'empty_tome', name: 'Empty Tome', nameKo: '빈 책', description: '-8% Cooldown', descriptionKo: '쿨다운 -8%', maxLevel: 5, stat: 'cooldown', valuePerLevel: 0.08, isPercentage: true },
  { id: 'candelabrador', name: 'Candelabrador', nameKo: '촛대', description: '+10% Area', descriptionKo: '범위 +10%', maxLevel: 5, stat: 'area', valuePerLevel: 0.1, isPercentage: true },
  { id: 'bracer', name: 'Bracer', nameKo: '팔찌', description: '+10% Projectile Speed', descriptionKo: '투사체 속도 +10%', maxLevel: 5, stat: 'speed', valuePerLevel: 0.1, isPercentage: true },
  { id: 'spellbinder', name: 'Spellbinder', nameKo: '주문 바인더', description: '+10% Duration', descriptionKo: '지속시간 +10%', maxLevel: 5, stat: 'duration', valuePerLevel: 0.1, isPercentage: true },
  { id: 'duplicator', name: 'Duplicator', nameKo: '복제기', description: '+1 Projectile', descriptionKo: '투사체 +1', maxLevel: 2, stat: 'amount', valuePerLevel: 1, isPercentage: false },
  { id: 'wings', name: 'Wings', nameKo: '날개', description: '+10% Move Speed', descriptionKo: '이동속도 +10%', maxLevel: 5, stat: 'moveSpeed', valuePerLevel: 0.1, isPercentage: true },
  { id: 'attractorb', name: 'Attractorb', nameKo: '자석 구슬', description: '+50% Pickup Range', descriptionKo: '수집 범위 +50%', maxLevel: 5, stat: 'magnet', valuePerLevel: 0.5, isPercentage: true },
  { id: 'clover', name: 'Clover', nameKo: '클로버', description: '+10% Luck', descriptionKo: '행운 +10%', maxLevel: 5, stat: 'luck', valuePerLevel: 0.1, isPercentage: true },
  { id: 'crown', name: 'Crown', nameKo: '왕관', description: '+8% XP Gain', descriptionKo: '경험치 획득 +8%', maxLevel: 5, stat: 'growth', valuePerLevel: 0.08, isPercentage: true },
  { id: 'stone_mask', name: 'Stone Mask', nameKo: '돌 가면', description: '+10% Greed', descriptionKo: '탐욕 +10%', maxLevel: 5, stat: 'greed', valuePerLevel: 0.1, isPercentage: true },
  { id: 'skull', name: "Skull O'Maniac", nameKo: '해골', description: '+10% Enemy Curse', descriptionKo: '적 저주 +10%', maxLevel: 5, stat: 'curse', valuePerLevel: 0.1, isPercentage: true },
  { id: 'silver_ring', name: 'Silver Ring', nameKo: '은반지', description: '+5% Crit Chance', descriptionKo: '치명타 확률 +5%', maxLevel: 5, stat: 'critChance', valuePerLevel: 0.05, isPercentage: true },
  { id: 'gold_ring', name: 'Gold Ring', nameKo: '금반지', description: '+20% Crit Damage', descriptionKo: '치명타 데미지 +20%', maxLevel: 5, stat: 'critDamage', valuePerLevel: 0.2, isPercentage: true },
  { id: 'metaglio_left', name: 'Metaglio Left', nameKo: '왼쪽 메탈리오', description: 'HP Recovery Conversion', descriptionKo: 'HP 회복 변환', maxLevel: 1, stat: 'special', valuePerLevel: 0, isPercentage: false },
  { id: 'metaglio_right', name: 'Metaglio Right', nameKo: '오른쪽 메탈리오', description: 'Revival', descriptionKo: '부활', maxLevel: 1, stat: 'revival', valuePerLevel: 1, isPercentage: false },
  { id: 'tiragisu', name: 'Tiragisu', nameKo: '티라기수', description: '+1 Revival', descriptionKo: '부활 +1', maxLevel: 2, stat: 'revival', valuePerLevel: 1, isPercentage: false },
];

export class PassiveManager {
  private player: Player;
  private passives: Map<PassiveId, number> = new Map();
  private maxPassives: number = 6;

  constructor(player: Player) {
    this.player = player;
  }

  addPassive(id: PassiveId): boolean {
    if (this.passives.has(id)) {
      return this.upgradePassive(id);
    }

    if (this.passives.size >= this.maxPassives) {
      return false;
    }

    const info = PassiveInfoList.find((p) => p.id === id);
    if (!info) return false;

    this.passives.set(id, 1);
    this.applyPassiveEffect(info, 1);
    return true;
  }

  upgradePassive(id: PassiveId): boolean {
    const currentLevel = this.passives.get(id);
    if (currentLevel === undefined) return false;

    const info = PassiveInfoList.find((p) => p.id === id);
    if (!info) return false;

    if (currentLevel >= info.maxLevel) return false;

    const newLevel = currentLevel + 1;
    this.passives.set(id, newLevel);
    this.applyPassiveEffect(info, 1); // Apply one more level
    return true;
  }

  private applyPassiveEffect(info: PassiveInfo, levels: number): void {
    const totalValue = info.valuePerLevel * levels;
    this.player.applyStat(info.stat, totalValue, info.isPercentage);
  }

  hasPassive(id: PassiveId): boolean {
    return this.passives.has(id);
  }

  getPassiveLevel(id: PassiveId): number {
    return this.passives.get(id) ?? 0;
  }

  isMaxLevel(id: PassiveId): boolean {
    const level = this.passives.get(id);
    if (level === undefined) return false;

    const info = PassiveInfoList.find((p) => p.id === id);
    return info ? level >= info.maxLevel : false;
  }

  getPassiveCount(): number {
    return this.passives.size;
  }

  getActivePassives(): Array<{ id: PassiveId; level: number; maxLevel: number }> {
    const result: Array<{ id: PassiveId; level: number; maxLevel: number }> = [];

    this.passives.forEach((level, id) => {
      const info = PassiveInfoList.find((p) => p.id === id);
      if (info) {
        result.push({ id, level, maxLevel: info.maxLevel });
      }
    });

    return result;
  }

  getAvailablePassives(): PassiveId[] {
    return PassiveInfoList
      .filter((p) => !this.passives.has(p.id))
      .map((p) => p.id);
  }
}
