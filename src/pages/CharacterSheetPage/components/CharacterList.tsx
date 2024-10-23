import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { CharacterSheet } from '../../../types/characterSheet';
import { FaTrash } from 'react-icons/fa';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.background.light};
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.background.dark};
  }
`;

const CharacterInfo = styled.div`
  flex-grow: 1;
`;

const DeleteButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

interface CharacterListProps {
  characters: CharacterSheet[];
  onSelectCharacter: (id: string) => void;
  onRemoveCharacter: (id: string) => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({ characters, onSelectCharacter, onRemoveCharacter }) => {
  return (
    <List>
      {characters.map((character) => (
        <ListItem key={character.id}>
          <CharacterInfo onClick={() => onSelectCharacter(character.id)}>
            {character.name} - Nível {character.level} {character.class}
          </CharacterInfo>
          <DeleteButton onClick={(e) => {
            e.stopPropagation();
            onRemoveCharacter(character.id);
          }}>
            <FaTrash />
          </DeleteButton>
        </ListItem>
      ))}
    </List>
  );
};
