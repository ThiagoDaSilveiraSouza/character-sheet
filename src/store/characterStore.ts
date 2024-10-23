import { create } from 'zustand';
import { CharacterSheet } from '../types/characterSheet';
import { SpellsProps } from '../types/SpellsProps';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

interface CharacterStore {
  characters: CharacterSheet[];
  addCharacter: (character: Omit<CharacterSheet, 'id' | 'spells'>) => void;
  removeCharacter: (id: string) => void;
  updateCharacter: (character: CharacterSheet) => void;
  addSpellToCharacter: (characterId: string, spell: SpellsProps) => void;
  getCharacters: () => CharacterSheet[];
}

const STORAGE_KEY = 'characterSheets';

const defaultSkills = {
  Acrobacia: 0, Arcanismo: 0, Atletismo: 0, Atuação: 0, Blefar: 0, Furtividade: 0,
  História: 0, Intimidação: 0, Intuição: 0, Investigação: 0, "Lidar com Animais": 0,
  Medicina: 0, Natureza: 0, Percepção: 0, Persuasão: 0, Prestidigitação: 0, Religião: 0, Sobrevivência: 0
};

export const useCharacterStore = create<CharacterStore>()((set, get) => ({
  characters: getLocalStorage<CharacterSheet[]>(STORAGE_KEY, []),
  addCharacter: (character) =>
    set((state) => {
      const newCharacter = { 
        ...character, 
        id: Date.now().toString(), 
        spells: [],
        skills: defaultSkills
      };
      const newCharacters = [...state.characters, newCharacter];
      setLocalStorage(STORAGE_KEY, newCharacters);
      return { characters: newCharacters };
    }),
  removeCharacter: (id) =>
    set((state) => {
      const newCharacters = state.characters.filter((char) => char.id !== id);
      setLocalStorage(STORAGE_KEY, newCharacters);
      return { characters: newCharacters };
    }),
  updateCharacter: (updatedCharacter) =>
    set((state) => {
      const newCharacters = state.characters.map((char) =>
        char.id === updatedCharacter.id ? updatedCharacter : char
      );
      setLocalStorage(STORAGE_KEY, newCharacters);
      return { characters: newCharacters };
    }),
  addSpellToCharacter: (characterId, spell) =>
    set((state) => {
      const newCharacters = state.characters.map((char) =>
        char.id === characterId
          ? { ...char, spells: [...char.spells, spell] }
          : char
      );
      setLocalStorage(STORAGE_KEY, newCharacters);
      return { characters: newCharacters };
    }),
  getCharacters: () => get().characters,
}));
