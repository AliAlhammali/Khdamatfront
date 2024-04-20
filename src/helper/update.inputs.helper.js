export function updateToPatchData(oldObj, newObj) {
  const keysToUpdate = Object.keys(oldObj);
  const data = {};
  keysToUpdate.forEach(key => {
    if (oldObj[key] !== newObj[key]) {
      data[key] = oldObj[key];
    }
  });
  return data;
}
