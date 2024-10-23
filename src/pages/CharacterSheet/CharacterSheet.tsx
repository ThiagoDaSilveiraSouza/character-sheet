import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCharacterStore } from "../../store/characterStore";
import { theme } from "../../styles/theme";
import { CharacterSheet as CharacterSheetType } from "../../types/characterSheet";
import { FaSave } from "react-icons/fa";
import { CollapsibleCard } from "../../components/CollapsibleCard/CollapsibleCard";
// import { FaChevronUp, FaChevronDown } from "react-icons/fa";
const PageContainer = styled.div`
  color: ${theme.colors.text.primary};
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 320px) {
    padding: 10px;
  }
`;

const HeaderContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: ${theme.colors.background.light};
  z-index: 10;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 320px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const PageTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 2em;

  @media (max-width: 320px) {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
`;

const SaveButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  padding: 5px 8px;
  border-radius: 5px;
  font-size: ${theme.fontSizes.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  gap: 5px;

  &:hover {
    background-color: ${theme.colors.primaryHover};
  }

  &:focus, &:active, &:focus-visible {
    outline: none;
  }
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 320px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// const FormSection = styled.div<{ $isOpen: boolean }>`
//   background-color: ${theme.colors.background.light};
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 600px;
//   transition: all 0.3s ease-in-out;
//   overflow: hidden;
// `;

// const SectionContent = styled.div<{ $isOpen: boolean }>`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   max-height: ${(props) => (props.$isOpen ? "1000px" : "0")};
//   opacity: ${(props) => (props.$isOpen ? "1" : "0")};
//   transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
// `;

// const SectionHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
// `;

// const SectionTitle = styled.h2`
//   color: ${theme.colors.primary};
//   font-size: 1.5em;
//   margin-bottom: 20px; // Aumentado o espaçamento aqui
// `;

// const ToggleButton = styled.button`
//   color: ${theme.colors.primary};
//   font-size: 1.2em;
//   padding: 2px;
//   display: flex;
//   align-items: center;
//   gap: 3px;

//   &:focus, &:active, &:focus-visible {
//     outline: none;
//   }
// `;

const InputGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  ${props => props.$fullWidth && `
    flex-direction: column;
    align-items: flex-start;
  `}

  @media (max-width: 320px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: ${theme.colors.text.secondary};
  width: 150px;
  text-align: left;

  @media (max-width: 320px) {
    width: 100%;
    margin-bottom: 5px;
  }
`;

const Input = styled.input<{ $fullWidth?: boolean }>`
  padding: 5px;
  font-size: ${theme.fontSizes.medium};
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  background-color: ${theme.colors.background.light};
  color: ${theme.colors.text.primary};
  width: ${props => props.$fullWidth ? '100%' : '60px'};
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primaryHover};
    box-shadow: 0 0 0 2px ${theme.colors.primaryHover}33;
  }

  @media (max-width: 320px) {
    width: 100%;
  }
`;

const Select = styled.select`
  padding: 5px;
  font-size: ${theme.fontSizes.medium};
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  background-color: ${theme.colors.background.light};
  color: ${theme.colors.text.primary};
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primaryHover};
    box-shadow: 0 0 0 2px ${theme.colors.primaryHover}33;
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: ${theme.fontSizes.medium};
  border: 1px solid ${theme.colors.primary};
  border-radius: 4px;
  background-color: ${theme.colors.background.light};
  color: ${theme.colors.text.primary};
  min-height: 100px;
  resize: vertical;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primaryHover};
    box-shadow: 0 0 0 2px ${theme.colors.primaryHover}33;
  }
`;

const classes = [
  "Bárbaro",
  "Bardo",
  "Bruxo",
  "Clérigo",
  "Druida",
  "Feiticeiro",
  "Guerreiro",
  "Ladino",
  "Mago",
  "Monge",
  "Paladino",
  "Patrulheiro",
];

const skills = [
  "Acrobacia",
  "Arcanismo",
  "Atletismo",
  "Atuação",
  "Blefar",
  "Furtividade",
  "História",
  "Intimidação",
  "Intuição",
  "Investigação",
  "Lidar com Animais",
  "Medicina",
  "Natureza",
  "Percepção",
  "Persuasão",
  "Prestidigitação",
  "Religião",
  "Sobrevivência",
];

export const CharacterSheet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { characters, updateCharacter } = useCharacterStore();
  const [character, setCharacter] = useState<CharacterSheetType | null>(null);
  const [openSection, setOpenSection] = useState<string | null>("basicInfo");

  useEffect(() => {
    const foundCharacter = characters.find((c) => c.id === id);
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      navigate("/ficha-do-personagem");
    }
  }, [id, characters, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (character) {
      setCharacter((prevCharacter) => {
        if (prevCharacter) {
          return {
            ...prevCharacter,
            [e.target.name]: e.target.value,
          } as CharacterSheetType;
        }
        return null;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (character) {
      updateCharacter(character);
      navigate("/ficha-do-personagem");
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  if (!character) return null;

  return (
    <PageContainer>
      <HeaderContainer>
        <PageTitle>Ficha de {character.name}</PageTitle>
        <SaveButton onClick={handleSubmit} type="button">
          <FaSave />
          Salvar
        </SaveButton>
      </HeaderContainer>
      <ContentWrapper>
        <ScrollableContent>
          <Form onSubmit={handleSubmit}>
            <CollapsibleCard
              title="Informações Básicas"
              isOpen={openSection === "basicInfo"}
              onToggle={() => toggleSection("basicInfo")}
            >
              <InputGroup $fullWidth>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={character.name}
                  onChange={handleChange}
                  $fullWidth
                />
              </InputGroup>
              <InputGroup $fullWidth>
                <Label htmlFor="class">Classe</Label>
                <Select
                  id="class"
                  name="class"
                  value={character.class}
                  onChange={handleChange}
                >
                  <option value="">Selecione uma classe</option>
                  {classes.map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup $fullWidth>
                <Label htmlFor="level">Nível</Label>
                <Input
                  id="level"
                  type="number"
                  name="level"
                  value={character.level}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  $fullWidth
                />
              </InputGroup>
              <InputGroup $fullWidth>
                <Label htmlFor="background">Antecedente</Label>
                <Input
                  id="background"
                  name="background"
                  value={character.background}
                  onChange={handleChange}
                  $fullWidth
                />
              </InputGroup>
              <InputGroup $fullWidth>
                <Label htmlFor="race">Raça</Label>
                <Input
                  id="race"
                  name="race"
                  value={character.race}
                  onChange={handleChange}
                  $fullWidth
                />
              </InputGroup>
              <InputGroup $fullWidth>
                <Label htmlFor="alignment">Alinhamento</Label>
                <Select
                  id="alignment"
                  name="alignment"
                  value={character.alignment}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="LG">Leal e Bom</option>
                  <option value="NG">Neutro e Bom</option>
                  <option value="CG">Caótico e Bom</option>
                  <option value="LN">Leal e Neutro</option>
                  <option value="TN">Totalmente Neutro</option>
                  <option value="CN">Caótico e Neutro</option>
                  <option value="LE">Leal e Mau</option>
                  <option value="NE">Neutro e Mau</option>
                  <option value="CE">Caótico e Mau</option>
                </Select>
              </InputGroup>
              <InputGroup $fullWidth>
                <Label htmlFor="experiencePoints">
                  Pontos de Experiência
                </Label>
                <Input
                  id="experiencePoints"
                  type="number"
                  name="experiencePoints"
                  value={character.experiencePoints}
                  onChange={handleChange}
                  $fullWidth
                />
              </InputGroup>
            </CollapsibleCard>

            <CollapsibleCard
              title="Atributos"
              isOpen={openSection === "attributes"}
              onToggle={() => toggleSection("attributes")}
            >
              <InputGroup>
                <Label htmlFor="strength">Força</Label>
                <Input
                  id="strength"
                  type="number"
                  name="strength"
                  value={character.strength}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="dexterity">Destreza</Label>
                <Input
                  id="dexterity"
                  type="number"
                  name="dexterity"
                  value={character.dexterity}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="constitution">Constituição</Label>
                <Input
                  id="constitution"
                  type="number"
                  name="constitution"
                  value={character.constitution}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="intelligence">Inteligência</Label>
                <Input
                  id="intelligence"
                  type="number"
                  name="intelligence"
                  value={character.intelligence}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="wisdom">Sabedoria</Label>
                <Input
                  id="wisdom"
                  type="number"
                  name="wisdom"
                  value={character.wisdom}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="charisma">Carisma</Label>
                <Input
                  id="charisma"
                  type="number"
                  name="charisma"
                  value={character.charisma}
                  onChange={handleChange}
                />
              </InputGroup>
            </CollapsibleCard>

            <CollapsibleCard
              title="Estatísticas de Combate"
              isOpen={openSection === "combatStats"}
              onToggle={() => toggleSection("combatStats")}
            >
              <InputGroup>
                <Label htmlFor="armorClass">Classe de Armadura</Label>
                <Input
                  id="armorClass"
                  type="number"
                  name="armorClass"
                  value={character.armorClass}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="initiative">Iniciativa</Label>
                <Input
                  id="initiative"
                  type="number"
                  name="initiative"
                  value={character.initiative}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="speed">Deslocamento</Label>
                <Input
                  id="speed"
                  name="speed"
                  value={character.speed}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="hitPointMaximum">
                  Pontos de Vida Máximos
                </Label>
                <Input
                  id="hitPointMaximum"
                  type="number"
                  name="hitPointMaximum"
                  value={character.hitPointMaximum}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="currentHitPoints">
                  Pontos de Vida Atuais
                </Label>
                <Input
                  id="currentHitPoints"
                  type="number"
                  name="currentHitPoints"
                  value={character.currentHitPoints}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="temporaryHitPoints">
                  Pontos de Vida Temporários
                </Label>
                <Input
                  id="temporaryHitPoints"
                  type="number"
                  name="temporaryHitPoints"
                  value={character.temporaryHitPoints}
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="hitDice">Dados de Vida</Label>
                <Input
                  id="hitDice"
                  name="hitDice"
                  value={character.hitDice}
                  onChange={handleChange}
                />
              </InputGroup>
            </CollapsibleCard>

            <CollapsibleCard
              title="Perícias"
              isOpen={openSection === "skills"}
              onToggle={() => toggleSection("skills")}
            >
              {skills.map((skill) => (
                <InputGroup key={skill}>
                  <Label htmlFor={skill}>{skill}</Label>
                  <Input
                    id={skill}
                    type="number"
                    name={`skills.${skill}`}
                    value={character.skills?.[skill] || 0}
                    onChange={handleChange}
                  />
                </InputGroup>
              ))}
            </CollapsibleCard>

            <CollapsibleCard
              title="Características"
              isOpen={openSection === "characteristics"}
              onToggle={() => toggleSection("characteristics")}
            >
              <Label htmlFor="personalityTraits">
                Traços de Personalidade
              </Label>
              <TextArea
                id="personalityTraits"
                name="personalityTraits"
                value={character.personalityTraits}
                onChange={handleChange}
              />

              <Label htmlFor="ideals">Ideais</Label>
              <TextArea
                id="ideals"
                name="ideals"
                value={character.ideals}
                onChange={handleChange}
              />

              <Label htmlFor="bonds">Vínculos</Label>
              <TextArea
                id="bonds"
                name="bonds"
                value={character.bonds}
                onChange={handleChange}
              />

              <Label htmlFor="flaws">Fraquezas</Label>
              <TextArea
                id="flaws"
                name="flaws"
                value={character.flaws}
                onChange={handleChange}
              />
            </CollapsibleCard>

            <CollapsibleCard
              title="Habilidades e Equipamentos"
              isOpen={openSection === "abilitiesAndEquipment"}
              onToggle={() => toggleSection("abilitiesAndEquipment")}
            >
              <Label htmlFor="featuresAndTraits">
                Características e Talentos
              </Label>
              <TextArea
                id="featuresAndTraits"
                name="featuresAndTraits"
                value={character.featuresAndTraits}
                onChange={handleChange}
              />

              <Label htmlFor="otherProficienciesAndLanguages">
                Outras Proficiências e Idiomas
              </Label>
              <TextArea
                id="otherProficienciesAndLanguages"
                name="otherProficienciesAndLanguages"
                value={character.otherProficienciesAndLanguages}
                onChange={handleChange}
              />

              <Label htmlFor="equipment">Equipamento</Label>
              <TextArea
                id="equipment"
                name="equipment"
                value={character.equipment}
                onChange={handleChange}
              />

              <Label htmlFor="attacksAndSpellcasting">
                Ataques e Conjuração
              </Label>
              <TextArea
                id="attacksAndSpellcasting"
                name="attacksAndSpellcasting"
                value={character.attacksAndSpellcasting}
                onChange={handleChange}
              />
            </CollapsibleCard>
          </Form>
        </ScrollableContent>
      </ContentWrapper>
    </PageContainer>
  );
};
