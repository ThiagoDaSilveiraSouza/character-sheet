import React from 'react';
import { Modal } from '../Modal/Modal';
import styled from 'styled-components';
import { SpellsProps } from '../../types'; // Importe a tipagem SpellsProps

const SpellTitle = styled.h2`
  color: #4E2800;
  margin-bottom: 10px;
`;

const SpellDetail = styled.p`
  margin-bottom: 5px;
  color: #2C1A1D;
`;

interface SpellDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  spell: SpellsProps; // Use SpellsProps aqui
}

export const SpellDetailModal: React.FC<SpellDetailModalProps> = ({ isOpen, onClose, spell }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <SpellTitle>{spell.name}</SpellTitle>
      <SpellDetail><strong>Nível:</strong> {spell.level}</SpellDetail>
      <SpellDetail><strong>Escola:</strong> {spell.school.name}</SpellDetail>
      <SpellDetail><strong>Tempo de Conjuração:</strong> {spell.casting_time}</SpellDetail>
      <SpellDetail><strong>Alcance:</strong> {spell.range}</SpellDetail>
      <SpellDetail><strong>Componentes:</strong> {spell.components.join(', ')}</SpellDetail>
      <SpellDetail><strong>Duração:</strong> {spell.duration}</SpellDetail>
      <SpellDetail><strong>Descrição:</strong> {spell.desc}</SpellDetail>
      {spell.higher_level && (
        <SpellDetail><strong>Em Níveis Superiores:</strong> {spell.higher_level}</SpellDetail>
      )}
    </Modal>
  );
};
