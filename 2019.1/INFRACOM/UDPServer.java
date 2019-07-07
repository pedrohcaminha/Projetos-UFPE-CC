import java.io.*;
import java.net.*;
import java.util.Scanner;
 
class UDPServer {
	public static void main(String args[]) throws Exception {
        Scanner in = new Scanner(System.in);
        System.out.println("Inicializando servidor UDP");
        System.out.println("Digite a porta desejada: ");
        int porta = in.nextInt();
        porta = Math.max(porta, 1025);
        System.out.println("Servidor iniciado na porta " + porta);
        System.out.println("-------------------------------------");

        //Inicializa o servidor (socket) na porta
        DatagramSocket serverSocket = new DatagramSocket(porta);


		while (true) {
            //array de bytes q vai armazenar o datagrama recebido
            byte[] receiveData = new byte[1024];
            //array de bytes com a resposta
            byte[] sendData = new byte[1024];
            //pacote que vai receber as informacoes
            DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
            System.out.println("Ouvindo na porta " + porta);

            //servidor recebe o pacote
            serverSocket.receive(receivePacket);
            
            System.out.println("Datagrama UDP recebido...");
            
            //String com o conteudo do pacote
            String sentence = new String(receivePacket.getData());
            System.out.println("Mensagem recebida: ");
            System.out.println(sentence);

            //pega o ip do cliente a partir do pacote recebido
            InetAddress IPCliente = receivePacket.getAddress();

            // System.out.println(IPCliente);

            //pega a porta do cliente a partir do pacote recebido
			int portaCliente = receivePacket.getPort();
            String resposta = "Mensagem recebida pelo Servidor";
            
            //converte a resposta para o array de bytes
            sendData = resposta.getBytes();

            //cria um pacote de com o array de bytes, o tamanho do array, o ip do destino, a porta de destino
            DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, IPCliente, portaCliente);
            System.out.print("Enviando...");
            
            //envia o pacote atraves do servidor
            serverSocket.send(sendPacket);
            System.out.println("OK");
            System.out.println("-------------------------------------");
        }
	}
}