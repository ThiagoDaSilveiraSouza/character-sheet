import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { CharacterSheet } from '../../../types/characterSheet';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 1em;
`;

const Select = styled.select`
  padding: 5px;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
`;

const classes = [
  "Bárbaro",
  "Bardo",
  "Bruxo",
  "Clérigo",
  "Druida",
  "Feiticeiro",
  "Guerreiro",
  "Ladino",
  "Mago",
  "Monge",
  "Paladino",
  "Patrulheiro"
];

const defaultSkills = {
  Acrobacia: 0, Arcanismo: 0, Atletismo: 0, Atuação: 0, Blefar: 0, Furtividade: 0,
  História: 0, Intimidação: 0, Intuição: 0, Investigação: 0, "Lidar com Animais": 0,
  Medicina: 0, Natureza: 0, Percepção: 0, Persuasão: 0, Prestidigitação: 0, Religião: 0, Sobrevivência: 0
};

interface CreateCharacterFormProps {
  onSubmit: (character: Omit<CharacterSheet, 'id' | 'spells'>) => void;
  onCancel: () => void;
}

export const CreateCharacterForm: React.FC<CreateCharacterFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [level, setLevel] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter: Omit<CharacterSheet, 'id' | 'spells'> = {
      name,
      class: characterClass,
      level,
      background: '',
      race: '',
      alignment: '',
      experiencePoints: 0,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      inspiration: 0,
      proficiencyBonus: 2,
      armorClass: 10,
      initiative: 0,
      speed: '30 ft',
      hitPointMaximum: 10,
      currentHitPoints: 10,
      temporaryHitPoints: 0,
      hitDice: `1d${characterClass === 'Mago' ? '6' : '8'}`,
      personalityTraits: '',
      ideals: '',
      bonds: '',
      flaws: '',
      featuresAndTraits: '',
      otherProficienciesAndLanguages: '',
      equipment: '',
      attacksAndSpellcasting: '',
      skills: defaultSkills,
    };
    onSubmit(newCharacter);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input 
        type="text" 
        placeholder="Nome do Personagem" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <Select 
        value={characterClass} 
        onChange={(e) => setCharacterClass(e.target.value)} 
        required
      >
        <option value="">Selecione uma classe</option>
        {classes.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>
      <Input 
        type="number" 
        placeholder="Nível" 
        value={level} 
        onChange={(e) => setLevel(Number(e.target.value))} 
        min={1} 
        max={20} 
        required 
      />
      <Button type="submit">Criar Personagem</Button>
      <Button type="button" onClick={onCancel}>Cancelar</Button>
    </Form>
  );
};
