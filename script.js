const commentItems = document.getElementById('comments');
const buttonAdd = document.getElementById('comment-button');
const nameElement = document.getElementById('comment-author');
const textElement = document.getElementById('comment-text');

function twoDigits(num) {
  if( num >= 0 && num <= 9) {
    return "0" + num;
  } else { 
    return "" + num;
  }
}

function cheakOnline() {if (!navigator.onLine) {
  commentItems.innerHTML = `<p class="comment-text">Извините, но у вас проблемы с интернетом 😕</p>`;
  buttonAdd.disabled = false;
  buttonAdd.textContent = "Написать";
}}

cheakOnline()

let comments = [];
let firstLaunch = true;

const reguestAPI = () => {
  cheakOnline()
  fetch("https://wedev-api.sky.pro/api/v1/fnami/comments", {
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
  .then((responseData) => {
    comments = responseData.comments;
    firstLaunch = false;
    renderComments();
  })
  .catch((error) => {
    buttonAdd.disabled = false;
    buttonAdd.textContent = "Написать";
    firstLaunch = true;
  });
};

reguestAPI();

const renderComments = () => {
  if (firstLaunch) {
    commentItems.innerHTML = `Подождите, коментарии загружаются ...`;
    cheakOnline()
  } else{
    const commentHtml = comments.map((comment, index) => {
    let dateNoFormat = new Date(comment.date)

    let dateString = twoDigits(dateNoFormat.getDate()) + "." + twoDigits(dateNoFormat.getMonth() + 1) + "." + dateNoFormat.getFullYear() + " " + twoDigits(dateNoFormat.getHours()) + ":" + twoDigits(dateNoFormat.getMinutes())

    if (Boolean(comment.isLiked)) {
      return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${dateString}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button -active-like" data-index="${index}" data-position="${comment.isLiked}"></button>
          </div>
        </div>
      </li>`;
    } else {
      return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.author.name}</div>
          <div>${dateString}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button" data-index="${index}" data-position="${comment.isLiked}"></button>
          </div>
        </div>
      </li>`;
    }
    }).join("");

    commentItems.innerHTML = commentHtml;

    const buttonLikes = document.querySelectorAll('.like-button')

    for (const button of buttonLikes) {
      button.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = Number(button.dataset.index);

        let position = Boolean(Number(comments[index].isLiked));
              
        position = !position;
              
        if (position) {
          comments[index].likes = comments[index].likes + 1;
          comments[index].isLiked = Boolean(1);
          renderComments();
        }
        if (!position) {
          comments[index].likes = comments[index].likes - 1;
          comments[index].isLiked = Boolean(0);
          renderComments();
        }
      })
    }

    const commentElement = document.querySelectorAll(".comment")

    for (const comment of commentElement) {
      comment.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = Number(comment.dataset.index);

        textElement.value = `↪️ ${comments[index].text}\n\n${comments[index].author.name}, `;
      })
    }
  }
}

renderComments()

buttonAdd.addEventListener("click", () => {

  nameElement.classList.remove("error");
  textElement.classList.remove("error");
  buttonAdd.classList.remove("error-for-button");

  let regexp = new RegExp('^[а-яёa-zА-ЯЁA-Z0-9↪️]');

  if (nameElement.value === "" || textElement.value === "" || !regexp.test(nameElement.value) || !regexp.test(textElement.value)) {
    nameElement.classList.add("error");
    textElement.classList.add("error");
    buttonAdd.classList.add("error-for-button");
    return;
  }

  buttonAdd.disabled = true;
  buttonAdd.textContent = "Ожидайте";

  cheakOnline()

  fetch("https://wedev-api.sky.pro/api/v1/fnami/comments", {
    method: "POST",
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
      forceError: true
    })
  })
  .then((response) => {
    if (response.status === 201) {
      return response.json()
    }  else if (response.status === 500) {
      alert("Сервер сломался, попробуй позже 😕")
      throw new Error ("Ошибка сервира (500)")
    } else if (response.status === 400) {
      alert("Врят ли ваше имя состоит из двух букв. Введите текст и имя не менее 3 букв.")
      throw new Error ("Ошибка ввода")
    } else {
      alert("Кажется, что-то не так. Попробуйте в другой раз")
      throw new Error ("Ошибка")
    }
  })
  .then((responseData) => {
    comments = responseData.comments;
    reguestAPI();
    nameElement.value = "";
    textElement.value = "";
    buttonAdd.disabled = false;
    buttonAdd.textContent = "Написать";
  })
  .catch((error) => {
    buttonAdd.disabled = false;
    buttonAdd.textContent = "Написать";
  })
    
  reguestAPI();
});
