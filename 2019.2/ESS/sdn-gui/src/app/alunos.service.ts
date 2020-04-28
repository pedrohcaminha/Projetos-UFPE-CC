import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Aluno } from '../../../common/aluno';

@Injectable()
export class AlunoService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private sdnURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    cadastrarAluno(aluno: Aluno): Observable<Aluno> {
        return this.http.post<any>(this.sdnURL + "/aluno", aluno, { headers: this.headers })
            .pipe(
                retry(2),
                map(res => { if (res.success) { return aluno; } else { return null; } })
            );
    }

    atualizar(aluno: Aluno): Observable<Aluno> {
        return this.http.put<any>(this.sdnURL + "/aluno", JSON.stringify(aluno), { headers: this.headers }).pipe(
            retry(2),
            map(res => { if (res.success) { return aluno; } else { return null; } })
        );
    }

    getAlunos(): Observable<Aluno[]> {
        return this.http.get<Aluno[]>(this.sdnURL + "/alunos")
            .pipe(
                retry(2)
            );
    }

}
