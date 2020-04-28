module controle(sel, auxX, auxY, auxZ, auxULA);

input [3:0] sel;
output reg [1:0] auxX;
output reg [2:0] auxY;
output reg [1:0] auxZ;
output reg auxULA;

parameter LIMPARXZ = 2'b00;
parameter CARREGARXZ = 2'b01;
parameter MANTERXZ = 2'b10;

parameter LIMPARY = 3'b000;
parameter CARREGARY = 3'b001;
parameter MANTERY = 3'b010;
parameter SESQUERDAY = 3'b011;
parameter SDIREITAY = 3'b100;

parameter SOMAULA = 1'b0;
parameter SUBULA = 1'b1;

always begin
	case(func)
		4'b0000:
			begin //sequencia de passos
				auxX <= CARREGARXZ;
				auxY <= LIMPARY;
				auxZ <= LIMPARXZ;
				auxULA <= SOMAULA;
			end
		4'b0001:
			begin
				auxX <= CARREGARXZ;
				auxY <= CARREGARY;
				auxZ <= MANTERXZ;
				auxULA <= SOMAULA;
			end
		4'b0010:
			begin
				auxX <= MANTERXZ;
				auxY <= CARREGARY;
				auxZ <= MANTERXZ;
				auxULA <= SOMAULA;
			end
		4'b0011:
			begin
				auxX <= MANTERXZ;
				auxY <= SDIREITAY;
				auxZ <= MANTERXZ;
				auxULA <= SOMAULA;
			end
		4'b0100:
			begin
				auxX <= LIMPARXZ;
				auxY <= LIMPARY;
				auxZ <= CARREGARXZ;
				auxULA <= SOMAULA;
			end
	endcase
end

endmodule