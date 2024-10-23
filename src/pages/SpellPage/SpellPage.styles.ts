import styled from 'styled-components';
import { FaInfoCircle, FaPlus, FaHome, FaChevronDown } from 'react-icons/fa';
import { theme } from '../../styles/theme';

export const PageTitle = styled.h1`
  font-size: ${theme.fontSizes.xlarge};
  color: ${theme.colors.primary};
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2em;
  }

  @media (max-width: 480px) {
    font-size: 1.8em;
  }
`;

export const PageContainer = styled.main`
  max-width: 100%;
  overflow-x: hidden;
  padding: 20px;
  box-sizing: border-box;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SpellSchoolCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SpellSchoolCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: ${theme.colors.background.light};
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
  z-index: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:focus-within {
    z-index: 3;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SpellSchoolHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
`;

export const SpellSchoolTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: 1.2em;
  margin: 0;
  font-weight: 600;
`;

export const SpellCount = styled.span`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
  font-weight: bold;
`;

export const ToggleButton = styled.button`
  color: ${theme.colors.primary};
  font-size: 1.2em;
  padding: 2px;
  display: flex;
  align-items: center;

  &:focus, &:active, &:focus-visible {
    outline: none;
  }
`;

export const SpellListCardContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${theme.colors.background.light};
  overflow-y: auto;
  max-height: ${props => props.$isOpen ? '300px' : '0'};
  transition: max-height 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  z-index: 2;
`;

export const SpellItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #E0D0B8;
  }
`;

export const SpellName = styled.p`
  flex-grow: 1;
  margin-right: 10px;
`;

export const SpellButtonsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const SpellButton = styled.button`
  background-color: transparent;
  color: ${theme.colors.primary};
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 1.2em;
  transition: color 0.3s ease;
  outline: none;

  &:hover {
    color: ${theme.colors.primaryHover};
  }
`;

export const InfoIcon = styled(FaInfoCircle)``;
export const AddIcon = styled(FaPlus)``;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: ${theme.fontSizes.medium};
  transition: background-color 0.3s ease;
  outline: none;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }

  svg {
    margin-right: 5px;
  }
`;

export const BackIcon = styled(FaHome)``;

export const ChevronIcon = styled(FaChevronDown) <{ $isOpen: boolean }>`
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;
