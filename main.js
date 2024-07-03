import { getTodo, postTodo } from '/api.js';
import { cheakOnline } from '/secondary-functions.js';
import { renderComments, renderForm } from '/render.js';

export const buttonAdd = document.getElementById('comment-button');
export const nameElement = document.getElementById('comment-author');
export const textElement = document.getElementById('comment-text');

let comments = [];
let firstLaunch = true;

export const reguestAPI = () => {
  cheakOnline()

  getTodo().then((responseData) => {
    comments = responseData.comments;
    firstLaunch = false;
    renderComments({ firstLaunch, comments });
  })
    .catch((error) => {
      alert(error.message)
    })
    .finally(() => {
      buttonAdd.disabled = false;
      buttonAdd.textContent = "Написать";
      firstLaunch = true;
    });
};

reguestAPI();

renderForm()
renderComments({ firstLaunch, comments })