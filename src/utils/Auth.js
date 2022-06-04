class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  register = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then(this._checkResponse)
    .then((res) => {
      return res
    })
    .catch((err) => console.log(err))
  }

  authorize = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then(this._checkResponse)
    .then((res) => {
      return res
    })
  }
  
  getContent = jwt => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
    .catch((err) => console.log(err))
  } 
}

export const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co'
})