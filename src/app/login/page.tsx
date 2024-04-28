"use client"
import Apresentacao from "@/components/Apresentacao";
import ButtonLogin from "@/components/ButtonLogin";
import Input from "@/components/Input";
import Rodape from "@/components/Rodape";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface User {
  email: string;
  senha: string;
  nome: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const handleChangeNomeUsuario = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNomeUsuario(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (typeof window !== 'undefined') {
      const cadastroDataString = localStorage.getItem("cadastroData");
  
      if (cadastroDataString) {
        const cadastroData: User[] = JSON.parse(cadastroDataString);
  
        // Procurar pelo usuário com o email correspondente
        const usuario = cadastroData.find((user) => user.email === email);
  
        if (usuario && usuario.senha === senha) {
          // Armazenar apenas as informações relevantes do usuário logado no localStorage
          localStorage.setItem("usuarioLogado", JSON.stringify({
            email: usuario.email,
            nome: nomeUsuario // Aqui você pode usar o nome de usuário fornecido no campo de entrada
          }));
  
          // Passar as informações do usuário para a página inicial
          router.push(`/home?email=${encodeURIComponent(usuario.email)}`);
        } else {
          setErro("Email ou senha incorretos. Por favor, tente novamente.");
        }
      } else {
        setErro(
          "Nenhum cadastro encontrado. Por favor, registre-se antes de fazer login."
        );
      }
    } else {
      // Se o código estiver sendo executado em um ambiente onde localStorage não está disponível
      // Você pode lidar com isso aqui, por exemplo, exibindo uma mensagem de erro ou redirecionando para uma página de erro.
      console.error("localStorage is not available");
    }
  };
  

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
      <div className="flex w-5/6 gap-4 max-sm:flex-col max-sm:ml-0 max-sm:gap-2">
        <Apresentacao />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-1/3 h-[320px] bg-[#F1F9FE] rounded-lg gap-1 max-sm:w-full"
        >
          <p className="text-sm text-center mt-6 mb-2">
            Acesse o <b>login</b>
            <br />
            com seu usuário do Github
          </p>
          <div className="flex flex-col gap-3 mb-1">
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Digite seu email"
            />
            <Input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={handleChangeSenha}
              placeholder="Digite sua senha"
            />
            <Input
              type="text"
              id="nome"
              name="nome"
              value={nomeUsuario}
              onChange={handleChangeNomeUsuario}
              placeholder="Usuário Github"
            />
          </div>
          <a className="text-[#2E7BB4] text-xs" href="/">
            Não tem cadastro?
          </a>
          <ButtonLogin text="Login" className="mb-11 mt-8" />
        </form>
      </div>
      <Rodape />
    </main>
  );
}
