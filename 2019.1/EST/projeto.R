#Projeto de Estatistica
#Lucas Nascimento Tavora (lnt) 1 4 7
#Luan Silva de Sena Advincula (lssa) 3 6 9
#Pedro Henrique Caminha Lins (phcl) 2 5 8

#Questao 1
got = read.csv("PlanilhaGOT.csv", header = TRUE, stringsAsFactors =  FALSE)
got


#Questao 2
#Media, Desvio Padrao e Moda das Notas

#colocando a coluna numa variavel
notas = (got$Nota)
SomaNota = 0
NumNotas = 0

#MediaNotas
for(nota in notas){
  SomaNota = SomaNota + nota
  NumNotas = NumNotas + 1
}
MediaNotas = SomaNota/NumNotas

#DP
SomaDP = 0
for(nota in notas){
  SomaDP = SomaDP + ((nota - MediaNotas) * (nota - MediaNotas))
}
DP = sqrt(SomaDP/NumNotas)

#MedianaNotas
notas = sort(notas)
count = c()
notes = c()
for(nota in notas){
  a = TRUE
  for(n in notes){
    if(nota == n){
      a = FALSE
    }
  }
  if(a){
    notes = c(notes, nota)
    count = c(count, 0)
  }
}
index = 1
for(n in notes){
  for(nota in notas){
    if(n == nota){
      count[index] = count[index] + 1
    }
  }
  index = index + 1
}
index = 1
maior = 0
for(nota in notes){
  if(count[index] > maior){
    Moda = nota
  }
}



Valores = c (MediaNotas, DP, Moda)
Dados = c("Media", "Desvio Padrao", "Moda")
b = data.frame(Dados, Valores)
b

#Questao 3

#a) media:
m = 0
n = 0
aud = (got$Audiencia.Em.milhoes.)
for (a in aud) {
  m = m + a
  n = n + 1
}
media = m/n


#b) desvio padrão:
arr = 0
for(a in aud) {
  dif = a - media
  dif = dif * dif
  arr = arr + dif
}
som = arr
var = som / n
dp = sqrt(var)


#c) mediana:

aud = sort(aud)
mediana = 0
if (n %% 2 != 0) {
  i = n / 2
  mediana = aud[i]
} else {
  i1 = n / 2
  i2 = (n / 2) + 1
  mediana = (aud[i1] + aud[i2]) / 2
}

Valores = c (media, dp, mediana)
Dados = c("Media", "Desvio Padrao", "Mediana")
b = data.frame(Dados, Valores)
b

#Questao 4
#funcao que retorna umaa lista de episodios com notas maiores ou iguais a 9

maiorouigualanove = function(tabelaNotas, tabelaEpisodios){
  Nota = c()
  Episodio = c()
  
  for (i in 1:length(tabelaNotas)) {
    if (tabelaNotas[i] >= 9) {
      Nota = c(Nota, tabelaNotas[i])
      Episodio = c(Episodio, tabelaEpisodios[i])
    } 
  }
  
  return(data.frame(Episodio, Nota))
}

a = maiorouigualanove(got$Nota, got$Episodio)
a



#Questao 5
#Funcao que retorna os melhores e piores episodios por temporada

melhoresEpiores = function(temporada, episodios, notas){
  melhores = c(0,0,0,0,0,0,0,0)
  piores =   c(0,0,0,0,0,0,0,0)
  index = 1
  for (ep in episodios) {
    if(melhores[temporada[index]] == 0){
      melhores[temporada[index]] = index
    }else if(notas[melhores[temporada[index]]] < notas[index]){
      melhores[temporada[index]] = index
    }
      index = index + 1
  }
  index = 1
  for (ep in episodios) {
    if(piores[temporada[index]] == 0){
      piores[temporada[index]] = index
    }else if(notas[piores[temporada[index]]] > notas[index]){
      piores[temporada[index]] = index
    }
    index = index + 1
  }
  Episode = c("Melhores")
  Note = c("-")
  Season = c("-")
  for(m in melhores){
    Episode = c(Episode, episodios[m])
    Note = c(Note, notas[m])
    Season = c(Season, temporada[m])
  }
  Episode = c(Episode,"Piores")
  Note = c(Note,"-")
  Season = c(Season,"-")
  for(p in piores){
    Episode = c(Episode, episodios[p])
    Note = c(Note, notas[p])
    Season= c(Season, temporada[p])
  }
  return(data.frame(Episode, Note, Season))
}




a = melhoresEpiores(got$Temporada, got$Episodio, got$Nota)
a

#Questao 6
 #função que retorne qual a temporada com o menor desvio padrão na audiência
 menorDesvioPadrao = function(tabelaTemporada, tabelaAudiencia) {

    Desvios = c(0,0,0,0,0,0,0,0)
   medias = c(0,0,0,0,0,0,0,0)

    for(i in 1:8){
     audiencia = 0
     n = 0
     for(a in 1:length(tabelaTemporada)){
       if(i == tabelaTemporada[a]){
         audiencia = audiencia + tabelaAudiencia[a]
         n = n + 1
       }
     }
     medias[i] = audiencia/n
   }
   for(i in 1:8){
     audiencia = 0
     n = 0
     for(a in 1:length(tabelaTemporada)){
       if(i == tabelaTemporada[a]){
         audiencia = audiencia + ((tabelaAudiencia[a]-medias[i]) * (tabelaAudiencia[a]-medias[i]))
         n = n + 1
       }
     }
     Desvios[i] = sqrt(audiencia/n)
   }
   menor = Desvios[i]
   menori = 1
   for(i in 2:8){
     if(menor > Desvios[i]){
       menor = Desvios[i]
       menori = i
     }
   }
   return(menori)

  }

  x = menorDesvioPadrao(got$Temporada, got$Audiencia.Em.milhoes.)
 x

#Questao 7
#Função que retorna a  média das notas 
#dos episódios em que Brienne of Tarth(Gwendoline Christie) participa.

brienne = function(notas, personagens, alvo){
  soma = 0
  n = 0
  i = 0
  for(name in personagens){
    i = i + 1
    #Verifica se a lista de personangens contem o alvo
    if(grepl(alvo, name, fixed = TRUE)){
      soma = soma + notas[i]
      n = n + 1
    }
  }
  return((soma/n))
}
alvo = "Brienne of Tarth(Gwendoline Christie)"
a = brienne(got$Nota, got$Personagens, alvo)
a

#Questao 8
#Funcao que retorne a lista de personagens que aparecem em apenas um episodio da 4 temporada

#A nossa funcao nao realiza a operacao apenas para a 4, mas para qualquer temporada, basta alterar
# a variavel temporadaAlvo

#os parametros sao: Array de nomes dos personagens, array com o numero das temporadas dos episodios
# e a temporada alvo da funcao, no nosso caso, e a 4 temporada

soUmaVez = function(tabelaPersonagens, tabelaTemporada, temporada){
  
  #a variavel index vai armazenar os indexes dos episodios da temporadaAlvo
  index = c()
  i = 1
  for(temp in tabelaTemporada){
    if(temp == temporada){
       index = c(index, i)
    }
    i = i + 1
  }
  
  #A variavel BigString vai guardar o array concatenado com todos os personagens presentes
  # nos episodios cujos indexes estao armazenado no array index
  BigString = ""
  for(i in index){
    BigString = paste(BigString, tabelaPersonagens[i], sep = ",")
  }
  BigString = strsplit(BigString, ",")
  BigString = BigString[[1]]
  #A variavel BigString ja esta pronta, um array de nomes, com repeticoes
  
  #O array count vai ter o numero de repeticoes de cada nome, ja que o array person vai armazenar
  # uma lista com o nome de todos os personagens
  count = c()
  person = unique(BigString)
  for(p in person){
    i = 0
    for(name in BigString){
      if(p == name){
        i = i + 1
      }
    }
    count = c(count, i)
  }
  #O vetor resposta vai receber os nomes que so aparecem uma vez
  resposta = c()
  i = 1
  for(p in person){
   if(count[i] == 1 && i != 1){
      resposta = c(resposta, p)
   }
    i = i + 1
  }
  Personagens = resposta
  Aparicoes = c(1)
  a = data.frame(Personagens, Aparicoes)
  return (a)
}

s = soUmaVez(got$Personagens, got$Temporada, 4)
s

#Questao 9
#Funcao que retorna o histograma com as participacoes dos personagens nas temporadas

part = function(temporada, personagem, alvo){
  #count = c(0,0,0,0,0,0,0,0)
  count = c()
  teste = c()
  i = 0
  for(p in personagem){
    i = i + 1
    if(grepl(alvo, p, fixed = TRUE)){
      b = temporada[i]
      #count[b] = count[b] + 1
      count = c(count,b)
      b = 0
    }
  }
  b = hist(count, ylab = "Aparicoes", xlab = "Temporadas", main = alvo, col = "blue", xlim=c(1,9), ylim=c(0,10))
  return(count)
}
alvo = "Bran Stark(Isaac Hempstead)" 
c = part(got$Temporada, got$Personagens, alvo)
c
