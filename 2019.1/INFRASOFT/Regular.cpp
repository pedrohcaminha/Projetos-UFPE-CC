#include <iostream>
#include <iomanip>
#include <fstream>
#include <chrono>
using namespace std;

long long int fat(long long int a){
    if(a == 1){
        return a;
    }else{
        return a * fat(a-1);
    }
}

int main() {
    
   clock_t time = clock();   
    


    int x;
    ifstream inFile;
    int size = 10;
    long long int c[size];
    inFile.open("/Users/pedrocaminha/Downloads/exercicio paralelismo - if677cc/entrada.txt");
    if (!inFile) {
        cout << "Unable to open file";
        exit(1); // terminate with error
    }
    int i = 0;
    while (inFile >> x) {
        c[i] = fat(x);
        i++;
        cout << x << " ";
    }
    
    inFile.close();

    for(int j = 0; j < size; j++){
        cout << c[j] << endl;
    }
    time = clock() - time;
    int ms = double(time);
    cout << ms;

    return 0;
}