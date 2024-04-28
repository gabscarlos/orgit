import Image from "next/image";
import {
  IconSquareChevronLeft,
  IconSquareChevronRight,
  IconStarFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Repository {
  id: number;
  name: string;
  html_url: string;
}

interface UserRepositoriesProps {
  username: string;
}

export default function UserRepositories(props: UserRepositoriesProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Repository[]>(
          `https://api.github.com/users/${props.username}/repos`,
          {
            params: {
              page,
              per_page: perPage,
            },
          }
        );
        setRepositories(response.data);        
      } catch (error) {
        setError("Ocorreu um erro ao buscar os repositórios");
      } finally {
        setLoading(false);
      }
    };
    fetchRepositories();
  }, [props.username, page, perPage]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-[#D9E6F6] rounded-lg p-5">
      <div>
        <div className="flex flex-col justify-between gap-2">
          {repositories.map((repository) => (
            <div className="flex flex-col w-full gap-2" key={repository.id}>
              <div className="flex justify-between gap-2">
                <div>
                  <div className="flex">
                    <Image
                      className="w-5"
                      src="repos.svg"
                      alt="icon"
                      width={30}
                      height={30}
                    />
                    <a
                      href={repository.html_url}
                      target="_blank"
                      className="text-base text-[#2E7BB4] font-bold"
                    >
                      {repository.name}
                    </a>
                  </div>
                  <p className="text-sm text-zinc-400">Repositório</p>
                </div>
                <button className="flex items-center text-white bg-[#6F92BB] rounded-xl p-4">
                  <IconStarFilled className="text-yellow-400" size={20} />
                  Star
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-5">
          <div className="flex gap-5">
            <button onClick={handlePrevPage} disabled={page === 1}>
              <IconSquareChevronLeft
                className="text-[#2E7BB4] hover:text-[#30668f]"
                size={20}
              />
            </button>
            <span className="text-[#2E7BB4] font-bold">Página {page}</span>
            <button
              onClick={handleNextPage} 
            >
              <IconSquareChevronRight
                className="text-[#2E7BB4] hover:text-[#30668f]"
                size={20}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
