import express = require('express');
import { send } from './email';
import { Media } from './media';
import { CadastroDeMatricula } from './cadastroDeMatricula';
import { Matricula } from '../common/matricula';
import bodyParser = require("body-parser");
import { Aluno } from '../common/aluno';
import { CadastroDeAlunos } from './cadastrodealunos';

var server = express();

var cadastroMatricula: CadastroDeMatricula = new CadastroDeMatricula();
var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
server.use(allowCrossDomain);

server.use(bodyParser.json());


server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

//stub para teste de e-mail{
let turmas = {
  ess2018: [
    [
      {
        nome: "pedro",
        cpf: "089",
        metas: ["MA"],
        email: "phcl@cin.ufpe.br",
        media: 6
      }
    ]
  ]
}

let avaliacao = []

server.get('/email/teste', function (req, res) {
  res.send(turmas);
});



server.get('/email/:user/turma', function (req, res) {
  send(req.params.user.toString(), "Nova turma disponível", "Você foi cadastrado numa nova turma no sistema Teaching Assistant!");
  res.send({ text: "Email enviado" });
});

server.get('/email/:user/meta', function (req, res) {
  send(req.params.user.toString(), "Nova meta disponível", "Você possui uma nova meta cadastrada!");
  res.send({ text: "Email enviado" });
});

server.get('/email/:user/final', function (req, res) {
  send(req.params.user.toString(), "Situação: Final", "Infelizmente você ficou na final, estude mais da próxima vez!");
  res.send({ text: "Email enviado" });
});

server.get('/email/:user/media', function (req, res) {
  send(req.params.user.toString(), "Nova meta disponível", "Você possui uma média disponível!");
  res.send({ text: "Email enviado" });
});




//matricula

server.get('/matriculas', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastroMatricula.getMatriculas()));
});


server.post('/matricula', function (req: express.Request, res: express.Response) {
  var matricula: Matricula = <Matricula>req.body;
  matricula = cadastroMatricula.cadastrar(matricula);
  if (matricula) {
    res.send({ "success": "A matricula foi cadastrada com sucesso" });
  } else {
    res.send({ "failure": "A matricula não pode ser cadastrada" });
  }
});

server.put('/matricula', function (req: express.Request, res: express.Response) {
  var matricula: Matricula = <Matricula>req.body;
  var m = cadastroMatricula.atualizar(matricula);
  if (m) {
    res.send({ "success": "A matricula foi atualizada com sucesso" });
  } else {
    res.send({ "failure": "A matricula não pode ser atualizada" });
  }
});

// media
server.put('/media', function (req, res) {
  var matricula: Matricula = <Matricula> req.body;
  this.matricula.media = this.calcularMedia();
  res.send({"success": "Média do aluno calculada com sucesso."})
})


server.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

server.post('/aluno', function (req: express.Request, res: express.Response) {
  let aluno: Aluno = <Aluno>req.body;
  aluno = cadastro.cadastrar(aluno);
  if (aluno != null) {
    res.send({ "SUCESSO": "O aluno foi cadastrado com sucesso!" });
  } else {
    res.send({ "FALHA": "O aluno não pode ser cadastrado." });
  }
})

server.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno>req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno != null) {
    res.send({ "SUCESSO": "O aluno foi atualizado com sucesso!" });
  } else {
    res.send({ "FALHA": "O aluno não pode ser atualizado." });
  }
})
