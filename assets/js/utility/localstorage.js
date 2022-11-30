
let storedata = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

let getdata = (key) => {
  let data = JSON.parse(localStorage.getItem(key));
  return data;
};

export { storedata };
export { getdata };
