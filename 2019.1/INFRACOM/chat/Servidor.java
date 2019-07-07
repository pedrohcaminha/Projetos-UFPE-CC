import java.io.*; 
import java.util.*; 
import java.net.*; 
import java. net. InetAddress;
public class Servidor 
{ 
   
   static Vector <Gerenciador> vect = new Vector<>(); 
   static int NumDeClientes = 0; 
   static ArrayList<String> backup = new ArrayList<String>();
   static ArrayList<String> cache = new ArrayList<String>();
   // static StringBuffer sb = new StringBuffer();
   static String sb = "\uDBB9\uDCE7";
   public static void main(String[] args){
      Servidor Servidor = new Servidor();
      
   }
   

   Servidor()
   { 
      

      // sb.append(Character.toChars(127467));
      // sb.append(Character.toChars(127479));
      System.out.println(sb + "  BIENVENUE "+ sb);
      String ip = "";
     
      try {
         try(final DatagramSocket socket = new DatagramSocket()){
            socket.connect(InetAddress.getByName("8.8.8.8"), 10002);
            ip = socket.getLocalAddress().getHostAddress();
          }
         System.out.println("O IP para conexao remota e: " + ip);

      } catch (Exception e) {
         System.out.println("Nao foi possivel pegar o ip");
      }
      System.out.println("Servidor iniciado na porta 12345");
      int porta = 12345;
      ServerSocket socketServer = null;
      try {
         socketServer = new ServerSocket(porta); 
      } catch (Exception e) {
         System.out.println("erro");
      }
      Socket novoSocket; 
      
      
      while (true){ 
         DataInputStream inputData = null;
         DataOutputStream outputData = null;
         novoSocket = null;
         try {
            novoSocket = socketServer.accept();
            inputData = new DataInputStream(novoSocket.getInputStream()); 
            outputData = new DataOutputStream(novoSocket.getOutputStream()); 
         } catch (Exception e) {
            System.out.println("erro");
         }

         Gerenciador novo = new Gerenciador(NumDeClientes, novoSocket, inputData, outputData); 
         Thread THREAD = new Thread(novo);
         System.out.println(sb + "  cliente conectado"); 
         vect.add(novo); 
         THREAD.start(); 
         NumDeClientes++;
      }
   } 
} 
class Gerenciador implements Runnable { 
   Scanner in = new Scanner(System.in); 
   final DataInputStream inputData; 
   final DataOutputStream outputData; 
   Socket novoSocket;
   int id = 0;
   int contador = 0;
   String nome = "";
   boolean online = true;
   
   // construtor
   public Gerenciador(int id, Socket novoSocket, DataInputStream inputData, DataOutputStream outputData) { 
      this.inputData = inputData; 
      this.outputData = outputData; 
      this.novoSocket = novoSocket;
      this.id = id;
   } 


   public void run() { 
      String mensagem; 
      while (true)  
        { 
            try
            { 
               mensagem = inputData.readUTF();
               this.contador++;
               if(!mensagem.equals("")){
                  if(this.contador < 2){
                     this.nome = mensagem;
                     this.outputData.writeUTF("Servidor diz: C'est un plaisir de te rencontrer, "+this.nome);
                     for(Gerenciador cliente : Servidor.vect){
                        if(cliente.online && cliente.id!=this.id) 
                           cliente.outputData.writeUTF("clearclearclear");
                           if(cliente.online && cliente.id!=this.id) 
                           cliente.outputData.writeUTF("tela de "+cliente.nome+"  "+Servidor.sb);

                        for(int i = 0; i < Servidor.cache.size(); i++){
                           String mes = Servidor.cache.remove(0);
                           String[] mess = mes.split("#");
                           if(!mess[4].contains("-"+cliente.nome+"-") && !mess[4].contains(cliente.nome+",")  && cliente.online){
                              mes = mes + "-"+cliente.nome+ "-";
                           }
                           Servidor.cache.add(mes);
                        }
                     }
                     for(Gerenciador cliente : Servidor.vect){
                        for (String mes : Servidor.cache) {
                           String[] mess = mes.split("#");
                           String a = mess[3] + " : " +  mess[0] + " (# "+mess[2] + ")" + " ("+mess[4] + ")";
                           if(cliente.online) 
                           cliente.outputData.writeUTF(a);
                        }
                     }
                  }else{
                     if(mensagem.contains("DEL")){
                        this.contador--;
                        String it = this.id + "";
                        String[] spl = mensagem.split(" ");
                        for(int i = 0; i < Servidor.cache.size(); i++){
                           String mes = Servidor.cache.remove(0);
                           String mess[] = mes.split("#");
                           if(mess[1].equals(it) && mess[2].equals(spl[1])){
                              mess[0] = "***********";
                           }
                           mes = String.join("#", mess);
                           Servidor.cache.add(mes);
                        }
                        for(Gerenciador cliente : Servidor.vect){

                           if(cliente.online) 
                           cliente.outputData.writeUTF("clearclearclear");
                           if(cliente.online) 
                           cliente.outputData.writeUTF("tela de "+cliente.nome+"  "+Servidor.sb);


                           for(int i = 0; i < Servidor.cache.size(); i++){
                              String mes = Servidor.cache.remove(0);
                              String[] mess = mes.split("#");
                              if(!mess[4].contains("-"+cliente.nome+"-") && !mess[4].contains(cliente.nome+",")  && cliente.online){
                                 mes = mes + "-"+cliente.nome+ "-";
                              }
                              Servidor.cache.add(mes);
                           }
                        }
                        for(Gerenciador cliente : Servidor.vect){
                           for (String mes : Servidor.cache) {
                              String[] mess = mes.split("#");
                              String a = mess[3] + " : " +  mess[0] + " (# "+mess[2] + ")" + " ("+mess[4] + ")";
                              if(cliente.online) 
                              cliente.outputData.writeUTF(a);
                           }
                        }
                     }else if(mensagem.contains("QUIT")){
                        this.online = false;
                        this.outputData.close();
                        this.inputData.close();
                        break;
                     }else if(mensagem.contains("ONLINE")){
                        this.contador--;
                        for(Gerenciador cliente : Servidor.vect){
                           if(cliente.online){
                              this.outputData.writeUTF(cliente.nome + "   " + Servidor.sb);
                           }
                        }
                     }else if(mensagem.contains("HELP")){
                        this.contador--;
                        this.outputData.writeUTF(Servidor.sb + "  Para enviar uma mensagem basta digitar ela e apertar enter :)");
                        this.outputData.writeUTF(Servidor.sb + "  Para apagar uma mensagem enviada na sessao atual digite 'DEL + id da mensagem'");
                        this.outputData.writeUTF(Servidor.sb + "  Para ver quais usuarios estao online envie 'ONLINE'");
                        this.outputData.writeUTF(Servidor.sb + "  para falar com o gerente do Servidor digite 'gerente + sua mensagem'");
                        this.outputData.writeUTF(Servidor.sb + "  Para sair digite 'QUIT' e sua sessao sera finalizada");
                        this.outputData.writeUTF(Servidor.sb + "  Para para rever esses comandos digite 'HELP' a qualquer momento");
                     }else if(mensagem.contains("RESTORE")){
                        if(this.nome.equals("gerente")){
                           this.contador--;
                           for(int i = 0; i < Servidor.cache.size(); i++){
                              String aux = Servidor.cache.remove(0);
                              String messs = Servidor.backup.remove(0);
                              Servidor.backup.add(messs);
                              Servidor.cache.add(messs);
                           }
                           for(Gerenciador cliente : Servidor.vect){

                              if(cliente.online) 
                              cliente.outputData.writeUTF("clearclearclear");
                              if(cliente.online) 
                              cliente.outputData.writeUTF("tela de "+cliente.nome+"  "+Servidor.sb);
   
   
                              for(int i = 0; i < Servidor.cache.size(); i++){
                                 String mes = Servidor.cache.remove(0);
                                 String[] mess = mes.split("#");
                                 if(!mess[4].contains("-"+cliente.nome+"-") && !mess[4].contains(cliente.nome+",") && cliente.online){
                                    mes = mes + "-"+cliente.nome+ "-";
                                 }
                                 Servidor.cache.add(mes);
                              }
                           }
                           for(Gerenciador cliente : Servidor.vect){
                              for (String mes : Servidor.cache) {
                                 String[] mess = mes.split("#");
                                 String a = mess[3] + " : " +  mess[0] + " (# "+mess[2] + ")" + " ("+mess[4] + ")";
                                 if(cliente.online) 
                                 cliente.outputData.writeUTF(a);
                              }
                           }
                        }
                     }else{  
                        if(this.nome.equals("pasg")){
                           mensagem = Servidor.sb +"  "+ mensagem;
                        }
                        mensagem = mensagem + "#" + this.id + "#" +(this.contador-1) + "#" + this.nome + "#--Servidor-";
                        if(mensagem.contains("gerente")){
                           String ger[] = mensagem.split("#");
                           if(!ger[3].contains("gerente")){
                              System.out.println(ger[3] +" : " +ger[0]);
                           }
                        }
                        Servidor.cache.add(mensagem);
                        Servidor.backup.add(mensagem);
                        for(Gerenciador cliente : Servidor.vect){

                           if(cliente.online) 
                           cliente.outputData.writeUTF("clearclearclear");
                           if(cliente.online) 
                           cliente.outputData.writeUTF("tela de "+cliente.nome+"  "+Servidor.sb);


                           for(int i = 0; i < Servidor.cache.size(); i++){
                              String mes = Servidor.cache.remove(0);
                              String[] mess = mes.split("#");
                              if(!mess[4].contains("-"+cliente.nome+"-") && !mess[4].contains(cliente.nome+",") && cliente.online){
                                 mes = mes + "-"+cliente.nome+ "-";
                              }
                              Servidor.cache.add(mes);
                           }
                        }
                        for(Gerenciador cliente : Servidor.vect){
                           for (String mes : Servidor.cache) {
                              String[] mess = mes.split("#");
                              String a = mess[3] + " : " +  mess[0] + " (# "+mess[2] + ")" + " ("+mess[4] + ")";
                              if(cliente.online) 
                              cliente.outputData.writeUTF(a);
                           }
                        }
                        
                     }
                  }
               }
               if(false){//essa aberracao so existe pq se nao da erro de codigo inalcancavel
                  break;
               }
            }catch (IOException e) {      
                System.out.println("erro");
                System.exit(0);
            } 
              
        } 
        try
        { 
            // closing resources 
            this.inputData.close(); 
            this.outputData.close(); 
              
        }catch(IOException e){ 
            System.out.println("erro");
            System.exit(0);
      } 
   }

}
