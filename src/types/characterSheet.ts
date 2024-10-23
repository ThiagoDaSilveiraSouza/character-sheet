import { SpellsProps } from "./SpellsProps";

export interface CharacterSheet {
  id: string;
  name: string;
  class: string;
  level: number;
  background: string;
  race: string;
  alignment: string;
  experiencePoints: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  inspiration: number;
  proficiencyBonus: number;
  armorClass: number;
  initiative: number;
  speed: string;
  hitPointMaximum: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  hitDice: string;
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  featuresAndTraits: string;
  otherProficienciesAndLanguages: string;
  equipment: string;
  attacksAndSpellcasting: string;
  skills: {
    [key: string]: number;
  };
  spells: SpellsProps[];
}
