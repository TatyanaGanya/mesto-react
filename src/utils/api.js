
class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _check(res){
        if (res.ok) {
          return res.json();
        } // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
     }   

//загрузка профиля с сервера
getInitialInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
       .then(this._check)
    }

//загрузка карточки с сервера
getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
        .then(this._check)
    }
    
///card
    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.image,
            })
        })
        .then(this._check)
    }

// профиль
    setUserInfo(data){
        return fetch (`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: data.profileName,
              about: data.profileJob
            })
        })
        .then(this._check)
    }

//avatar
    setUserAvatar(data){
        return fetch (`${this._url}/users//me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              avatar: data.avatar
            })
        })
        .then(this._check)
    }

///like
    addLike(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
         })
        .then(this._check)
    }

    deleteLike(data) {
        return fetch(`${this._url}/cards/${data}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._check)
    }

    deleteCard(data) {
        return fetch(`${this._url}/cards/${data}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._check)
    } 
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: '69b59d5b-f26f-4db1-9d60-b5f1c83af874',
      'Content-Type': 'application/json'
    }
  }); 

export default api

