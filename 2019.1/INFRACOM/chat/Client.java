import java.io.*; 
import java.net.*; 
import java.util.Scanner; 

public class Client { 	
	public static void main(String args[]) throws UnknownHostException, IOException { 
		Scanner in = new Scanner(System.in); 

		//a string servidor recebe o IP do servidor, como nao to fazendo a interface, esse dado tem q ser pego por la
		//uso localhost pq to rodando na mesma maquina :o


		System.out.println("Digite o ip do servidor");
		String servidor = in.nextLine();
		StringBuffer sb = new StringBuffer();
		sb.append(Character.toChars(127467));
		sb.append(Character.toChars(127479));

		InetAddress IPAddress = InetAddress.getByName(servidor);
		int porta = 12345;
		Socket socketCliente = new Socket(IPAddress, porta); 

		//Inputs e outputs do cliente
		DataInputStream inputData = new DataInputStream(socketCliente.getInputStream()); 
		DataOutputStream outputData = new DataOutputStream(socketCliente.getOutputStream()); 
		System.out.println(sb + "  BIENVENUE "+ sb);
		System.out.println("Para enviar uma mensagem basta digitar ela e apertar enter :)");
		System.out.println("Para apagar uma mensagem enviada na sessao atual digite 'DEL + id da mensagem'");
		System.out.println("Para ver quais usuarios estao online envie 'ONLINE'");
		System.out.println("para falar com o gerente do servidor digite 'gerente + sua mensagem'");
		System.out.println("Para sair digite 'QUIT' e sua sessao sera finalizada");
		System.out.println("Para para rever esses comandos digite 'HELP' a qualquer momento");
		System.out.println("Digite seu nome para se conectar com o host");
		//Ele funciona muito simples, tem uma thread p receber e enviar mensagens
		Thread enviarMensagem = new Thread(new Runnable() 
		{ 
			public void run() {
				while (true) { 
					//mensagem a enviar
					String mensagem = in.nextLine();
					try {
						outputData.writeUTF(mensagem); 
					} catch (IOException e) { 
						e.printStackTrace(); 
					}
					if(mensagem.equals("QUIT")){
						try {
							outputData.close();
							inputData.close();
							System.exit(0);
						} catch (Exception e) {
							//TODO: handle exception
						}
					}
				} 
			} 
		}); 
		Thread receberMensagem = new Thread(new Runnable() 
		{ 
			public void run() { 
				while (true) { 
					try { 
						//mensagem recebida && escrita na tela :D
						String mensagem = inputData.readUTF(); 
						if(mensagem.equals("clearclearclear")){
							System.out.print("\033[H\033[2J");
							System.out.flush();
						}else{
							System.out.println(mensagem);
						}
					} catch (IOException e) { 
						break; 
					} 
				} 
			} 
		}); 

		enviarMensagem.start(); 
		receberMensagem.start(); 

	} 
} 