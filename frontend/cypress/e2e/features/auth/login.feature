# language: pt

Funcionalidade: Login

  Contexto:
    Dado que o usuário está na página de login

  Cenário: Login realizado com sucesso
    Quando o usuário preenche o formulário com um e-mail e senha cadastrados
    E envia o formulário de login
    Então o sistema redireciona o usuário para a página inicial

  Cenário: Login não realizado com usuário não cadastrado
    Quando o usuário preenche o formulário com um e-mail e senha não cadastrados
    E envia o formulário de login
    Então o sistema exibe uma mensagem de erro de autenticação

  Cenário: Login não realizado com senha incorreta
    Quando o usuário preenche o formulário com um e-mail cadastrado e senha incorreta
    E envia o formulário de login
    Então o sistema exibe uma mensagem de erro de autenticação

  Cenário: Login não realizado com e-mail em formato inválido
    Quando o usuário preenche o formulário com um e-mail em formato inválido
    E envia o formulário de login
    Então o sistema exibe uma mensagem de erro de validação no login

  Cenário: Login não realizado com campos vazios
    Quando o usuário não preenche os campos obrigatórios
    E envia o formulário de login
    Então o sistema exibe uma mensagem de erro de validação no login
