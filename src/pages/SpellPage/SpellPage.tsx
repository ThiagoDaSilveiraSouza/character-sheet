import { SpellPageHook } from "./SpellPageHook";

export const SpellPage = () => {
  const { spells, spellsBySchool, levelIndexList, toggleLevelList } =
    SpellPageHook();

  console.log("spellsBySchool", spellsBySchool);
  return (
    <main>
      <h1>Magias</h1>
      {levelIndexList.map((value) => {
        return (
          <input
            type="checkbox"
            value={value}
            key={"level-input-key-" + value}
            onClick={() => toggleLevelList(value)}
          />
        );
      })}

      {spells?.map(({ name, index }) => {
        return (
          <div key={index}>
            <p>{name}</p>
          </div>
        );
      })}
    </main>
  );
};
