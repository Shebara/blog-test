export const loadData = (name) => {
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

  export const saveData = (name, data) => {
    try {
      const dataToSave = JSON.stringify(data);
      localStorage.setItem(name, dataToSave);

      return true;
    } catch {
      return false;
    }
  };