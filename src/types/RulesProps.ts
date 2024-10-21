export type RulesProps = {
  name: string;
  index: string;
  desc: string;
  subsections: {
    name: string;
    index: string;
    url: string;
  }[];
  url: string;
};
