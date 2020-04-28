Cenário 1: Notificação de ter sido cadastrado em uma nova turma
Given que foi criada uma turma "ess2018"
And nessa turma nova existe um aluno “pedro” com email "phcl@cin.ufpe.br"
When a nova turma for criada
Then será enviado um e-mail a “pedro” em "phcl@cin.ufpe.br" com a mensagem de que ele foi cadastrado numa nova turma

Cenário 2: Notificação de Nova meta cadastrada
Given existe um aluno "pedro" com email "phcl@cin.ufpe.br"
And esse aluno esta matriculado na turma "ess2018"
When uma nova meta for cadastrada para o aluno pedro
Then será enviado um e-mail a “pedro” em "phcl@cin.ufpe.br" com a mensagem de que ele possui uma nova meta cadastrada

Cenário 3: Notificação de Média
Given existe um aluno "pedro" com email "phcl@cin.ufpe.br"
And esse aluno esta matriculado na turma "ess2018"
When uma média for calculada para o aluno pedro
Then será enviado um e-mail a “pedro” em "phcl@cin.ufpe.br" com a mensagem de que ele possui uma nova média disponível

Cenário 4: Notificação de situação pós-final
Given existe um aluno "pedro" com email "phcl@cin.ufpe.br"
And esse aluno esta matriculado na turma "ess2018"
And a média final do aluno "pedro" for inferior a 7
When a média final estiver disponível
Then será enviado um e-mail a “pedro” em "phcl@cin.ufpe.br" com a mensagem de que ele ficou na final
