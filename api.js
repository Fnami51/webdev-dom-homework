export function getTodo() {
    return fetch("https://wedev-api.sky.pro/api/v1/fnami/comments", {
        method: "GET"
      })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 500) {
          alert("Сервер сломался, попробуй позже 😕")
          throw new Error ("Ошибка сервира (500)")
        } else {
          alert("Кажется, что то пошло не так. Попробуйде другой раз")
          throw new Error ("Ошибка")
        }
      })    
}