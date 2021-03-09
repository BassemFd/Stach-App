export default function (token = '', action) {
  if (action.type === 'ADD_TOKEN') {
    let newToken = action.token;
    return newToken;
  } else if (action.type === 'REMOVE_TOKEN') {
    let newToken = '';
    return newToken;
  } else {
    return token;
  }
}
