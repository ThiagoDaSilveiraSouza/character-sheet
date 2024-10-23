import { useEffect, useState, useMemo } from "react";
import { useDataStore } from "../../store";

export const SpellPageHook = () => {
  const { data } = useDataStore();
  const { spells } = data;
  const [checkedLevelList, setCheckedLevelList] = useState<number[]>([]);
  const [checkedClassList, setCheckedClassList] = useState<string[]>([]);

  const levelIndexList = useMemo(() => 
    Array(10).fill("").map((_, index) => index),
    []
  );

  const classList = useMemo(() => {
    const classSet = new Set<string>();
    spells?.forEach(spell => {
      spell.classes.forEach(spellClass => {
        classSet.add(spellClass.name);
      });
    });
    return Array.from(classSet).sort();
  }, [spells]);

  const toggleLevelList = (targetLevel: number, checked: boolean) => {
    setCheckedLevelList((prevLevelList) => {
      const setList = new Set([...prevLevelList]);
      if (checked) {
        setList.add(targetLevel);
      } else {
        setList.delete(targetLevel);
      }
      return Array.from(setList);
    });
  };

  const toggleClassList = (targetClass: string) => {
    setCheckedClassList((prevClassList) => {
      if (prevClassList.includes(targetClass)) {
        return prevClassList.filter((currentClass) => currentClass !== targetClass);
      }
      return [...prevClassList, targetClass];
    });
  };

  const filterListByLevel = (spellsList: typeof spells) => {
    if (checkedLevelList.length === 0) return spellsList;
    return spellsList?.filter((currentSpell) => 
      checkedLevelList.includes(currentSpell.level)
    );
  };

  const filterByClass = (spellsList: typeof spells) => {
    if (checkedClassList.length === 0) return spellsList;
    return spellsList?.filter((currentSpell) => 
      currentSpell.classes.some((spellClass) => 
        checkedClassList.includes(spellClass.name)
      )
    );
  };

  const filterSpell = (spellsList: typeof spells) => {
    return [filterListByLevel, filterByClass].reduce(
      (filteredSpells, currentFilter) => currentFilter(filteredSpells),
      spellsList
    );
  };

  const filteredSpells = useMemo(() => filterSpell(spells), [spells, checkedLevelList, checkedClassList]);

  const spellsBySchool = useMemo(() => {
    return filteredSpells?.reduce((acc, currentSpell) => {
      const { school } = currentSpell;
      const schoolName = school.name;
      acc[schoolName] = acc[schoolName] || [];
      acc[schoolName].push(currentSpell);
      return acc;
    }, {} as { [key: string]: typeof spells });
  }, [filteredSpells]);

  useEffect(() => {
    console.log("levelList", checkedLevelList);
  }, [checkedLevelList]);

  return { 
    spellsBySchool, 
    levelIndexList, 
    toggleLevelList, 
    classList, 
    checkedClassList,
    toggleClassList 
  };
};
