export const weightListToGraphData = (weightList) => {
  let data = [];
  weightList.forEach((weightObj) => {
    console.log(weightObj.createdAt);
    data.push({
      x: weightObj.createdAt.substr(5, 5),
      y: weightObj.weight,
      label: weightObj.weight,
    });
  });

  return data;
};
