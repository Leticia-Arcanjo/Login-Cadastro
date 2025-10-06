const formBox = document.querySelector(".form-box");
const formTitle = document.getElementById("form-title");
const nameGroup = document.getElementById("name-group");
const phoneGroup = document.getElementById("phone-group");
const actionBtn = document.getElementById("action-btn");
const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
const message = document.getElementById("message");

let isLogin = true;

// alterna entre login e cadastro
toggleLink.addEventListener("click", toggleMode);

function toggleMode() {
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = "Login";
    actionBtn.textContent = "Entrar";
    nameGroup.classList.add("hidden");
    phoneGroup.classList.add("hidden");
    toggleText.innerHTML = `Não tem conta? <span id="toggle-link">Cadastre-se</span>`;
  } else {
    formTitle.textContent = "Cadastro";
    actionBtn.textContent = "Cadastrar";
    nameGroup.classList.remove("hidden");
    phoneGroup.classList.remove("hidden");
    toggleText.innerHTML = `Já tem conta? <span id="toggle-link">Faça login</span>`;
  }

  // reatribui o evento porque o span foi recriado
  document.getElementById("toggle-link").addEventListener("click", toggleMode);
  message.textContent = "";
}

// botão principal
actionBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (isLogin) {
    loginUser(email, password);
  } else {
    if (!name || !email || !phone || !password) {
      showMessage("Preencha todos os campos!", "error");
      return;
    }
    registerUser(name, email, phone, password);
  }
});

// cadastro
function registerUser(name, email, phone, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find((u) => u.email === email)) {
    showMessage("E-mail já cadastrado!", "error");
    return;
  }

  users.push({ name, email, phone, password });
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Cadastro realizado com sucesso! Faça login.", "success");

  setTimeout(() => {
    toggleMode();
  }, 1500);
}

// login
function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    showWelcome(user);
  } else {
    showMessage("E-mail ou senha incorretos!", "error");
  }
}

// tela pós-login
function showWelcome(user) {
  formBox.innerHTML = `
    <h2>Bem-vindo(a), ${user.name}!</h2>
    <p><strong>E-mail:</strong> ${user.email}</p>
    <p><strong>Celular:</strong> ${user.phone}</p>
    <button id="logout-btn">Sair</button>
  `;

  document.getElementById("logout-btn").addEventListener("click", () => {
    location.reload();
  });
}

function showMessage(text, type) {
  message.textContent = text;
  message.style.color = type === "error" ? "red" : "green";
}
