import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCharacterStore } from "../../store/characterStore";
import { CharacterList } from "./components/CharacterList";
import { CreateCharacterForm } from "./components/CreateCharacterForm";
import { Modal } from "../../components/Modal/Modal";
import { theme } from "../../styles/theme";
import { CharacterSheet } from "../../types/characterSheet";

const PageContainer = styled.div`
  padding: 20px;
  color: ${theme.colors.text.primary};
  box-sizing: border-box;
`;

const PageTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 2em;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ModalButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
`;

export const CharacterSheetPage: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState<string | null>(
    null
  );
  const [newCharacter, setNewCharacter] = useState<Omit<
    CharacterSheet,
    "id" | "spells"
  > | null>(null);
  const { characters, addCharacter, removeCharacter } = useCharacterStore();
  const navigate = useNavigate();

  const handleCreateCharacter = (
    character: Omit<CharacterSheet, "id" | "spells">
  ) => {
    const characterExists = characters.some(
      (c) => c.name.toLowerCase() === character.name.toLowerCase()
    );
    if (characterExists) {
      alert(
        "Um personagem com este nome já existe. Por favor, escolha um nome diferente."
      );
      return;
    }
    setNewCharacter(character);
    setShowConfirmModal(true);
  };

  const confirmAddCharacter = () => {
    if (newCharacter) {
      addCharacter(newCharacter);
      setIsCreating(false);
      setShowConfirmModal(false);
      setNewCharacter(null);
    }
  };

  const handleRemoveCharacter = (id: string) => {
    setCharacterToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmRemoveCharacter = () => {
    if (characterToDelete) {
      removeCharacter(characterToDelete);
      setShowDeleteModal(false);
      setCharacterToDelete(null);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Fichas de Personagem</PageTitle>
      {!isCreating && (
        <Button onClick={() => setIsCreating(true)}>Criar Nova Ficha</Button>
      )}
      {isCreating ? (
        <CreateCharacterForm
          onSubmit={handleCreateCharacter}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <CharacterList
          characters={characters}
          onSelectCharacter={(id) => navigate(`/ficha-do-personagem/${id}`)}
          onRemoveCharacter={handleRemoveCharacter}
        />
      )}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <ModalContent>
          <h2>Confirmar Criação de Personagem</h2>
          <p>Deseja criar o personagem {newCharacter?.name}?</p>
          <ModalButton onClick={confirmAddCharacter}>Confirmar</ModalButton>
          <ModalButton onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </ModalButton>
        </ModalContent>
      </Modal>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <ModalContent>
          <h2>Confirmar Exclusão de Personagem</h2>
          <p>Tem certeza que deseja excluir este personagem?</p>
          <ModalButton onClick={confirmRemoveCharacter}>Confirmar</ModalButton>
          <ModalButton onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </ModalButton>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
};
