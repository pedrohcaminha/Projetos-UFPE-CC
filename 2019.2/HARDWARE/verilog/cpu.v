module cpu(clk, saidaX, saidaY, saidaZ, saidaULA, auxX,
auxY, auxZ, auxULA, saidaContador, valMemoria, 
funcsaidaMemoria);

    input clk;
    output [3:0] saidaX;
    output [3:0] saidaY;
    output [3:0] saidaZ;
    output [3:0] saidaULA;
    output [1:0] auxX;
    output [2:0] tY;
    output [1:0] auxZ;
    output auxULA;
    output [3:0] saidaContador;
    output [3:0] valMemoria;
    output [3:0] funcsaidaMemoria;

        contador(clk, saidaContador);
        memoria(saidaContador, valMemoria, funcsaidaMemoria);
        controle controller(funcsaidaMemoria, auxX, auxY, auxZ, auxULA);
        X regX(clk, auxX, valMemoria, saidaX);
        Y regY(clk, auxY, saidaULA, saidaY);
        X regZ(clk, auxZ, saidaY, saidaZ);
        soma ula(auxULA, saidaX, saidaY, saidaULA);

endmodule