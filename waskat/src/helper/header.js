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

export const headerDeleteUser = (url, headers) => {
  return {
    method: 'DELETE',
    url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'token': headers.token
    }
  }
}

export const headerAddUser = (url, headers, data) => {
  return {
    method: 'POST',
    url,
    headers: {
      'Accept': 'application/json',
      'enctype': 'multipart/form-data; boundary=Boundary_5_1772902226_1492706774665',
      'token': headers.token
    },
    data: data
  }
}

export const headerEditGambar = (url, headers, data) => {
  return {
    method: 'PUT',
    url,
    headers: {
      'Accept': 'application/json',
      'enctype': 'multipart/form-data; boundary=Boundary_5_1772902226_1492706774665',
      'token': headers.token
    },
    data: data
  }
}