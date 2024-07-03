export function getTodo() {
  return fetch("https://wedev-api.sky.pro/api/v2/fnami/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже 😕");
    } else {
      throw new Error("Кажется, что то пошло не так. Попробуйде другой раз");
    }
  });
}

export function postTodo({ nameElement, textElement }) {
  const token = `Bearer ${localStorage.getItem("token")}`;
  return fetch("https://wedev-api.sky.pro/api/v2/fnami/comments", {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: JSON.stringify({
      name: nameElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      text: textElement.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      forceError: true,
    }),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже 😕");
    } else if (response.status === 400) {
      throw new Error("Врят ли ваше имя состоит из двух букв. Введите текст и имя не менее 3 букв.");
    } else {
      throw new Error("Кажется, что-то не так. Попробуйте в другой раз");
    }
  });
}
