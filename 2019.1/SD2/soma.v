    
module soma(sel, X, Y, saida);
    input [3:0] X;
    input [3:0] Y;
    output reg [3:0] saida;
    input sel;

    always begin
        if(sel == 0) //soma
            saida <= X + Y;
        else if(sel == 1)begin //sub
            saida <= X - Y;
        end
    end

endmodule // soma e subtracao com vetor de selecao para 0 sendo soma e 1 sendo subtracao