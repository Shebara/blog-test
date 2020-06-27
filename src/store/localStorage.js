export const loadState = (name) => {
    try {
      const savedData = localStorage.getItem(name);
      if (savedData === null) {
        return [];
      }
      return JSON.parse(savedData);
    } catch (err) {
      return [];
    }
  }; 

  export const saveState = (name, data) => {
    try {
      const dataToSave = JSON.stringify(data);
      localStorage.setItem(name, dataToSave);

      return true;
    } catch {
      return false;
    }
  };