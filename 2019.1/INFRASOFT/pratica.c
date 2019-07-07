#include <stdio.h>
void print(char *a, int b){
    printf("%c\n", a[b]);
}
int main() {
    char nome[100] = "\0";
    scanf(" %s", nome);
    
    print(nome, 0);
    return 0;

}}
