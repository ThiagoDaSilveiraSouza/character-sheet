import React from 'react';
import { useSpellLevelFilter } from './useSpellLevelFilter';
import {
  FilterContainer,
  FilterButton,
  DropdownContent,
  LevelLabel,
  LevelCheckbox
} from './SpellLevelFilter.styles';

interface SpellLevelFilterProps {
  levelIndexList: number[];
  toggleLevelList: (level: number, checked: boolean) => void;
}

export const SpellLevelFilter: React.FC<SpellLevelFilterProps> = ({ levelIndexList, toggleLevelList }) => {
  const { isOpen, toggleDropdown, closeDropdown } = useSpellLevelFilter();

  return (
    <FilterContainer onMouseLeave={closeDropdown}>
      <FilterButton onClick={toggleDropdown}>Filtrar por Nível</FilterButton>
      <DropdownContent $isOpen={isOpen}>
        {levelIndexList.map((value) => (
          <LevelLabel key={`level-label-${value}`}>
            <LevelCheckbox
              type="checkbox"
              value={value}
              onChange={(event) => toggleLevelList(value, event.target.checked)}
            />
            Nv. {value}
          </LevelLabel>
        ))}
      </DropdownContent>
    </FilterContainer>
  );
};
