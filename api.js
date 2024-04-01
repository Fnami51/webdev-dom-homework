export function getTodo() {
  return fetch("https://wedev-api.sky.pro/api/v2/fnami/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 500) {
      alert("Сервер сломался, попробуй позже 😕");
      throw new Error("Ошибка сервира (500)");
    } else {
      alert("Кажется, что то пошло не так. Попробуйде другой раз");
      throw new Error("Ошибка");
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
      alert("Сервер сломался, попробуй позже 😕");
      throw new Error("Ошибка сервира (500)");
    } else if (response.status === 400) {
      alert(
        "Врят ли ваше имя состоит из двух букв. Введите текст и имя не менее 3 букв.",
      );
      throw new Error("Ошибка ввода");
    } else {
      alert("Кажется, что-то не так. Попробуйте в другой раз");
      throw new Error("Ошибка");
    }
  });
}
