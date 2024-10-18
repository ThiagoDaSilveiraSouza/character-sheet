export type EquipmentProps = {
  desc: string[];
  special: string[];
  index: string;
  name: string;
  equipment_category: {
    index: string;
    name: string;
    url: string;
  };
  gear_category: {
    index: string;
    name: string;
    url: string;
  };
  cost: {
    quantity: number;
    unit: string;
  };
  weight: number;
  url: string;
  contents: [];
  properties: [];
};
