import React from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { theme } from '../../styles/theme';

const CardContainer = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  background-color: ${theme.colors.background.main};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.background.dark};
  }
`;

const CardTitle = styled.h3`
  color: ${theme.colors.primary};
  font-size: 1.2em;
  margin: 0;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 1.2em;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const CardContent = styled.div<{ $isOpen: boolean }>`
  padding: ${props => props.$isOpen ? '20px' : '0 20px'};
  max-height: ${props => props.$isOpen ? '1000px' : '0'};
  opacity: ${props => props.$isOpen ? '1' : '0'};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

interface CollapsibleCardProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ title, children, isOpen, onToggle }) => {
  return (
    <CardContainer>
      <CardHeader onClick={onToggle}>
        <CardTitle>{title}</CardTitle>
        <ToggleButton type="button">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </ToggleButton>
      </CardHeader>
      <CardContent $isOpen={isOpen}>
        {children}
      </CardContent>
    </CardContainer>
  );
};
