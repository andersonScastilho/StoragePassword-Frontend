import { HeaderComponent } from "@/components/header/header-component";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-full min-w-full flex flex-col ">
      <HeaderComponent />
      <section className="flex-grow min-h-screen w-full flex flex-col bg-homepage bg-100 bg-no-repeat justify-center items-center p-5">
        <div className="p-1 flex bg-gray-950 bg-opacity-40 flex-col text-center justify-center gap-5 border rounded-sm border-transparent md:w-2/4 md:h-60">
          <h1 className="md:text-[2.0rem]  text-primary-foreground font-bold ">
            Gerencie suas senhas de forma facil e segura com P@SSTORAGE
          </h1>
          <div className="text-[0.7rem] md:text-[0.8rem] text-primary-foreground font-semibold">
            <p>Nunca mais preocupe-se em decorar suas senhas.</p>
            <p>Tenha tudo à mão no P@SSTORAGE, seguro e pratico.</p>
          </div>
        </div>
      </section>
      <section className="w-full min-h-screen flex bg-homepage-list bg-100 bg-no-repeat justify-center items-center p-2   ">
        <div className="p-2 bg-slate-300 bg-opacity-50 w-full flex flex-col rounded-md border border-transparent ">
          <h1 className="text-primary-foreground text-[2rem] font-semibold text-center">
            Vantagens de usar o P@SSTORAGE
          </h1>
          <div className="w-full flex p-3 justify-center items-center h-full gap-2 flex-wrap xl:gap-0 ">
            <Card className="w-80 h-30rem text-primary border-transparent  text-center text-[1.5rem] p-1 lg:absolute lg:mr-40rem lg:w-23rem xl:absolute xl:mr-53rem xl:w-26rem">
              <CardHeader>
                <CardTitle>P@SSTORAGE</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <img
                  className="h-52 rounded-sm w-96 lg:w-64 xl:w-96"
                  src="https://img.freepik.com/fotos-gratis/pessoa-trabalhando-html-no-computador_23-2150038860.jpg?w=1060&t=st=1697254045~exp=1697254645~hmac=25206bf7e05593eca49dac036fa210d5bc0b8ca8ed99cd3aafe65d557e911c01"
                />
                <CardDescription className="lg:mr-12 xl:mr-0">
                  Tela para atualizar storage
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 lg:w-80 xl:w-96">
                <p className="text-[1.0rem] text-start">
                  <span className="font-semibold">1°</span> Você consegue
                  atualizar seus storages de maneira facil e rapida
                </p>
                <p className="text-[0.9rem] text-start">
                  <span className="font-semibold"> Dica:</span> sempre que
                  atualizar sua senha, lembre-se de atualizar seu storage
                </p>
              </CardFooter>
            </Card>
            <Card className="w-80  z-10 border-transparent  text-primary text-center text-[1.5rem] p-1 lg:h-35rem lg:w-25rem xl:h-35rem xl:w-28rem">
              <CardHeader>
                <CardTitle>P@SSTORAGE</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <img
                  className="h-52 rounded-sm"
                  src="https://img.freepik.com/fotos-gratis/pessoa-trabalhando-html-no-computador_23-2150038860.jpg?w=1060&t=st=1697254045~exp=1697254645~hmac=25206bf7e05593eca49dac036fa210d5bc0b8ca8ed99cd3aafe65d557e911c01"
                />
                <CardDescription>Tela preview de storages</CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col w-full gap-2">
                <p className="text-[1.0rem] text-start ">
                  <span className="font-semibold">1°</span> Você consegue
                  visualizar todos os storages registrado.
                </p>
                <p className="text-[1.0rem] text-start ">
                  <span className="font-semibold">2°</span> Navegar para o site
                  cadastrado no storage com apenas um click
                </p>
                <p className="text-[1.0rem] text-start ">
                  <span className="font-semibold">3°</span> E visualizar o
                  email/username de cada storage registrado para não ficar
                  perdido
                </p>
                <p className="text-[0.9rem] text-start">
                  <span className="font-semibold"> Dica:</span> Comece utilizar
                  senhas dificeis, agora que é possivel visualiza a qualquer
                  momento
                </p>
              </CardFooter>
            </Card>
            <Card className="w-80 h-30rem text-primary border-transparent flex flex-col text-center text-[1.5rem] p-1 lg:absolute lg:ml-40rem lg:w-23rem xl:absolute xl:ml-53rem xl:w-26rem">
              <CardHeader>
                <CardTitle>P@SSTORAGE</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <img
                  className="h-52 rounded-sm w-96 lg:w-64 lg:ml-12 xl:w-96 xl:ml-0"
                  src="https://img.freepik.com/fotos-gratis/pessoa-trabalhando-html-no-computador_23-2150038860.jpg?w=1060&t=st=1697254045~exp=1697254645~hmac=25206bf7e05593eca49dac036fa210d5bc0b8ca8ed99cd3aafe65d557e911c01"
                />
                <CardDescription className="lg:ml-12 xl:ml-0">
                  Tela para visualizar senha salva
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 lg:w-80 lg:ml-12 xl:w-96 xl:ml-0">
                <p className="text-[1.0rem] text-start ">
                  <span className="font-semibold">1°</span> Você consegue
                  visualizar sua senha salva a qualquer momento de forma segura
                </p>
                <p className="text-[0.9rem] text-start">
                  <span className="font-semibold"> Dica:</span> Comece utilizar
                  senhas dificeis, agora que é possivel visualiza a qualquer
                  momento
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full min-h-screen flex bg-homepage-list bg-100 bg-no-repeat justify-center items-center p-1">
        <div className="p-3  flex flex-wrap bg-gray-950 bg-opacity-80 text-center justify-center gap-5 border rounded-sm border-transparent">
          <div className="md:w-2/4 p-2 flex flex-col gap-2 ">
            <h1 className="md:text-[1.4rem]  text-primary-foreground font-bold ">
              Por que Criamos Nosso Próprio Gerenciador de Senhas?
            </h1>
            <div className="flex flex-col gap-2 text-start justify-center items-center text-[0.8rem] text-primary-foreground font-semibold">
              <p>
                Em um mundo cada vez mais digital, onde nossas vidas estão
                entrelaçadas com inúmeras contas online, a segurança e a
                praticidade se tornaram essenciais.
              </p>
              <p>
                Foi essa necessidade que nos inspirou a criar nosso próprio
                Gerenciador de Senhas. Percebemos que o desafio de lembrar
                senhas complexas, mantê-las atualizadas e, ao mesmo tempo,
                garantir a segurança de nossas informações pessoais era uma
                tarefa árdua para muitos de nós.
              </p>
              <p>
                A sensação de frustração ao esquecer uma senha importante ou a
                preocupação com a segurança de nossas contas era algo que não
                queríamos mais enfrentar. Assim, decidimos desenvolver uma
                solução que fosse ao encontro dessas preocupações.
              </p>
            </div>
          </div>
          <Separator />
          <div className="md:w-2/4 p-2 flex gap-2 flex-col justify-around">
            <h1 className="md:text-[1.4rem] text-primary-foreground font-bold">
              Por que escolher o P@SSTORAGE ?
            </h1>
            <div className="flex flex-col text-start justify-center items-center font-semibold  ">
              <ol className=" text-[0.8rem] list-decimal text-primary-foreground flex flex-col gap-1">
                <li>Mantenha todas as suas senhas em um só lugar.</li>
                <li>Acesso rapido e facil a todas as suas contas online</li>
                <li>Segurança avançada para proteger suas informações</li>
                <li>Gerador de senha para criar combinações seguras</li>
                <li>Navegação simplificada e interface amigavel</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
