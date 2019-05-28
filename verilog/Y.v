module Y (clk, sel, entrada, saida);
    input clk;
    input [2:0] sel;
    input [3:0] entrada;
    output reg [3:0] saida;

    parameter LIMPAR = 3'b000;
    parameter CARREGAR = 3'b001;
    parameter MANTER = 3'b010;
    parameter SESQUERDA = 3'b011;
    parameter SDIREITA = 3'b100;

    always @(posedge clk) begin
        case (sel)
            LIMPAR:
                saida <= 4'b0000; //registrador limpo
            CARREGAR:
                saida <= entrada; //segura o valor recebido
            MANTER:
                saida <= saida; //mantem valor
            SESQUERDA:
                saida <= (saida << 1); //Shift left
            SDIREITA:
                saida <= (saida >> 1); //Shift right
            
        endcase
    end



endmodule // sobre o registrador Y
