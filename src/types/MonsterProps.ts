export type MonsterProps = {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  armor_class: {
    type: string;
    value: number;
  }[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: {
    walk: string;
    swim?: string;
  };
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: {
    value: number;
    proficiency: {
      index: string;
      name: string;
      url: string;
    };
  }[];
  damage_vulnerabilities: string[];
  damage_resistances: string[];
  damage_immunities: string[];
  condition_immunities: string[];
  senses: {
    darkvision: string;
    passive_perception: number;
  };
  languages: string;
  challenge_rating: number;
  proficiency_bonus: number;
  xp: number;
  special_abilities: {
    name: string;
    desc: string;
    dc?: {
      dc_type: {
        index: string;
        name: string;
        url: string;
      };
      dc_value: number;
      success_type: string;
    };
  }[];
  actions: {
    name: string;
    desc: string;
    multiattack_type?: string;
    actions?: {
      action_name: string;
      count: number;
      type: string;
    }[];
    attack_bonus?: number;
    dc?: {
      dc_type: {
        index: string;
        name: string;
        url: string;
      };
      dc_value: number;
      success_type: string;
    };
    damage?: {
      damage_type: {
        index: string;
        name: string;
        url: string;
      };
      damage_dice: string;
    }[];
  }[];
  legendary_actions: {
    name: string;
    desc: string;
    attack_bonus?: number;
    damage?: {
      damage_type: {
        index: string;
        name: string;
        url: string;
      };
      damage_dice: string;
    }[];
  }[];
  image: string;
  url: string;
};
