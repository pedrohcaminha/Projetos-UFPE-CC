#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
#include <time.h>

void *fatorial(void *threadId){
    unsigned long long fat=1;
    int i;
    int *n = (void*) threadId;
    for(i=1; i<=*n ;i++){
        fat= fat*i;
    }
    printf("Fatorial de %d = %llu\n",*n ,fat);
    pthread_exit(NULL);
}

int main(){
    FILE *file;
    clock_t t;
    int numero;
    double timeTaken;
    
    int numbers[10];
    t = clock();
    file = fopen("entrada.txt","r");
    if(file==NULL){
        printf("Arquivo de entrada nao encontrado\n");
        exit(1);
    }
    int j;
    while(fscanf(file, "%d ", &numero )!=EOF && j < 10){
        numbers[j] = numero;
    }
    pthread_t thread[10];
    int i;
    int rc;
    for(i = 0; i < 10; i++) {
        rc = pthread_create(&thread[i], NULL, fatorial, &numbers);
        pthread_join(thread[i], NULL);

    }
    t = clock() - t;
    timeTaken = ((double)t)/CLOCKS_PER_SEC;
    printf("Tempo de execução: %lf\n",timeTaken);
    
    
    pthread_exit(NULL);
}