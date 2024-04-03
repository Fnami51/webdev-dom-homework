const commentItems = document.getElementById('comments');
const inputForm = document.getElementById('form')

import { twoDigits } from '/secondary-functions.js';

const commentForm = `
<input type="text" id="comment-author" class="add-form-name" placeholder="Введите ваше имя" />
<textarea type="textarea" id="comment-text" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
<div class="add-form-row">
  <button id="comment-button" class="add-form-button">Написать</button>
</div>`;

const loginLink = `<a class="login-link" href="login.html">Чтобы добавить комментарий, авторизуйтесь</a>`;

export function renderComments({firstLaunch,comments}) {
    if (firstLaunch) {
      if (!navigator.onLine) {
        commentItems.innerHTML = `<p>Извините, но у вас проблемы с интернетом 😕</p>`;
      } else {
        commentItems.innerHTML = `Подождите, коментарии загружаются ...`;
      }
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
            renderComments({firstLaunch,comments});
          }
          if (!position) {
            comments[index].likes = comments[index].likes - 1;
            comments[index].isLiked = Boolean(0);
            renderComments({firstLaunch,comments});
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

  export function renderForm() {
    let tokenIs = Boolean(localStorage.getItem("token"))
    if(tokenIs) {
      inputForm.innerHTML = commentForm;
      inputForm.classList.remove("login-box")
    } else {
      inputForm.innerHTML = loginLink;
      inputForm.classList.add("login-box")
    }
  }