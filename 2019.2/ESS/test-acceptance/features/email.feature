Feature: Como um professor
         Quero que os meus alunos recebam notificacoes 
         Para que eles se mantenham informados

Scenario: Notificação de ter sido cadastrado em uma nova turma
Given que existe uma turma ess2018
Given nessa turma foi cadastrado um novo um aluno pedro com email phcl@cin.ufpe.br
When a nova turma for criada
Then será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele foi cadastrado numa nova turma

Scenario: Notificação de Nova meta cadastrada
Given que existe uma turma ess2018
Given nessa turma existe um aluno pedro com email phcl@cin.ufpe.br
When uma nova meta for cadastrada para o aluno pedro
Then será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele possui uma nova meta cadastrada

Scenario: Notificação de Média
Given que existe uma turma ess2018
Given nessa turma existe um aluno pedro com email phcl@cin.ufpe.br
When uma média for calculada para o aluno pedro
Then será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele possui uma nova média disponível

Scenario: Notificação de situação pós-final
Given que existe uma turma ess2018
Given nessa turma existe um aluno pedro com email phcl@cin.ufpe.br
Given a média final do aluno pedro for inferior a 7
When a média final estiver disponível
Then será enviado um e-mail a pedro em phcl@cin.ufpe.br com a mensagem de que ele ficou na final
