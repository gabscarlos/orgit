"use client";
import ButtonHome from "@/components/ButtonHome";
import Header from "@/components/Header";
import SorteDoDia from "@/components/SorteDoDia";
import UserRepositories from "@/components/UserRepositories";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";

interface Repository {
  id: number;
  name: string;
  htmlUrl: string;
}

export default function Home() {
  
  const [limpaUsername, setLimpaUsername] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userDataString = localStorage.getItem("usuarioLogado");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const username = userData ? userData.nome : "";
  const userEmail = userData ? userData.email : "";
  

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Repository[]>(
          `https://api.github.com/users/${username}/repos`,
          {
            params: {
              per_page: 100,
            },
          }
        );
        setRepositories(response.data);
      } catch (error) {
        setError("Failed to fetch repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function clearUsername() {
    setLimpaUsername("");
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Header clearUsername={clearUsername} />
      <div className="flex gap-2 mt-8">
        <nav className="flex flex-col w-1/6 bg-white rounded-xl gap-4 p-2">
          <Image
            className="ml-9 mt-9 w-[150px] rounded-full"
            src={`https://github.com/${username}.png`}
            width={100}
            height={100}
            alt="people"
          />
          <div className="bg-[#ECF2FA] h-1"></div>
          <div>
            <h2 className="text-left text-[#2E7BB4] text-xl font-bold p-1">
              {username}
            </h2>
            <h3 className="text-zinc-400 text-lg p-1 -mt-2">
              Front-end Developer
            </h3>
          </div>
          <div className="bg-[#ECF2FA] h-1"></div>
          <div className="flex items-start p-1">
            <Image
              className="w-5"
              src="building.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <a href="" className="text-[#2E7BB4] ml-2 text-sm">
              @cubos academy
            </a>
          </div>
          <div className="flex items-start p-1">
            <Image
              className="w-5"
              src="pin.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <a href="" className="text-[#2E7BB4] ml-2 text-sm">
              Uberlândia-MG
            </a>
          </div>
          <div className="flex items-start p-1">
            <Image
              className="w-5"
              src="email.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <a href="" className="text-[#2E7BB4] ml-2 text-sm">
              {userEmail}
            </a>
          </div>
          <div className="flex items-start p-1">
            <Image
              className="w-5"
              src="url.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <a
              href="https://potenciatech.com.br/"
              target="_blank"
              className="text-[#2E7BB4] ml-2 text-sm"
            >
              https://potenciatech.com.br/
            </a>
          </div>
          <div className="flex items-start p-1">
            <Image
              className="w-5 bg-black"
              src="x.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <a href="" target="_blank" className="text-[#2E7BB4] ml-2 text-sm">
              @{username}
            </a>
          </div>
          <div className="bg-[#ECF2FA] h-1"></div>
          <h2 className="text-left font-bold text-xl text-zinc-400 p-1">
            Organizações
          </h2>
          <div className="flex items-start p-1">
            <Image
              className="w-5"
              src="cubos.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <a href="" target="_blank" className="text-[#2E7BB4] ml-2">
              Cubos Academy
            </a>
          </div>
          <div className="flex items-start p-1">
            <Image
              className="w-5"
              src="omni.svg"
              alt="icon"
              width={30}
              height={30}
            />
            <a href="" target="_blank" className="text-[#2E7BB4] ml-2">
              Aracati Digital
            </a>
          </div>
        </nav>
        <main className="flex flex-col gap-5">
          <div className="flex flex-col bg-white rounded-xl p-7 gap-5">
            <h1 className="text-4xl">Bem-vindo(a), {username}</h1>
            <SorteDoDia />
            <div className="flex gap-5">
              <div className="flex flex-col w-20 items-center">
                <span className="text-xs italic">Repositórios</span>
                <div className="flex gap-2">
                  <Image
                    className="w-5"
                    src="repos.svg"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <p className="text-[#2E7BB4] italic">{repositories.length}</p>
                </div>
              </div>
              <div className="flex flex-col w-20 items-center">
                <span className="text-xs italic">Favoritos</span>
                <div className="flex gap-2">
                  <Image
                    className="w-5"
                    src="stars.svg"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <p className="text-[#2E7BB4] italic">1.4k</p>
                </div>
              </div>
              <div className="flex flex-col w-20 items-center">
                <span className="text-xs italic">Seguidores</span>
                <div className="flex gap-2">
                  <Image
                    className="w-5"
                    src="followers.svg"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <p className="text-[#2E7BB4] italic">1.1k</p>
                </div>
              </div>
              <div className="flex flex-col w-20 items-center">
                <span className="text-xs italic">Seguindo</span>
                <div className="flex gap-2">
                  <Image
                    className="w-5"
                    src="glass.svg"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <p className="text-[#2E7BB4] italic">216</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-xl p-7 gap-5">
            <h2 className="text-2xl">O que você deseja fazer?</h2>
            <div className="flex gap-3">
              <ButtonHome text="Criar Repositório" />
              <ButtonHome text="Importar Repositório" />
              <ButtonHome text="Novo Gist" />
              <ButtonHome text="Nova Organização" />
              <ButtonHome text="Novo Projeto" />
            </div>
          </div>
          <div className="flex flex-col bg-white rounded-xl p-7 gap-5">
            <h2 className="text-2xl">Meus repositórios:</h2>
            <UserRepositories username={username} />
          </div>
        </main>
        <aside className="flex flex-col gap-2">
          <div className="flex flex-col w-96 bg-white p-5 rounded-xl gap-3">
            <h2 className="text-xl font-bold">
              Seguindo <span className="text-[#2E7BB4]">(216)</span>
            </h2>
            <div>
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Towney Cartmae
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/men/10.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Kincaid Nelthrop
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/men/20.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Vale Domino
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/men/30.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Rene Rewbottom
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/men/40.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Claribel Ellerker
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/women/50.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Mellie Meegin
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/women/60.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#ECF2FA] h-1"></div>
            <h2 className="text-lg font-bold text-[#2E7BB4]">Ver todos</h2>
          </div>

          <div className="flex flex-col w-96 bg-white p-5 rounded-xl gap-4">
            <h2 className="text-xl font-bold">
              Seguidores <span className="text-[#2E7BB4]">(1.1k)</span>
            </h2>
            <div>
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Shaun Pullan
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/men/70.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Selene Atwater
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/women/20.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Yvon Katt
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/men/80.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Leanora Thowless
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/women/40.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Rod Older
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/men/96.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
                <div className="relative">
                  <p className="absolute bottom-0 left-0 text-white text-xs text-left ml-2">
                    Cullie Copelli
                  </p>
                  <Image
                    className="rounded-lg"
                    src="https://randomuser.me/api/portraits/women/10.jpg"
                    width={100}
                    height={100}
                    alt="people"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#ECF2FA] h-1"></div>
            <h2 className="text-lg font-bold text-[#2E7BB4]">Ver todos</h2>
          </div>
        </aside>
      </div>
    </div>
  );
}