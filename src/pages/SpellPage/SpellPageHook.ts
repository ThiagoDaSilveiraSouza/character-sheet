import { useState } from "react";
import { useDataStore } from "../../store";

export const SpellPageHook = () => {
  const { data } = useDataStore();
  const { spells } = data;
  const [levelList, setLevelList] = useState<number[]>([0])
  const [classList, setClassList] = useState<string[]>(["Bard"])
  const levelIndexList = Array(10)
    .fill("")
    .map((_, index) => index)

  const toggleLevelList = (targetLevel: number) => {
    setLevelList((prevLevelList) => {
      const updatedState = [...prevLevelList]
      const hasTargetLevel = updatedState.some((currentLevel) => currentLevel === targetLevel)

      if (hasTargetLevel) {
        const levelListWithoutTargetLevel = updatedState.filter((currentLevel) => currentLevel !== targetLevel)
        return levelListWithoutTargetLevel
      }

      updatedState.push(targetLevel)

      return updatedState
    })
  }



  const toggleClassList = (targetClasse: string) => {
    setClassList((prevClassList) => {
      const updatedState = [...prevClassList]
      const hasTargetLevel = updatedState.some((currentClass) => currentClass === targetClasse)

      if (hasTargetLevel) {
        const levelListWithoutTargetClass = updatedState.filter((currentClass) => currentClass !== targetClasse)
        return levelListWithoutTargetClass
      }

      updatedState.push(targetClasse)

      return updatedState
    })
  }



  const filterListByLevel = (spellsList: typeof spells) => {
    const notHasFilters = levelList.length === 0

    if (notHasFilters) {
      return spellsList
    }

    return spellsList?.filter((currentSpell) => {

      const { level } = currentSpell
      const hasCurrentLevel = levelList.some((currentLevel) => currentLevel === level)
      return hasCurrentLevel
    })
  }

  const filterByClass = (spellsList: typeof spells) => {
    const notHasFilters = classList.length === 0

    if (notHasFilters) {
      return spellsList
    }

    return spellsList?.filter((currentSpell) => {
      const hasCurrentClass = classList.some((currentClass) => currentSpell.classes.some((currentCLassFromCurrentSpell) => currentCLassFromCurrentSpell.name === currentClass))

      return hasCurrentClass
    })
  }

  const filterSpell = (spellsList: typeof spells) => {
    const filterList = [filterListByLevel, filterByClass]
    const filterdSpells = filterList.reduce((filteredSpells, currentFilter) => currentFilter(filteredSpells), spellsList)
    return filterdSpells
  }

  const filteredSpells = filterSpell(spells)

  const spellsBySchool = filteredSpells?.reduce((spellsBySchool, currentSpell) => {
    const { school } = currentSpell;
    const updatedSpellsBySchool = { ...spellsBySchool };
    const schoolName = school.name as keyof typeof updatedSpellsBySchool;
    updatedSpellsBySchool[schoolName] = updatedSpellsBySchool[schoolName] || [];

    updatedSpellsBySchool[schoolName].push(currentSpell);
    return updatedSpellsBySchool;
  }, {} as { [key: string]: typeof spells });


  return { spells, spellsBySchool, toggleLevelList, toggleClassList, levelIndexList }
}