import { Matricula } from '../../../../common/matricula';
import { MatriculaRepositorio } from './matricula-repositorio';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class MatriculaService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private taURL = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    atualizar(matricula: Matricula): Observable<Matricula> {
        return this.http.put<any>(this.taURL + "/matricula", JSON.stringify(matricula), { headers: this.headers }).pipe(
            retry(2),
            map(res => { if (res.success) { return matricula; } else { return null; } })
        );
    }

    criar(matricula: Matricula): Observable<Matricula> {
        return this.http.post<any>(this.taURL + "/matricula", matricula,
            { headers: this.headers })
            .pipe(
                retry(2),
                map(res => { if (res.success) { return matricula; } else { return null; } })
            );
    }

    all() {
        var M: Matricula[] = new MatriculaRepositorio().getMatriculas();
        for (var index in M) {
            this.criar(M[index]).subscribe(
                () => {
                    document.location.reload(true);
                });
        }
    }

    deletar() {

    }

    getMatriculas(): Observable<Matricula[]> {
        return this.http.get<Matricula[]>(this.taURL + "/matriculas")
            .pipe(
                retry(2)
            );
    }
}