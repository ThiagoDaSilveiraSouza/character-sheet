import { create } from "zustand";
import { dataEndPoints, getAllDataByPropertieName, UniqueDataInfoProps } from "../services";
import { useBrowserStorage } from "../utils";

type DataEndPointsProps = typeof dataEndPoints;

type UseDataStoreProps = {
  loadingPercente: number;
  currentPropertie: keyof DataEndPointsProps | null;
  data: Partial<UniqueDataInfoProps>;
  updateData: () => Promise<void>;
};

export const useDataStore = create<UseDataStoreProps>((set) => {
  const { getStorage, setStorage } = useBrowserStorage();
  const calculatePercente = (
    dataEndPoints: DataEndPointsProps,
    targetPropName: keyof DataEndPointsProps
  ) => {
    const numbOfProperties = Object.keys(dataEndPoints).length;

    const currentPropertieIndex = Object.keys(dataEndPoints).findIndex(
      (currentProp) => currentProp === targetPropName
    );

    if (currentPropertieIndex === -1) {
      console.warn(`Propriedade ${targetPropName} não encontrada em dataEndPoints.`);
      return 0;
    }

    const percente = ((currentPropertieIndex + 1) * 100) / numbOfProperties;
    return percente;
  };

  return {
    loadingPercente: 0,
    currentPropertie: null,
    data: {},
    updateData: async (currentDataEndPoints: DataEndPointsProps = dataEndPoints) => {
      const dataEndPointsEntries = Object.entries(currentDataEndPoints)

      for (const currentDataEndPointEntrie of dataEndPointsEntries) {
        const [currentPropertieName] = currentDataEndPointEntrie
        const dataFromLocalStorage = getStorage<object>(currentPropertieName);
        const currentPercent = calculatePercente(
          currentDataEndPoints,
          currentPropertieName as keyof DataEndPointsProps
        );

        if (dataFromLocalStorage) {
          set((state) => ({
            ...state,
            loadingPercente: currentPercent,
            currentPropertie: currentPropertieName as keyof DataEndPointsProps,
            data: {
              ...state.data,
              [currentPropertieName]: dataFromLocalStorage,
            },
          }));
          console.log("pegando do localStorage: ", currentPropertieName);
          continue;
        }

        try {
          console.log("pegando da API: ", currentPropertieName);
          const propertieData = await getAllDataByPropertieName(
            currentPropertieName as keyof DataEndPointsProps
          );
          set((state) => ({
            loadingPercente: currentPercent,
            currentPropertie: currentPropertieName as keyof DataEndPointsProps,
            data: {
              ...state.data,
              [currentPropertieName]: propertieData,
            },
          }));

          setStorage(currentPropertieName, propertieData);
        } catch (err) {
          console.log(err);
        }
      }
    },
  };
});
