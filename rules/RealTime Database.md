# Padrão
{
  "rules": {
    ".read": false,
    ".write": false
  }
}

# Público
{
  "rules": {
    ".read": ture,
    ".write": ture
  }
}

# Usuários autenticados
{
  "rules": {
    ".read": "auth!= null",
    ".write": "auth!= null"
  }
}

# Acesso restrito ao dono dos dados
{
  "rules": {
    "users": {
      "$uid": {
      ".read": "$uid == auth.uid",
      ".write": "$uid == auth.uid"
    	}
    }
  }
}

# Incluindo regras de validação para os usuários
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid == auth.uid",
        ".write": "$uid == auth.uid",
        "$tid": {
          ".validate": 
            "newData.child('name').isString() && newData.child('name').val().length <= 50"
        }
      }
    }
  }
}
