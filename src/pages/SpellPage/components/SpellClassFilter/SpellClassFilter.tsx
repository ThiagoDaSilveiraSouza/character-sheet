import React from "react";
import { useSpellClassFilter } from "./useSpellClassFilter";
import {
  FilterContainer,
  FilterButton,
  DropdownContent,
  ClassLabel,
  ClassCheckbox,
} from "./SpellClassFilter.styles";

interface SpellClassFilterProps {
  classList: string[];
  checkedClassList: string[];
  toggleClassList: (targetClass: string) => void;
}

export const SpellClassFilter: React.FC<SpellClassFilterProps> = ({
  classList,
  checkedClassList,
  toggleClassList,
}) => {
  const { isOpen, toggleDropdown, closeDropdown } = useSpellClassFilter();

  return (
    <FilterContainer onMouseLeave={closeDropdown}>
      <FilterButton onClick={toggleDropdown}>Filtrar por Classe</FilterButton>
      <DropdownContent $isOpen={isOpen}>
        {classList.map((className) => (
          <ClassLabel key={`class-label-${className}`}>
            <ClassCheckbox
              type="checkbox"
              value={className}
              checked={checkedClassList.includes(className)}
              onChange={() => toggleClassList(className)}
            />
            {className}
          </ClassLabel>
        ))}
      </DropdownContent>
    </FilterContainer>
  );
};
