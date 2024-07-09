export const convertTimestamps = (data: any) => {
  for (const key in data) {
    if (data[key] instanceof Object && data[key].toDate) {
      data[key] = data[key].toDate().toISOString();
    } else if (typeof data[key] === "object") {
      convertTimestamps(data[key]);
    }
  }
  return data;
};