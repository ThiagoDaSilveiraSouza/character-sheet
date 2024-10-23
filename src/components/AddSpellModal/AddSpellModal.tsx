import React, { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { useCharacterStore } from '../../store/characterStore';
import { SpellsProps } from '../../types';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${theme.colors.text.primary};
`;

const ModalTitle = styled.h2`
  color: ${theme.colors.text.secondary};
`;

const Select = styled.select`
  padding: 5px;
  font-size: ${theme.fontSizes.medium};
  color: ${theme.colors.text.primary};
  background-color: ${theme.colors.background.light};
  border: 1px solid ${theme.colors.primary};
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSizes.medium};
  outline: none;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${theme.colors.background.dark};
    cursor: not-allowed;
  }
`;

interface AddSpellModalProps {
  isOpen: boolean;
  onClose: () => void;
  spell: SpellsProps;
}

export const AddSpellModal: React.FC<AddSpellModalProps> = ({ isOpen, onClose, spell }) => {
  const { getCharacters, addSpellToCharacter } = useCharacterStore();
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');

  const handleAddSpell = () => {
    if (selectedCharacterId) {
      addSpellToCharacter(selectedCharacterId, spell);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalTitle>Adicionar magia ao personagem</ModalTitle>
        <p>Selecione o personagem para adicionar a magia {spell.name}:</p>
        <Select
          value={selectedCharacterId}
          onChange={(e) => setSelectedCharacterId(e.target.value)}
        >
          <option value="">Selecione um personagem</option>
          {getCharacters().map((char) => (
            <option key={char.id} value={char.id}>
              {char.name} (Nível {char.level} {char.class})
            </option>
          ))}
        </Select>
        <Button onClick={handleAddSpell} disabled={!selectedCharacterId}>
          Adicionar Magia
        </Button>
      </ModalContent>
    </Modal>
  );
};
