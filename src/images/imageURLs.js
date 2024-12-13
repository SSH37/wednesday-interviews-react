export const imageURLMale = () => {
  const arr = [];
  for (let i = 0; i <= 94; i++) {
    arr.push(`https://randomuser.me/api/portraits/men/${i}.jpg`);
  }
  return arr;
};

export const imageURLFemale = () => {
  const arr = [];
  for (let i = 0; i <= 94; i++) {
    arr.push(`https://randomuser.me/api/portraits/women/${i}.jpg`);
  }
  console.log(arr);
  return arr;
};