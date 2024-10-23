import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

export const FilterContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
`;

export const FilterButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  padding: 10px 20px;
  font-size: 1.1em;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  outline: none;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }
`;

export const DropdownContent = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: absolute;
  background-color: #F5E6D3;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #E0D0B8;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #7D0000;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9A0000;
  }
`;

export const LevelLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  font-size: 1.1em;
  color: #2C1A1D;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #E0D0B8;
  }
`;

export const LevelCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #7D0000;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:checked {
    background-color: #7D0000;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #F5E6D3;
    border-radius: 50%;
  }

  &:hover {
    border-color: #9A0000;
  }
`;
