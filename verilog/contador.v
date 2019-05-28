module contador(clk, saida);

input clk;
output reg [3:0] saida;


always @(posedge clk) begin
	if(saida >= 4'b1111) //verifica o overflow e volta para o comeco
		saida = 4'b0000;
	else
		saida = (saida + 1);
end
endmodule // contador de subidas do relogio