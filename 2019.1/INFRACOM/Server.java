
import java.io.*; 
import java.util.*; 
import java.net.*; 

public class Server 
{ 
	static Vector <Gerenciador> vect = new Vector<>(); 
	static int NumDeClientes = 0; 

	public static void main(String[] args) throws IOException 
	{ 
		Scanner in = new Scanner(System.in); 
		System.out.println("Iniciando servidor para Chat");
		System.out.println("Digite o numero da porta desejada:");
		int porta = in.nextInt();
		porta = Math.max(porta, 1025);
		ServerSocket socketServer = new ServerSocket(porta); 
		System.out.println("Servidor iniciado na porta "+porta);
		Socket novoSocket; 
		
		while (true) 
		{ 
			
			novoSocket = socketServer.accept(); 
			System.out.println("Um novo cliente deseja se juntar ao servidor: " + novoSocket); 

			DataInputStream inputData = new DataInputStream(novoSocket.getInputStream()); 
			DataOutputStream outputData = new DataOutputStream(novoSocket.getOutputStream()); 
			
			System.out.println("Inicializando um novo gerente para o novo cliente..."); 
			Gerenciador novo = new Gerenciador(novoSocket,NumDeClientes, inputData, outputData); 

			Thread THREAD = new Thread(novo); 
			System.out.println("Cliente adicionado a lista de clientes ativos"); 

			vect.add(novo); 
			THREAD.start(); 

			NumDeClientes++;
		}
	} 
} 
class Gerenciador implements Runnable { 
	Scanner in = new Scanner(System.in); 
	private String nome; 
	final DataInputStream inputData; 
	final DataOutputStream outputData; 
	Socket novoSocket; 
	int a;
	int ordem;
	
	// constructor 
	public Gerenciador(Socket novoSocket, int nome, 
							DataInputStream inputData, DataOutputStream outputData) { 
		this.inputData = inputData; 
		this.outputData = outputData; 
		this.ordem = nome; 
		this.novoSocket = novoSocket;
		this.a = 0;
	} 

	public void run() { 

		String mensagem; 
		while (true)  
        { 
            try
            { 
                mensagem = inputData.readUTF();  
                System.out.println(mensagem); 
				if(false){
					break;
				}
				if(this.a == 2){
					for (Gerenciador mc : Server.vect)  
					{ 
							if(!this.nome.equals(mc.nome)){
							mc.outputData.writeUTF(this.nome+": "+mensagem); 
							}else{

							}
						
					} 
				}
				if(this.a<2){
					a++;
					this.nome = mensagem;
					if(this.a == 2){
					System.out.println("Cliente eh: "+mensagem); 
					for (Gerenciador mc : Server.vect)  
					{ 
							if(mc.ordem == this.ordem)
							mc.outputData.writeUTF("Server says: Bem vindo ao chat "+this.nome+" (user #"+(this.ordem+1)+")"); 
						
						
					} 
				}
				}
				
            } catch (IOException e) { 
                  
                e.printStackTrace(); 
            } 
              
        } 
        try
        { 
            // closing resources 
            this.inputData.close(); 
            this.outputData.close(); 
              
        }catch(IOException e){ 
            e.printStackTrace(); 
		} 
	}
}

