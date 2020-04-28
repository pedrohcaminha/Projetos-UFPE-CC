Feature: Cadastro de alunos
        As a professor
        I want to cadastrar alunos
        So that eu possa gerenciar suas metas            

Scenario: Cadastrar aluno com CPF não cadastrado
        Given eu estou na página de alunos
        Given eu não consigo ver um com o CPF "119" na lista de alunos
        When eu tento cadastrar o aluno "Paulo" com CPF "119"
        Then eu consigo ver "Paulo" com o CPF "119" na lista de alunos

Scenario: Cadastrar aluno com CPF já cadastrado
        Given eu estou na página de alunos
        Given eu consigo ver um com o CPF "407" na lista de alunos
        When eu tento cadastrar o aluno "Paulo" com CPF "407"
        Then eu não consigo ver "Paulo" com o CPF "407" na lista de alunos
        And uma mensagem de erro é exibida

Scenario: Cadastrar aluno com CPF não cadastrado, serviço
        Given o sistema não possui um aluno com CPF "119"
        When eu registro o aluno "Paulo" com CPF "119"
        Then o sistema agora armazena "Paulo" com CPF "119"

Scenario: Cadastrar aluno com CPF já cadastrado, serviço
        Given o sistema possui um aluno com CPF "407"
        When eu registro o aluno "Paulo" com CPF "407"
        Then o sistema não armazena "Paulo" com CPF "407"
        And uma mensagem de erro "CPF já cadastrado!" é retornada
