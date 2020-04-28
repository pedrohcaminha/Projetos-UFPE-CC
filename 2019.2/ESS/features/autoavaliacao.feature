Feature: Como um Aluno
         Quero registrar minhas autoavaliacoes
         para que o professor possa melhor gerenciar
         meu aprendizado

Scenario: Login bem sucedido
Given estou na pagina de Login
Given existe uma matricula com cpf "12345"
When tento fazer login com cpf "12345"
Then entro na pagina de registro de autoavaliacoes

Scenario: Login mal sucedido
Given estou na pagina de Login
Given nao existe uma matricula com cpf "7890"
When tento fazer login com cpf "7890"
Then recebo uma mensagem de login mal sucedido

Scenario: Registro de autoavaliacoes mal sucedido 
Given estou na pagina de registro de autoavaliacoes
Given logado como "Beltrano" de cpf "45678"
Given preencho a meta "Requisitos" com "MA"
Given preencho a meta "GerenciaDeConfiguracao" com "-"
When tento registrar as autoavaliacoes
Then recebo uma mensagem de preenchimento mal sucedido
Then volto para pagina de registro de autoavaliacoes

Scenario: Registro de autoavaliacoes bem sucedido
Given estou na pagina de registro de autoavaliacoes
Given logado como "Thiago" de cpf "8765"
Given preencho a meta "Requisitos" com "MA"
Given preencho a meta "GerenciaDeConfiguracao" com "MPA"
When tento registrar as autoavaliacoes
Then volto para pagina Login
