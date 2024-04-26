"use client";
import Apresentacao from "@/components/Apresentacao";
import ButtonLogin from "@/components/ButtonLogin";
import Input from "@/components/Input";
import Rodape from "@/components/Rodape";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmaSenha: string;
}

export default function Cadastro() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });
  const [erro, setErro] = useState("");
  const [isEmailValido, setIsEmailValido] = useState<boolean>(true);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (typeof window !== 'undefined') {
      if (!validarEmail(formData.email)) {
        setIsEmailValido(false);
        return;
      } else {
        setIsEmailValido(true);
      }
  
      if (formData.senha !== formData.confirmaSenha) {
        alert("As senhas não conferem");
        return;
      }
  
      // Verificar se já existem dados cadastrados
      const cadastroDataString = localStorage.getItem("cadastroData");
      const cadastroData: FormData[] = cadastroDataString ? JSON.parse(cadastroDataString) : [];
  
      // Verificar se o email já está cadastrado
      const emailJaCadastrado = Array.isArray(cadastroData) && cadastroData.some(
        (user) => user.email === formData.email
      );
      if (emailJaCadastrado) {
        setErro("Este email já está cadastrado. Por favor, utilize outro.");
        return;
      }
  
      // Adicionar novo usuário à lista de cadastros
      cadastroData.push(formData);
  
      // Salvar lista atualizada no localStorage
      localStorage.setItem("cadastroData", JSON.stringify(cadastroData));
  
      router.push("/login");
  
      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: "",
      });
    } else {
      // Se o código estiver sendo executado em um ambiente onde localStorage não está disponível
      // Você pode lidar com isso aqui, por exemplo, exibindo uma mensagem de erro ou redirecionando para uma página de erro.
      console.error("localStorage is not available");
    }
  };
  

  function validarEmail(email: string): boolean {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="flex w-5/6 h-[368px] gap-4 ml-11">
        <Apresentacao />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between items-center w-1/3 h-full bg-[#F1F9FE] rounded-lg"
        >
          <p className="text-sm text-center mt-6">
            Faça o <b>cadastro</b>
            <br /> com seu e-mail
          </p>
          <div className="flex flex-col gap-2 mb-4">
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              className={` 
              ${isEmailValido ? "border-gray-300" : "border-red-500"}
              ${isEmailValido ? "text-black" : "text-red-500"}
              ${isEmailValido ? "bg-white" : "bg-red-100"}
              `}
            />
            <Input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
            <Input
              type="password"
              id="confirmaSenha"
              name="confirmaSenha"
              value={formData.confirmaSenha}
              onChange={handleChange}
              placeholder="Repita sua senha"
            />            
          </div>
          <ButtonLogin type="submit" text="Cadastrar" className="mb-11" />
          <p className="text-xs text-[#5292C1]">
            Já tem cadastro? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <Rodape />
    </main>
  );
}
