export default function SignInPage() {
  return (
    <div className="bg-black min-h-screen min-w-full flex justify-center items-center ">
      <form className="bg-secundaria border border-color-principal rounded-7 w-28rem h-30rem  flex items-center flex-col justify-evenly">
        <div>
          <h1 className="text-[2.0rem]">Sign In</h1>
          <p className="text-[0.87rem]">
            Digite os seus dados de acesso no campo abaixo
          </p>
        </div>

        <div className="flex items-center, justify-center gap-6 flex-col ">
          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="">Email:</label>
            <input
              type="text"
              className="rounded-7 p-1 text-texto-principal outline-0 h-10"
            />
          </div>

          <div className="flex flex-col w-80 gap-1">
            <label htmlFor="">Senha:</label>
            <input
              type="password"
              className="rounded-7 p-1 text-texto-principal outline-0 h-10"
            />
          </div>

          <p className="text-[0.9rem] underline hover:cursor-pointer">
            Esqueci minha senha
          </p>
        </div>

        <button className="border border-7 rounded-7 p-2 w-60 bg-principal inset-1 active:shadow-entry active:text-[0.9rem]">
          Entrar
        </button>
      </form>
    </div>
  );
}
