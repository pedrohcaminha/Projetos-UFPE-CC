Feature: Como um Professor
         Quero poder visualizar uma lista de alunos em estado critico
         para que seja possivel dar assitencia a tais alunos

Scenario: Login bem sucedido
Given que estou na pagina "Login"
Given existe um professor com  cpf "12345"
When tentar fazer login com cpf "12345"
Then consigo acessar a pagina "Relatorio de alunos criticos"



Scenario: Login mal sucedido
Given que estou na pagina "Login"
Given existe um professor com  cpf "12345"
When tentar fazer login com cpf "12345"
Then nao consigo acessar a pagina "Relatorio de alunos criticos"


Scenario: Nao ha alunos matriculados
Given que estou na pagina "Relatorio de alunos criticos"
Given nao existem alunos matriculados no sistema
Then o sistema informa que nao ha alunos no sistema para serem avaliados