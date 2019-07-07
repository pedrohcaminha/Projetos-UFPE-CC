import java.io.*; 
import java.net.*; 
import java.util.Scanner; 

public class Client { 	
	public static void main(String args[]) throws UnknownHostException, IOException { 
		Scanner in = new Scanner(System.in); 
		
		System.out.println("Inicializando multichat");
		System.out.println("Digite o IP do servidor (ou aperte ENTER para localhost): ");
		String servidor = in.nextLine();
		if(servidor.equals(null)){
			servidor = "localhost";
		}
		InetAddress IPAddress = InetAddress.getByName(servidor);
		System.out.println("Digite a porta desejada: ");
		int porta = in.nextInt();
		porta = Math.max(porta,1025);

		Socket socketCliente = new Socket(IPAddress, porta); 

		DataInputStream inputData = new DataInputStream(socketCliente.getInputStream()); 
		DataOutputStream outputData = new DataOutputStream(socketCliente.getOutputStream()); 

		System.out.println("Digite o seu nome:");

		Thread enviarMensagem = new Thread(new Runnable() 
		{ 
			public void run() {
				while (true) { 
					String mensagem = in.nextLine();
					try {
						outputData.writeUTF(mensagem); 
					} catch (IOException e) { 
						e.printStackTrace(); 
					} 
				} 
			} 
		}); 
		Thread receberMensagem = new Thread(new Runnable() 
		{ 
			public void run() { 
				while (true) { 
					try { 
						String mensagem = inputData.readUTF(); 
						System.out.println(mensagem);
					} catch (IOException e) { 
						e.printStackTrace(); 
					} 
				} 
			} 
		}); 

		enviarMensagem.start(); 
		receberMensagem.start(); 

	} 
} 

