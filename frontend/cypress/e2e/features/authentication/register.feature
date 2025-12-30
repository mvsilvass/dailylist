# language: pt

Funcionalidade: Cadastro

  Contexto:
    Dado que o usuário está na página de cadastro

  Cenário: Cadastro realizado com sucesso
    Quando o usuário preenche o formulário com um e-mail não registrado
    E preenche os demais campos com dados válidos
    E envia o formulário de cadastro
    Então o sistema exibe uma mensagem de sucesso informando que o cadastro foi realizado

  Cenário: Cadastro não realizado com e-mail já cadastrado
    Quando o usuário preenche o formulário com um e-mail já cadastrado
    E preenche os demais campos com dados válidos
    E envia o formulário de cadastro
    Então o sistema bloqueia o cadastro e exibe uma mensagem informando que o e-mail já está cadastrado

  Cenário: Cadastro não realizado com senhas diferentes
    Quando o usuário preenche o formulário com um e-mail não registrado
    E preenche o campo senha e confirmação com valores diferentes
    E envia o formulário de cadastro
    Então o sistema bloqueia o cadastro e exibe uma mensagem informando que as senhas não coincidem

  Cenário: Cadastro não realizado com e-mail inválido
    Quando o usuário preenche o formulário com um e-mail inválido
    E preenche os demais campos com dados válidos
    E envia o formulário de cadastro
    Então o sistema exibe uma mensagem de erro de validação

  Cenário: Cadastro não realizado com campos obrigatórios vazios
    Quando o usuário tenta enviar o formulário sem preencher os campos obrigatórios
    E envia o formulário de cadastro
    Então o sistema exibe uma mensagem de erro de validação
