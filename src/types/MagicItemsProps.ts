export type MagicItemsProps = {
  index: string;
  name: string;
  equipment_category: {
    index: string;
    name: string;
    url: string;
  };
  rarity: {
    name: string;
  };
  variants: [];
  variant: boolean;
  desc: string[];
  image: string;
  url: string;
}