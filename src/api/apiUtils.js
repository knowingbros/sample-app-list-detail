// If there is a token then grab set it, if not then return nothing
export const tokenContextObj = token =>
  token
    ? {
        headers: {
          "Authorization": `JWT ${token}`
        }
      }
    : {};
