import java.io.*;
import java.net.*;
import java.util.*;
class TCPClient {
 
	public static void main(String argv[]) throws Exception {
        Scanner in = new Scanner (System.in);
		String sentence;
		String modifiedSentence;
 
		BufferedReader inFromUser = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("Inicializando cliente UDP");
        System.out.println("Digite a porta desejada: ");
		int porta = in.nextInt();
		porta = Math.max(porta,1025);
		System.out.println("Digite o IP do servidor (ou aperte ENTER para localhost): ");
		in.nextLine();
		String servidor = in.nextLine();
		System.out.println(servidor);
		if(servidor.equals(null)){
			servidor = "localhost";
		}


 
		System.out.println("Conectando ao servidor " + servidor + ":" + porta);
 
		Socket clientSocket = new Socket(servidor, porta);
 
		DataOutputStream outToServer = new DataOutputStream(clientSocket
				.getOutputStream());
 
		BufferedReader inFromServer = new BufferedReader(new InputStreamReader(
				clientSocket.getInputStream()));
 
        System.out.println("Digite string a ser enviada para o servidor");
       
		sentence = inFromUser.readLine();
 
		outToServer.writeBytes(sentence + '\n');
        long t1 = System.currentTimeMillis();
		modifiedSentence = inFromServer.readLine();
        long t2 = System.currentTimeMillis();

        System.out.println("-------------------------------------");
		System.out.println("Servidor: " + modifiedSentence);
        
		clientSocket.close();
        System.out.println("Conexão TCP com o servidor encerrada");

        System.out.println("T1: "+ t1);
		System.out.println("T2: "+ t2);
		System.out.println("RTT: "+ (t2-t1));
	}
}