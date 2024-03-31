const body = document.getElementById('block-login');
let user;

myStorage = window.localStorage;

const renderLoginBody = `
<div id="block-login" class="add-form add-form__login">
    <h1>Авторизация</h1>
    <input type="text" id="name-login" class="add-form-name" placeholder="Введите ваше имя" />
    <input type="text" id="password-login" class="add-form-name" placeholder="Введите пароль">
    <div class="add-form-row">
        <button id="signin-button" class="add-form-button">Войти</button>
        <button id="change-button" class="add-form-button add-form-button__sub">Зарегестрироваться</button>
    </div>
</div>`;

const renderRegistrBody = `
<div id="block-login" class="add-form add-form__login">
    <h1>Регистрация</h1>
    <input type="text" id="login-login" class="add-form-name" placeholder="Придумайте логин" />
    <input type="text" id="name-login" class="add-form-name" placeholder="Введите ваше имя" />
    <input type="text" id="password-login" class="add-form-name" placeholder="Придумайте пароль">
    <input type="text" id="password-verification" class="add-form-name" placeholder="Введите пароль повторно">
    <div class="add-form-row">
        <button id="signin-button" class="add-form-button">Регистрация</button>
        <button id="change-button" class="add-form-button add-form-button__sub">Авторизоваться</button>
    </div>
</div>`;

let renderNow = renderLoginBody;

function renderLogin(bodyInput) {
    body.innerHTML = bodyInput;
    console.log('Render is OK')

    const buttonChange = document.getElementById('change-button');

    buttonChange.addEventListener("click", (event) => {
        console.log('Change button is press')

        event.stopPropagation();

        if (renderNow === renderLoginBody) {
            renderNow = renderRegistrBody;
        } else if (renderNow === renderRegistrBody) {
            renderNow = renderLoginBody;
        }
        renderLogin(renderNow);
    });

    const loginLogin = document.getElementById('login-login');
    const nameLogin = document.getElementById('name-login');
    const passwordLogin = document.getElementById('password-login');
    const verificationLogin = document.getElementById('password-verification');
    const buttonSignin = document.getElementById('signin-button');

    buttonSignin.addEventListener("click", (event) => {
        if (renderNow === renderLoginBody) {
            fetch("https://wedev-api.sky.pro/api/user/login", {
                method: "POST",
                body: JSON.stringify({
                    login: nameLogin.value,
                    password: passwordLogin.value
                })
            })
            .then((response) => {
                return response.json()
            })
            .then((responseData) => {
                localStorage.setItem("token", responseData.user.token)
                window.location.assign("index.html");
            })
        }
        if (renderNow === renderRegistrBody) {
            passwordLogin.classList.remove("error")
            verificationLogin.classList.remove("error")
            if (passwordLogin.value === verificationLogin.value) {
                fetch("https://wedev-api.sky.pro/api/user/login", {
                method: "POST",
                body: JSON.stringify({
                    login: nameLogin.value,
                    password: passwordLogin.value
                })
                })
                .then((response) => {
                    return response.json()
                })
                .then((responseData) => {
                    localStorage.setItem("token", responseData.user.token)
                    window.location.assign("index.html");
                })
            } else {
                passwordLogin.classList.add("error")
                verificationLogin.classList.add("error")
                alert('Пароли не совпадают')
            }
        }
    });
}

renderLogin(renderNow);

