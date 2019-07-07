#include <iostream> 
#include <pthread.h> 
#include <iomanip>
#include <fstream>
#include <chrono>
using namespace std; 

#define size 10
long long int a[size];
long long int c[size];
int part = -1;
static pthread_mutex_t mmutex;

  
long long int fact(long long int b){
    if(b == 1){
        return b;
    }else{
        return b * fact(b-1);
    }
}
  
void* afac(void* arg) 
{ 
    int thread_part = ++part; 
    c[thread_part] = fact(a[thread_part]);
    pthread_exit(NULL);
} 
int main() 
{ 
    clock_t time = clock(); 
    int x;
    ifstream inFile;
    inFile.open("/Users/pedrocaminha/Downloads/exercicio paralelismo - if677cc/entrada.txt");
    if (!inFile) {
        cout << "Unable to open file";
        exit(1); // terminate with error
    }
    int i = 0;
    while (inFile >> x) {
        a[i] = x;
        i++;
        cout << x << " ";
    }
    
    inFile.close();
    pthread_t threads[size]; 
    for (int i = 0; i < size; i++){ 
        pthread_create(&threads[i], NULL, afac, NULL); 
    }
    cout <<  endl;
    for(int i = 0; i < size; i++)
    {
        cout << c[i] << endl;
    }
    time = clock() - time;
    int ms = double(time);
    cout << ms;
    pthread_exit(NULL);
} 