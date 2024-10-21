import { useCallback, useEffect, useState } from "react";
import { dataEndPoints, getAllDataByPropertieName } from "../services";
import axios from "axios";

type DataEndPointsProps = typeof dataEndPoints;

export const LoadingDataHook = () => {
  const [status, setStatus] = useState({
    loadingPercente: 0,
    currentPropertie: "",
    data: {} as typeof dataEndPoints,
  });

  const calculatePercente = (
    dataEndPoints: DataEndPointsProps,
    targetPropName: keyof DataEndPointsProps
  ) => {
    const numbOfProperties = Object.keys(dataEndPoints).length;
    const currentPropertieIndex =
      Object.keys(dataEndPoints).findIndex(
        (currentProp) => currentProp === targetPropName
      ) || 0;

    const percente = ((currentPropertieIndex + 1) * 100) / numbOfProperties;
    return percente;
  };

  const updateStatus = useCallback(
    async (currentDataEndPoints: DataEndPointsProps = dataEndPoints) => {
      const requestPromiseList = Object.entries(currentDataEndPoints).map(
        (currentPropertieEntries) => {
          return (async () => {
            try {
              const currentPropertieName =
                currentPropertieEntries[0] as keyof DataEndPointsProps;
              const propertieData =
                getAllDataByPropertieName(currentPropertieName);
              const currentPercent = calculatePercente(
                currentDataEndPoints,
                currentPropertieName
              );
              setStatus((prevState) => {
                return {
                  loadingPercente: currentPercent,
                  currentPropertie: currentPropertieName,
                  data: {
                    ...prevState.data,
                    [currentPropertieName]: propertieData,
                  },
                };
              });
            } catch (err) {
              console.log(err);
            }
          })();
        }
      );

      await axios.all(requestPromiseList);
    },
    [status]
  );

  return { ...status, updateStatus };
};
