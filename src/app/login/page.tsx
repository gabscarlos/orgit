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

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login(props: LoginProps) {
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
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="flex w-5/6 h-[368px] gap-4 ml-11">
        <Apresentacao />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-center w-1/3 h-full bg-[#F1F9FE] rounded-lg"
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
          <a className="text-[#2E7BB4] text-xs mr-24" href="/">
            Não tem cadastro?
          </a>
          <ButtonLogin text="Login" className="mb-11 mt-8" />
        </form>
      </div>
      <Rodape />
    </main>
  );
}


