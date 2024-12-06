export const fetchUrl = (url, callback, options) => {
    try {
      fetch(url,options).then((res) => {
        if (res.ok) {
          res.json().then((res) => callback(res));
        } else {
          throw new Error(res.statusText);
        }
      });
    } catch (e) {
      console.error(e.message);
    }
};
