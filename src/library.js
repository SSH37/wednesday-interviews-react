export const fetchUrl = (url, callback, firstParty = false, options) => {
  try {
    if (firstParty){
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        if (options) {
          let { headers } = options;
          headers = { ...headers, Authorization: token };
          options = { ...options, headers };
        } else {
          let headers = { Authorization: token };
          options = { headers };
        }
      }
    }
    
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          res.json().then((res) => callback(res));
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  } catch (e) {
    console.error(e.message);
  }
};
