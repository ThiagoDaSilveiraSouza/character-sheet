export type FeatsProps = {
  index: string;
  name: string;
  prerequisites: {
    ability_score: {
      index: string;
      name: string;
      url: string;
    };
    minimum_score: number;
  }[];
  desc: string[];
  url: string;
}



