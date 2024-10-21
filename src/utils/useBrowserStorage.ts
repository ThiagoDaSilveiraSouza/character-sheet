const storageData = {
  localStorage,
  sessionStorage,
};

export const useBrowserStorage = (storeType: keyof typeof storageData = "localStorage") => {
  const currentStorage = storageData[storeType];

  return {
    setStorage: <T>(key: string, value: T) => {
      const stringifiedValue = JSON.stringify(value);
      currentStorage.setItem(key, stringifiedValue);
    },

    getStorage: <T>(key: string): T | null => {
      const storageStringValue = currentStorage.getItem(key);
      if (storageStringValue) {
        try {
          const parsedValue = JSON.parse(storageStringValue) as T;
          return parsedValue;
        } catch (error) {
          console.error("Failed to parse stored value:", error);
          return null;
        }
      }
      return null;
    },

    clearStorage: (key: string) => {
      currentStorage.removeItem(key);
    },
  };
};
