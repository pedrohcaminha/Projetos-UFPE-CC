Scenario: cálculo da média pré-final dos alunos
    Given eu estou na página de “Confirmar médias”
    And as avaliações parciais já foram concluídas 
    When eu confirmo o cálculo das médias parciais
    Then eu vejo uma mensagem de confirmação 
    And vejo as médias parciais junto as notas dos alunos
    And os pontos extras foram devidamente repassados para os alunos “aprovados por média”

Scenario: cálculo da média pós-final dos alunos
    Given eu estou na página de “Confirmar médias”
    And as avaliações finais já foram feitas
    And os pontos extras foram devidamente repassados para os alunos com situação “não definida”
    When eu confirmo o cálculo das médias finais
    Then eu vejo uma mensagem de confirmação
    And eu vejo as médias finais junto as notas dos alunos
    
Scenario: cálculo da média da turma
    Given eu estou na página “Informações da turma”
    And todos os alunos tiveram suas médias calculadas
    When eu confirmo o cálculo de média da turma
    Then eu vejo uma mensagem de confirmação
    And eu vejo a média da turma junto as outras informações dela

Scenario:  alocação do ponto extra para alunos aprovados por média
    When eu confirmo o cálculo da média do aluno “A”
    And esse aluno está aprovado por média
    Then os pontos extras que ele ganhou são somados à média

Scenario: alocação do ponto extra para alunos que farão a final
    Given o aluno “F” fez a prova final   
    When eu confirmo a nota do aluno “F”
    Then os pontos extras do aluno são somados à nota da sua prova final
    And sua média final é devidamente calculada