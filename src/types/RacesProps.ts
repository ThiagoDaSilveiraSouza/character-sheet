export type RaceProps = {
  index: string;
  name: string;
  speed: number;
  ability_bonuses: {
    ability_score: {
      index: string;
      name: string;
      url: string;
    };
    bonus: number;
  }[];
  alignment: string;
  age: string;
  size: string;
  size_description: string;
  starting_proficiencies: string[];
  languages: {
    index: string;
    name: string;
    url: string;
  }[];
  language_desc: string;
  traits: {
    index: string;
    name: string;
    url: string;
  }[];
  subraces: string[];
  url: string;
};
