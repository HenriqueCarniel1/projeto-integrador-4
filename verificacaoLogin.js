// Função de login
async function login() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const response = await fetch('/usuario/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  });

  const data = await response.json();

  if (response.ok) {
    // Armazena o token, nome e ID do usuário no localStorage
    localStorage.setItem('nome', data.nome); 
    localStorage.setItem('id', data.id);  // Ajustado para 'idusuario' com base no backend
    localStorage.setItem('token', data.token); // Armazena o token JWT
    exibirNomeUsuario(data.nome); // Exibe o nome do usuário na interface
    // Exibe a mensagem de usuário logado na interface
    alert(`Bem-vindo, ${data.nome}! Você está logado.`);
    // Redirecionar ou realizar outra ação, se necessário
  } else {
    alert(data.message); // Mostra erro, se houver
  }
}


// Função de logout
function logout() {
  const popupExistente = document.getElementById('popup-logout');
  if (popupExistente) {
    popupExistente.remove();
  }

  const popUp = document.createElement('div');
  popUp.id = 'popup-logout';
  popUp.style.position = 'fixed';
  popUp.style.top = '0';
  popUp.style.left = '0';
  popUp.style.width = '100vw';
  popUp.style.height = '100vh';
  popUp.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  popUp.style.display = 'flex';
  popUp.style.justifyContent = 'center';
  popUp.style.alignItems = 'center';
  popUp.style.zIndex = '9999';

  popUp.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; max-width: 400px; width: 100%;">
      <h5>Deseja sair?</h5>
      <p>Tem certeza que deseja fazer logout?</p>
      <button id="confirmarLogout" class="btn btn-danger" style="margin-right: 10px;">Sim</button>
      <button id="cancelarLogout" class="btn btn-secondary">Cancelar</button>
    </div>
  `;

  document.body.appendChild(popUp);

  document.getElementById('confirmarLogout').addEventListener('click', function () {
    localStorage.clear();
    exibirNomeUsuario('');
    location.reload();
  });

  document.getElementById('cancelarLogout').addEventListener('click', function () {
    popUp.remove();
  });
}

// Função para exibir o nome do usuário
function exibirNomeUsuario(nome) {
  const usuarioNomeElement = document.getElementById('usuarioNome');
  const cadastroLink = document.getElementById('cadastroLink');
  const entrarLink = document.getElementById('entrarLink');
  const logoutButton = document.getElementById('logoutButton');

  if (nome && nome.trim() !== '') {
    usuarioNomeElement.innerText = `Bem-vindo, ${nome}!`;
    usuarioNomeElement.classList.remove('d-none'); // Remove a classe d-none para exibir
    cadastroLink.classList.add('d-none'); // Oculta o link de cadastro
    entrarLink.classList.add('d-none'); // Oculta o link de entrar
    logoutButton.classList.remove('d-none'); // Mostra o botão de logout
  } else {
    usuarioNomeElement.classList.add('d-none'); // Adiciona d-none para esconder
    cadastroLink.classList.remove('d-none'); // Mostra o link de cadastro
    entrarLink.classList.remove('d-none'); // Mostra o link de entrar
    logoutButton.classList.add('d-none'); // Oculta o botão de logout
  }
}

// Função para exibir o botão de adicionar produto com base no login do usuário
function exibirBotaoAdicionarProduto() {
  const nomeUsuario = localStorage.getItem('nome'); // Obtém o nome do usuário do localStorage
  const usuarioLogado = nomeUsuario && nomeUsuario.trim() !== ''; // Verifica se o usuário está logado
  const btnAdicionarProduto = document.getElementById('btnAdicionarProduto');

  if (usuarioLogado) {
    btnAdicionarProduto.classList.remove('d-none'); // Mostra o botão se o usuário estiver logado
  } else {
    btnAdicionarProduto.classList.add('d-none'); // Oculta o botão se o usuário não estiver logado
  }
}

// Ao carregar a página
window.onload = function() {
  const nome = localStorage.getItem('nome');
  const usuarioId = localStorage.getItem('usuarioId'); // Obtém o ID do usuário

  exibirNomeUsuario(nome);
  exibirBotaoAdicionarProduto();

  if (nome && nome.trim() !== '') {
    // Se o usuário estiver logado, exibe a mensagem de logado

  }
};
