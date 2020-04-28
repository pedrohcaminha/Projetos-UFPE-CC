Feature: Importação de alunos
        As a professor
        I want to importar a planilha de alunos
        So that eu possa cadastrar vários alunos de uma só vez

Scenario: Importação bem sucedida da planilha de alunos
        Given eu estou na página de alunos
        Given eu não consigo ver nenhum aluno cadastrado
        When eu seleciono a opção de importar
        When eu faço upload do arquivo "alunos.csv"
        Then eu consigo ver "Paulo" com o CPF "119"
        Then eu consigo ver "Victor" com o CPF "407"

Scenario: Importação mal sucedida da planilha de alunos
        Given eu estou na página de alunos
        Given eu não consigo ver nenhum aluno cadastrado
        When eu seleciono a opção de importar
        When eu faço upload do arquivo "alunos.pdf"
        Then uma mensagem de erro é exibida

Sccenario: Importação bem sucedida da planilha de alunos, serviço
       Given o sistema não possui nenhum aluno cadastrado
       When eu faço upload do arquivo "alunos.csv"
       Then o sistema armazena "Paulo" com CPF "119"
       Then o sistema armazena "Victor" com CPF "407"

Scenario: Importação mal sucedida da planilha de alunos, serviço
        Given o sistema não possui nenhum aluno cadastrado
        When eu faço upload do arquivo "alunos.pdf"
        Then o sistema não armazena nenhum aluno
        And uma mensagem de erro "Formato inválido!" é retornada