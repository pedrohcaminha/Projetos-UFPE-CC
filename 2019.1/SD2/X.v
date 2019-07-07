module X(clk, sel, entrada, saida);
    input clk;
    input [1:0] sel;
    input [3:0] entrada;
    output reg [3:0] saida;

    parameter LIMPAR = 2'b00;
    parameter CARREGAR = 2'b01;
    parameter MANTER = 2'b10;
   
    always @(posedge clk) begin
	    case(sel)
		    LIMPAR:
			    saida <= 4'b0000; //registrador limpo
		    CARREGAR:
			    saida <= entrada; //segura o valor recebido
		    MANTER:
			    saida <= saida; //mantem valor
	endcase
end

endmodule // sobre o registrador X