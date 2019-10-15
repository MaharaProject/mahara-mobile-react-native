export const ADD_TOKEN = 'ADD_TOKEN';

export function addToken(token) {
  return { type: ADD_TOKEN, token }
}
