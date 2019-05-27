public static void main(String[] args) {
        Scanner in  = new Scanner (System.in);
        System.out.println("Insira seu nome para começar:");
        String name = "";
        if(in.hasNext()) {
            name = in.nextLine();
        }
        System.out.println(name + ", bem vindo ao VeToRiAl, o");
        System.out.println("programa que oferece soluções vetoriais.");
        while(true) {
            int espaco = 0;
            System.out.println("Digite o código da operação desejada:");
            String resposta;
            System.out.println("1 - Soma de vetores");
            System.out.println("2 - Subtração de vetores");
            System.out.println("3 - Norma do vetor");
            System.out.println("4 - Vetor oposto");
            System.out.println("5 - Sair");
            int operacao = in.nextInt();
            if(operacao <= 4 && operacao >0) {
            System.out.println("Digite 2 ou 3 para definir o espaço:");
           espaco = in.nextInt();
            }else if(operacao != 5) {
                System.out.println(name+", insira uma operação válida!");
            }
            if (operacao == 1 && espaco == 2) {
                resposta = somar2(name);
                System.out.println(resposta);
            }else if (operacao == 1 && espaco == 3) {
                resposta = somar3(name);
                System.out.println(resposta);
            }else if (operacao == 2 && espaco == 2) {
                resposta = tirar2(name);
                System.out.println(resposta);
            }else if (operacao == 2 && espaco == 3) {
                resposta = tirar3(name);
                System.out.println(resposta);
            }else if (operacao == 3 && espaco == 2) {
                resposta = norma2(name);
                System.out.println(resposta);
            }else if (operacao == 3 && espaco == 3) {
                resposta = norma3(name);
                System.out.println(resposta);
            }else if (operacao == 4 && espaco == 2) {
                resposta = oposto2(name);
                System.out.println(resposta);
            }else if (operacao == 4 && espaco == 3) {
                resposta = oposto3(name);
                System.out.println(resposta);
            }else if (operacao == 5) {
                break;
            }
        }
        System.out.println(name+", obrigado por utilizar o VeToRiAl!");
    }
   
    public static String somar2(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X e Y do primeiro vetor:");
        int a = on.nextInt();
        int b = on.nextInt();
        System.out.println(nome +", digite X e Y do segundo vetor:");
        int c = on.nextInt();
        int d = on.nextInt();
        String azu = "O novo vetor é v = ("+(a+c)+", "+(b+d)+").";
        return azu;
    }
   
    public static String somar3(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X, Y e Z do primeiro vetor:");
        int a = on.nextInt();
        int b = on.nextInt();
        int a1 = on.nextInt();
        System.out.println(nome +", digite X, Y e Z do segundo vetor:");
        int c = on.nextInt();
        int d = on.nextInt();
        int b1 = on.nextInt();
        String azu = "O novo vetor é v = ("+(a+c)+", "+(b+d)+", "+(a1+b1)+").";
        return azu;
    }
   
    public static String tirar2(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X e Y do primeiro vetor:");
        int a = on.nextInt();
        int b = on.nextInt();
        System.out.println(nome +", digite X e Y do segundo vetor:");
        int c = on.nextInt();
        int d = on.nextInt();
        String azu = "O novo vetor é v = ("+(a-c)+", "+(b-d)+").";
        return azu;
    }
   
    public static String tirar3(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X, Y e Z do primeiro vetor:");
        int a = on.nextInt();
        int b = on.nextInt();
        int a1 = on.nextInt();
        System.out.println(nome +", digite X, Y e Z do segundo vetor:");
        int c = on.nextInt();
        int d = on.nextInt();
        int b1 = on.nextInt();
        String azu = "O novo vetor é v = ("+(a-c)+", "+(b-d)+", "+(a1-b1)+").";
        return azu;
    }
   
    public static String norma2(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X e Y do vetor:");
        int a = on.nextInt();
        int b = on.nextInt();
        double vet = Math.floor(Math.sqrt((a*a) + (b*b)));
        String azu = "A norma do vetor é aproximadamente "+ vet;
        return azu;
    }
   
    public static String norma3(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X, Y e Z do vetor:");
        int a = on.nextInt();
        int b = on.nextInt();
        int a1 = on.nextInt();
        double vet =  Math.floor(Math.sqrt((a*a) + (b*b) + (a1*a1)));
        String azu = "A norma do vetor é aproximadamente "+vet;
        return azu;
    }
    public static String oposto2(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X e Y do vetor:");
       
        int a = on.nextInt() * -1;
        int b = on.nextInt() * -1;
       
       
        String azu =  "O novo vetor é v = ("+a+", "+b+").";
        return azu;
    }
   
    public static String oposto3(String nome) {
        Scanner on  = new Scanner (System.in);
        System.out.println(nome +", digite X, Y e Z do vetor:");
       
        int a = on.nextInt() * -1;
        int b = on.nextInt() * -1;
        int a1 = on.nextInt() * -1;
        String azu = "O novo vetor é v = ("+a+", "+b+", "+a1+").";
       
        return azu;
    }
   
}