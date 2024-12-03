export const fetchUrl = (url, callback) => {
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        res.json().then((res) => callback(res));
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch((e) => console.log(e.message));
};
