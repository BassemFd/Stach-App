export default function (token = '', action) {
  if (action.type === 'ADD_TOKEN') {
    let newToken = action.token;
    return newToken;
  } else {
    return token;
  }
}
