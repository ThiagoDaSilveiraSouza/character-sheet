import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const LevelLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  font-size: 1em;
  color: #4e2800;
`;

const LevelCheckbox = styled.input`
  margin-right: 5px;
  cursor: pointer;
`;

interface SpellLevelFilterProps {
  levelIndexList: number[];
  toggleLevelList: (level: number, checked: boolean) => void;
}

export const SpellLevelFilter: React.FC<SpellLevelFilterProps> = ({ levelIndexList, toggleLevelList }) => {
  return (
    <FilterContainer>
      {levelIndexList.map((value) => (
        <LevelLabel key={`level-label-${value}`}>
          <LevelCheckbox
            type="checkbox"
            value={value}
            onChange={(event) => toggleLevelList(value, event.target.checked)}
          />
          Nível {value}
        </LevelLabel>
      ))}
    </FilterContainer>
  );
};
