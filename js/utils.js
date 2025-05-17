// Definindo referência para elementos da página
var authForm = document.getElementById('authform')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')


var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')
var userEmail = document.getElementById('userEmail')
var sendEmailverificatonDiv = document.getElementById('sendEmailverificatonDiv')
var emailVerified = document.getElementById('emailVerified')
var passwordReset = document.getElementById('passwordReset')
var userName = document.getElementById('userName')
var userImg = document.getElementById('userImg')

// Aulterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar'
  hideItem(register) // Esconder atalho para cadastrar conta
  hideItem(passwordReset) // Esconder opção de  redifinição de  senha
  showItem(access) // Mosttar atalho para acessar conta
}

// Aulterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse sua conta para continuar'
  hideItem(access) // Esconder atalho para acessar conta
  showItem(passwordReset) // Mostrar a opção de redefinir senha
  showItem(register) // Mostar atalho para para cadastrar conta
}

// Simplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block'
}

// Simplifica a remoção de elementos da página
function hideItem(element) {
  element.style.display = 'none'
}

// Mostrar conteúdo para usuários autenticados
function showUserContent(user) {
  console.log(user)
  if (user.providerData[0].providerId != 'password') {
    emailVerified.innerHTML = 'Autenticação por provedor confiável, não é necessário a verificação do email'
    hideItem(sendEmailverificatonDiv)
  } else {
    if (user.emailVerified) {
      emailVerified.innerHTML = 'E-mail verificado'
      hideItem(sendEmailverificatonDiv)
    } else {
      emailVerified.innerHTML = 'E-mail não verificado'
      showItem(sendEmailverificatonDiv)
    }
  }


  userImg.src = user.photoURL ? user.photoURL : 'img/unknownUser.png'
  userName.innerHTML = user.displayName
  userEmail.innerHTML = user.email
  hideItem(auth)
  showItem(userContent)

}

// Mostrar conteúdo para usuários não autenticados
function showAuth() {
  authForm.email.value = ''
  authForm.password.value = ''
  hideItem(userContent)
  showItem(auth)
}

// Centralizar e traduzir erros
function showError(prefix, error) {
  console.log(error.code)
  hideItem(loading)
  switch (error.code) {
    case 'auth/invalid-email': alert(prefix + '' + 'E-mail inválido!')
    break;
    case 'auth/wrong-password': alert(prefix + '' + 'Campo senha obrigatório!')
    break;
    case 'auth/internal-error': alert(prefix + '' + 'Senha inválida')
    break;
    case 'auth/weak-password': alert(prefix + '' + 'A senha precisa ter ao menos 6 caracteres!')
    break;
    case 'auth/email-already-in-use': alert(prefix + '' + 'O e-mail ja possue uma conta!')
    break;
    case 'auth/popup-closed-by-user': alert(prefix + '' + 'A tela de popup foi fechada antes da autenticação ser concluída!')
    break;
     
    default: alert(prefix + '' + error.message)
  }
}

// Atributos extras de configuração de email
var actionCodeSttings = {
  url: 'http://127.0.0.1:5500/'
}