import { nameElement, textElement, buttonAdd } from './main.js';



export function cheakOnline() {if (!navigator.onLine) {
    alert("Извините, но у вас проблемы с интернетом 😕")
    commentItems.innerHTML = `<p>Извините, но у вас проблемы с интернетом 😕</p>`;
    buttonAdd.disabled = false;
    buttonAdd.textContent = "Написать";
  }} 

export function twoDigits(num) {
    if( num >= 0 && num <= 9) {
      return "0" + num;
    } else { 
      return "" + num;
    }
  }