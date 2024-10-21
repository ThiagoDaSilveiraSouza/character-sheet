import axios from "axios";
import { dedAPi } from "../api";
import {
  AbilityScoreProp,
  AlignmentProp,
  BackgroundsProps,
  ClassesProps,
  ConditionsProps,
  DamageTypesProps,
  EquipmentCategoriesProps,
  EquipmentProps,
  FeatsProps,
  FeaturesProps,
  LanguagesProps,
  MagicItemsProps,
  MagicSchoolsProps,
  MonsterProps,
  ProficienciesProps,
  RaceProps,
  RuleSectionsProps,
  RulesProps,
  SkillsProps,
  SpellsProps,
  SubClassesProps,
  SubRacesProps,
  TraitsProps,
  WeaponPropertiesProps,
} from "../types";

export const dataEndPoints = {
  "ability-scores": "/api/ability-scores",
  alignments: "/api/alignments",
  backgrounds: "/api/backgrounds",
  classes: "/api/classes",
  conditions: "/api/conditions",
  "damage-types": "/api/damage-types",
  equipment: "/api/equipment",
  "equipment-categories": "/api/equipment-categories",
  feats: "/api/feats",
  features: "/api/features",
  languages: "/api/languages",
  "magic-items": "/api/magic-items",
  "magic-schools": "/api/magic-schools",
  monsters: "/api/monsters",
  proficiencies: "/api/proficiencies",
  races: "/api/races",
  "rule-sections": "/api/rule-sections",
  rules: "/api/rules",
  skills: "/api/skills",
  spells: "/api/spells",
  subclasses: "/api/subclasses",
  subraces: "/api/subraces",
  traits: "/api/traits",
  "weapon-properties": "/api/weapon-properties",
};

type dataPayload = {
  count: number;
  results: {
    index: string;
    name: string;
    url: string;
  }[];
};

export const getData = async (propertyName: keyof typeof dataEndPoints) => {
  try {
    const dataFromAPi = await dedAPi<dataPayload>(dataEndPoints[propertyName]);
    const { data } = dataFromAPi;

    return data;
  } catch (err) {
    console.error(err);
  }
};

export type UniqueDataInfoProps = {
  "ability-scores": AbilityScoreProp[];
  alignments: AlignmentProp[];
  backgrounds: BackgroundsProps[];
  classes: ClassesProps[];
  conditions: ConditionsProps[];
  "damage-types": DamageTypesProps[];
  equipment: EquipmentProps[];
  "equipment-categories": EquipmentCategoriesProps[];
  feats: FeatsProps[];
  features: FeaturesProps[];
  languages: LanguagesProps[];
  "magic-items": MagicItemsProps[];
  "magic-schools": MagicSchoolsProps[];
  monsters: MonsterProps[];
  proficiencies: ProficienciesProps[];
  races: RaceProps[];
  "rule-sections": RuleSectionsProps[];
  rules: RulesProps[];
  skills: SkillsProps[];
  spells: SpellsProps[];
  subclasses: SubClassesProps[];
  subraces: SubRacesProps[];
  traits: TraitsProps[];
  "weapon-properties": WeaponPropertiesProps[];
};

const getAllDataByPropertieNameConfig = {
  currentAttemp: 0,
  maxAttemps: 3
}
export const getAllDataByPropertieName = async <
  T extends keyof UniqueDataInfoProps
>(
  propertyName: T,
  config = getAllDataByPropertieNameConfig
): Promise<UniqueDataInfoProps[T][] | undefined> => {
  try {
    const allDataFromApi = await getData(propertyName);
    if (!allDataFromApi) return;

    const allDataRequestList = allDataFromApi.results.map((item) =>
      dedAPi<UniqueDataInfoProps[T]>(item.url)
    );

    const allDataList = (await axios.all(allDataRequestList)).map(
      ({ data }) => data
    );

    return allDataList;
  } catch (err) {
    const updatedConfig = {
      ...config,
      currentAttemp: config.currentAttemp + 1
    }
    const hasAttemp = updatedConfig.currentAttemp <= updatedConfig.maxAttemps

    if (hasAttemp) {
      console.log("Tentando carregar novamente a propriedade: ", propertyName)
      console.error(err)
      await getAllDataByPropertieName(propertyName, updatedConfig)
    }
    console.error(err);
  }
};
