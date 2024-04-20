export function updateToPatchData(oldObj, newObj) {
  const keysToUpdate = Object.keys(oldObj);
  const data = {};
  keysToUpdate.forEach(key => {
    if (oldObj[key] !== newObj[key]) {
      data[key] = oldObj[key];
    }
  });
  if (oldObj.title.en !== newObj.title.en) {
    data.title.en = oldObj.title.en;
  }
  if (oldObj.title.ar !== newObj.title.ar) {
    data.title.ar = oldObj.title.ar;
  }

  return data;
}
