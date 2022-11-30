async function handleResponse(name, method, body) {
  let obj;
  if (method === "POST") {
    obj = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  const response = await fetch("http://localhost:3000/" + name, obj);
  const users = await response.json();
  return users;
}

async function makeAPI(method, name, body) {
  let arr = [];
  try {
    arr = await handleResponse(method, name, body);
  } catch (error) {
    console.log(error);
  }
  return arr;
}

export { makeAPI };

