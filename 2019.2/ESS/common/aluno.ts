export class Aluno {
  nome: string;
  cpf: string;
  email: string;
  github: string;

  constructor() {
      this.nome = "";
      this.cpf = "";
      this.email = "";
      this.github = "";
  }

  clone(): Aluno {
      let aluno: Aluno = new Aluno();
      aluno.copyFrom(this);
      return aluno;
  }

  copyFrom(from: Aluno): void {
      this.nome = from.nome;
      this.cpf = from.cpf;
      this.email = from.email;
      this.github = from.github;
  }

  getNome(): string {
      return this.nome;
  }

  setNome(nome: string): void {
      this.nome = nome;
  }

  setCPF(cpf: string): void {
      this.cpf = cpf;
  }

  getCPF(): string {
      return this.cpf;
  }

  setEmail(email: string): void {
      this.email = email;
  }

  getEmail(): string {
      return this.email;
  }

  setGithub(github: string): void {
      this.github = github;
  }

  getGithub(): string {
      return this.github;
  }

}
