module cpu(clk, saidaX, saidaY, saidaZ, saidaULA, auxX, auxY, auxZ, auxULA, saidaCounter, valMemory, funcsaidaMemory);

input clk;
output [3:0] saidaX;
output [3:0] saidaY;
output [3:0] saidaZ;
output [3:0] saidaULA;
output [1:0] auxX;
output [2:0] auxY;
output [1:0] auxZ;
output auxULA;
output [3:0] saidaCounter;
output [3:0] valMemory;
output [3:0] funcsaidaMemory;

contador(clk, saidaCounter);
memoria(saidaCounter, valMemory, funcsaidaMemory);
controle controller(funcsaidaMemory, auxX, auxY, auxZ, auxULA);

X regX(clk, auxX, valMemory, saidaX);
Y regY(clk, auxY, saidaULA, saidaY);
X regZ(clk, auxZ, saidaY, saidaZ);
soma ula(auxULA, saidaX, saidaY, saidaULA);

endmodule