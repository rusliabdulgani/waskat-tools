export const headerGetDataBarang = (url, headers) => {
  return {
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': headers.token
    }
  }
}