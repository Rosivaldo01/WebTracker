// Trta da submissão  do formulário de tarefas
webForm.onsubmit = function (event) {
  event.preventDefault()//Evita o redirecionamento da página
  if (webForm.name.value && webForm.registration.value && webForm.task.value != '') {
    var data = {
      name: webForm.name.value,
      registration: webForm.registration.value,
      task: webForm.task.value,
      
    }

    dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function () {
      console.log('Registro "' + data.name, data.registration, data.task + '" adicionanda com sucesso')

    }).catch(function (error) {
      showError('Falha ao adicionar o registro: ', error)
    })

     webForm.name.value = ''
     registration: webForm.registration.value = ''
      task: webForm.task.value = ''
  } else {
    alert('Os registros não podem ser vazias!')
  }
}

// Exibe a lista das tarefas do usuário
function fillWebList(dataSnapshot) {
  ulWebList.innerHTML = ''
  var num = dataSnapshot.numChildren()
  webCount.innerHTML = num + (num > 1 ? ' Usuáros' : ' Usuário') + ':' //Exibe na interfaçe o número de tarefas do usuário
  dataSnapshot.forEach(function (item) {// percorre todos os elementos da lista
    var value = item.val()
    var li = document.createElement('li') // cria um elemento do tipo li
    var spanLi = document.createElement('span') // Cria elemento do tipo spna
    spanLi.appendChild(document.createTextNode(value.name)) // Adiciona um elemento de texto dentro do nosso span
    spanLi.id = item.key // define o span li como a chave da tarefa
    li.appendChild(spanLi) // Adiciona o span dentro do li

    var liRemoveBtn = document.createElement('button') // cria um botão para a tarefa
    liRemoveBtn.appendChild(document.createTextNode('Excluir')) // define o texo do botão como 'exclluir'
    liRemoveBtn.setAttribute('onclick', 'removeList(\"'+ item.key +'\")') // Configura o onclik do botão de remoção da tarefa
    liRemoveBtn.setAttribute('class', 'danger listBtn') // define classe de estilização para nosso botão de remoção
    li.appendChild(liRemoveBtn)// Adiciona o botão de remoção no li

    var liUpdateBtn = document.createElement('button') // cria um botão para atualização da tarefa
    liUpdateBtn.appendChild(document.createTextNode('Editar')) // define o texo do botão como 'editar'
    liUpdateBtn.setAttribute('onclick', 'updatList(\"'+ item.key +'\")') // Configura o onclik do botão de atualização da tarefa
    liUpdateBtn.setAttribute('class', 'alternative listBtn') // define classe de estilização para nosso botão de atualização
    li.appendChild(liUpdateBtn)// Adiciona o botão de remoção no li

    ulWebList.appendChild(li) // Adiciona o li dentro das tarefas
  })
}

// Remove tarefas do BD
function removeList(key) {
  var selectedItem = document.getElementById(key)
  var confimation = confirm('Deseja realmente excluir o Registro \"' + selectedItem.innerHTML + '\"?')
  if(confimation){
    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().then(function () {
      console.log('Usuário "' + selectedItem.innerHTML + '" removida com sucesso')
    }).catch(function(error){
      showError('Falha ao remover o registro', error)
    })
  }
}

// Atualiza as tarefas

function updatList(key) {
  var selectedItem = document.getElementById(key)
  var newListName = prompt('Informe o nove nome da tarefa\"' + selectedItem.innerHTML +'\".',selectedItem.innerHTML)
  if(newListName != '') {
    var data = {
      name: newListName
    }

    dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data).then(function () {
      console.log('Tarefa "' + data.name + '" atualizada com sucesso')
    }).catch(function(error){
      showError('Falha ao atualizar a tarefa', error)
    })
  }else{
    alert('O nome da tarefa não pode ser em branco para atualização!')
  }
}