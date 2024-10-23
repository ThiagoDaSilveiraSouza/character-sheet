import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpellPage } from "./useSpellPage";
import { SpellLevelFilter } from "./components/SpellLevelFilter";
import { SpellClassFilter } from "./components/SpellClassFilter";
import { SpellDetailModal } from "../../components/SpellDetailModal/SpellDetailModal";
import { AddSpellModal } from "../../components/AddSpellModal/AddSpellModal";
import { SpellsProps } from "../../types";
import {
  PageContainer,
  PageTitle,
  FilterContainer,
  SpellSchoolCardContainer,
  SpellSchoolCard,
  SpellSchoolHeader,
  SpellSchoolTitle,
  SpellCount,
  ToggleButton,
  SpellListCardContainer,
  SpellItem,
  SpellName,
  SpellButtonsContainer,
  SpellButton,
  AddIcon,
  ChevronIcon,
} from "./SpellPage.styles";

export const SpellPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    spellsBySchool,
    levelIndexList,
    toggleLevelList,
    classList,
    checkedClassList,
    toggleClassList,
  } = useSpellPage();
  const [selectedSpell, setSelectedSpell] = useState<SpellsProps | null>(null);
  const [spellToAdd, setSpellToAdd] = useState<SpellsProps | null>(null);
  const [openSchools, setOpenSchools] = useState<{ [key: string]: boolean }>({});

  const handleOpenModal = (spell: SpellsProps): void => {
    setSelectedSpell(spell);
  };

  const handleCloseModal = (): void => {
    setSelectedSpell(null);
  };

  const handleOpenAddSpellModal = (spell: SpellsProps): void => {
    setSpellToAdd(spell);
  };

  const handleCloseAddSpellModal = (): void => {
    setSpellToAdd(null);
  };

  const toggleSchool = (schoolName: string): void => {
    setOpenSchools(prev => ({ ...prev, [schoolName]: !prev[schoolName] }));
  };

  return (
    <PageContainer>
      <PageTitle>{t("spellPage.title")}</PageTitle>
      <FilterContainer>
        <SpellLevelFilter
          levelIndexList={levelIndexList}
          toggleLevelList={toggleLevelList}
        />
        <SpellClassFilter
          classList={classList}
          checkedClassList={checkedClassList}
          toggleClassList={toggleClassList}
        />
      </FilterContainer>
      <SpellSchoolCardContainer>
        {Object.entries(spellsBySchool || {}).map(
          ([schoolName, spellListBySchool]) => {
            if (!spellListBySchool || spellListBySchool.length === 0) return null;
            const isOpen = openSchools[schoolName];
            return (
              <SpellSchoolCard key={schoolName}>
                <SpellSchoolHeader onClick={() => toggleSchool(schoolName)}>
                  <SpellSchoolTitle>{schoolName}</SpellSchoolTitle>
                  <SpellCount>{spellListBySchool.length}</SpellCount>
                  <ToggleButton>
                    <ChevronIcon $isOpen={isOpen} />
                  </ToggleButton>
                </SpellSchoolHeader>
                <SpellListCardContainer $isOpen={isOpen}>
                  {spellListBySchool?.map((spell: SpellsProps) => (
                    <SpellItem
                      key={spell.name}
                      onClick={() => handleOpenModal(spell)}
                      title="Clique para ver detalhes"
                    >
                      <SpellName>{spell.name}</SpellName>
                      <SpellButtonsContainer>
                        <SpellButton
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            handleOpenAddSpellModal(spell);
                          }}
                          title="Adicionar ao personagem"
                        >
                          <AddIcon />
                        </SpellButton>
                      </SpellButtonsContainer>
                    </SpellItem>
                  ))}
                </SpellListCardContainer>
              </SpellSchoolCard>
            );
          }
        )}
      </SpellSchoolCardContainer>
      {selectedSpell && (
        <SpellDetailModal
          isOpen={!!selectedSpell}
          onClose={handleCloseModal}
          spell={selectedSpell}
        />
      )}
      {spellToAdd && (
        <AddSpellModal
          isOpen={!!spellToAdd}
          onClose={handleCloseAddSpellModal}
          spell={spellToAdd}
        />
      )}
    </PageContainer>
  );
};
