import java.io.*;
import java.net.*;
import java.util.*;
 
class UDPClient {
	public static void main(String args[]) throws Exception {
		Scanner in = new Scanner(System.in);
		System.out.println("Inicializando cliente UDP");
        System.out.println("Digite a porta desejada: ");
		int porta = in.nextInt();
		porta = Math.max(porta,1025);
		DatagramSocket clientSocket = new DatagramSocket();
 
		System.out.println("Digite o IP do servidor (ou aperte ENTER para localhost): ");
		in.nextLine();
		String servidor = in.nextLine();
		System.out.println(servidor);
		if(servidor.equals(null)){
			servidor = "localhost";
		}
		InetAddress IPAddress = InetAddress.getByName(servidor);
		
		byte[] sendData = new byte[1024];
		byte[] receiveData = new byte[1024];
 
		System.out.println("Digite o texto a ser enviado ao servidor: ");
		String mensagem = in.nextLine();
		sendData = mensagem.getBytes();
		for(int i = 0; i < 70; i++){
			DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, IPAddress, porta);
			System.out.println("Enviando pacote UDP para " + servidor + ": " + porta);
			long t1 = System.currentTimeMillis();
			clientSocket.send(sendPacket);
			DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
			System.out.println("Pacote UDP enviado");
			System.out.println("-------------------------------------");
	
			clientSocket.receive(receivePacket);
			long t2 = System.currentTimeMillis();
			String a = new String(receivePacket.getData());
			System.out.println(a);
		}
		clientSocket.close();
		// System.out.println("T1: "+ t1);
		// System.out.println("T2: "+ t2);
		// System.out.println("RTT: "+ (t2-t1));

		System.out.println("Socket cliente fechado");
	}
}