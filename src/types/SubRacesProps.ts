export type SubRacesProps = {
  index: string;
  name: string;
  race: {
    index: string;
    name: string;
    url: string;
  };
  desc: string;
  ability_bonuses: Array<{
    ability_score: {
      index: string;
      name: string;
      url: string;
    };
    bonus: number;
  }>;
  starting_proficiencies: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  languages: string[];
  language_options: {
    choose: number;
    from: {
      option_set_type: string;
      options: Array<{
        option_type: string;
        item: {
          index: string;
          name: string;
          url: string;
        };
      }>;
    };
    type: string;
  };
  racial_traits: Array<{
    index: string;
    name: string;
    url: string;
  }>;
  url: string;
};
