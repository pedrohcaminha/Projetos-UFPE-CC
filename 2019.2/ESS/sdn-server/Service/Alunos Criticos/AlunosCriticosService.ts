// //Esse arquivo vai dentro de sdn-server
// import {Aluno} from '../../../common/aluno'; 

// export class AlunosCriticos{



// alunosCriticos(): Aluno[]{
//     //o servidor nao esta funcionando, mas arrayMatriculas seria o array com todas as
//     //matriculas ja armazenadas no servidor
    
//     let alunosCriticos: Aluno[] = [];
//     let contadorMANA: 0;
//     let contadorMPA: 0;

//     //essa funcao percorre todas as matriculas e verifica as notas dos alunos,
//     //Se ele possuir pelo menos 1 MANA ou 3 MPA, ele deve ser considerado um
//     //aluno critico, e portanto, deve aparecer no relatorio

//     for(let h = 0; h < arrayMatriculas.length; h++){
//             if(arrayMatriculas[h].avaliacao[k].conceito == "MANA"){
//                 contadorMANA++;
//             }else if(arrayMatriculas[h].avaliacao[k].conceito == "MPA"){
//                 contadorMPA++;
//         }

//         //Visto que a definicao de aluno critico ficou subjetiva
//         //decidi defini-la como um aluno que possua mais de um MANA
//         //ou mais de tres MPA's
//         if(contadorMANA > 1 || contadorMPA > 3){
//             alunosCriticos.push(arrayMatriculas[h].aluno);
//         }
//         contadorMANA = 0;
//         contadorMPA = 0;
//     }

//     return alunosCriticos;
// }

// }