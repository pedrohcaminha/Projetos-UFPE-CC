module memoria(contagem, valor, saida;

input [3:0] contagem;
output reg [3:0] saida;
output reg [3:0] valor;

parameter X = 2;
parameter Y = 4;

always begin
	case(contagem)
		4'b0000: // carrega X, limpa Y, limpa Z, soma ULA
			begin
				saida <= 4'b0000;
				valor <= X;
			end
		4'b0001: // carrega X, carrega Y, mantem Z, soma Ula
			begin
				saida <= 4'b0001;
				valor <= Y;
			end
		4'b0010: // mantem X, carrega Y, mantem Z, dc ULA
			begin
				saida <= 4'b0010;
				valor <= 0;
			end
		4'b0011: // mantem X, shift right Y, mantem Z, dc ULA
			begin
				saida <= 4'b0011;
				valor <= 0;
			end
		4'b0100: // limpa X, limpa Y, carrega Z, dc ULA
			begin
				saida <= 4'b0100;
				valor <= 0;
			end
	endcase
end

endmodule