// Traduz para português brasileiro a autenticação do Firebase
firebase.auth().languageCode = "pt-BR"

// Função que trata a submissão do formulário de autenticação
authForm.onsubmit = function (event) {
  showItem(loading)
  event.preventDefault()
  if (authForm.submitAuthForm.innerHTML == 'Acessar') {
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
      showError('Falha no acesso: ', error)
    })
  } else {
    firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function (error) {
      showError('Falha no cadastro: ', error)
    })
  }
}

// Função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function (user) {
  hideItem(loading)
  if (user) {
    showUserContent(user)
  } else {
    showAuth()
  }
})

// Função que permite a saida do usuária da sua conta
function signOut() {
  firebase.auth().signOut().catch(function (error) {
    showError('Falha ao sair da conta: ', error)

  })
}

// Função que permite ao usuário fazer a verificação do email

function sendEmailVerification() {
  showItem(loading)
  var user = firebase.auth().currentUser
  user.sendEmailVerification(actionCodeSttings).then(function () {
    alert('E-mail de verifiação foi enviado para ' + user.email + '! Verifique sua caixa de entrada')
  }).catch(function (error) {
    showError('Falha ao enviar mensagem de verificação de e-mail: ', error)

  }).finally(function () {
    hideItem(loading)
  })
}

// Função que permite o usuário redefinir sua senha
function sendPasswordResetEmail() {
  var email = prompt('Redefinir senha! Informe seu endereço de email.', authForm.email.value)
  if (email) {
    showItem(loading)
    firebase.auth().sendPasswordResetEmail(email, actionCodeSttings).then(function () {
      alert('E-mail de redefinição de senha foi enviado para ' + email + '.')
    }).catch(function (error) {
      showError('Houve um erro no envio do e-mail de redefinição de senha! ', error)

    }).finally(function () {
      hideItem(loading)
    })
  } else {
    alert('É preciso preencher o compo de e-mail para redefinição da senha!')
  }
}

// Função que permite a autenicação pelo Google
function signInWithGoogle() {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (error) {
    showError('Houve um erro ao autenticar usando o Google! ', error)

    hideItem(loading)
  })
}

// Atualizar nome do usuário
function updateUserName() {
  var newUserName = prompt('Informe o novo nome de usuário', userName.innerHTML)
  if (newUserName && newUserName != '') {
    userName.innerHTML = newUserName
    showItem(loading)
    firebase.auth().currentUser.updateProfile({
      displayName: newUserName
    }).catch(function (error) {
      showError('Houve um erro ao atualizar o mome do usuário ', error)

    }).finally(function () {
      hideItem(loading)
    })
  } else {
    alert('O nome do usuário não pode ser em branco')
  }
}

// Função que permite mover conta de usuários
function deleUserAccout() {
  var confimation = confirm('Deseja realmente desativar o usuário?')
  if (confimation) {
    showItem(loading)
    firebase.auth().currentUser.delete().then(function () {
      alert('Conta excluida com sucesso.')
    }).catch(function (error) {
      showError('Houve um erro ao tentar excluir sua conta. ', error)

    }).finally(function () {
      hideItem(loading)
    })
  }
}

