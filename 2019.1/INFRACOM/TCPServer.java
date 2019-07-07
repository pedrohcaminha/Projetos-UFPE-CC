import java.io.*; 
import java.net.*; 
import java.util.*;
class TCPServer { 
	 public static void main( String argv[]) throws Exception 
	 { 
         Scanner in = new Scanner (System.in);
		 String mensagemCliente; 
         String resposta = "Mensagem recebida pelo servidor"; 
         System.out.println("Inicializando servidor TCP");
        System.out.println("Digite a porta desejada: ");
        int porta = in.nextInt();
        porta = Math.max(porta, 1025);

		 ServerSocket welcomeSocket = new ServerSocket(porta); 
        
        System.out.println("Servidor TCP iniciado na porta "+porta);
		 		 		 
        System.out.println("-------------------------------------");
		 			
		int i = 1;			 
		 while (true) { 
            System.out.println("Aguardando conexão...");	
            Socket connectionSocket = welcomeSocket.accept(); 
			System.out.println("Conexão TCP estabelecida com o cliente "+i);															
			BufferedReader inFromClient = new BufferedReader(new InputStreamReader(connectionSocket.getInputStream()));
			DataOutputStream outToClient = new DataOutputStream(connectionSocket.getOutputStream()); 
			System.out.println("Aguardando mensagem do cliente...");												
            mensagemCliente = inFromClient.readLine();
            System.out.println("Cliente: "+mensagemCliente); 
			System.out.println("Enviando resposta ao cliente");															
            outToClient.writeBytes(resposta); 
            System.out.println("Encerrando conexão TCP com o cliente");

        System.out.println("-------------------------------------");
            connectionSocket.close();
            i++;
		} 
	 } 
}