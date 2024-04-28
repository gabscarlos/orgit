import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  clearUsername: () => void;
}

export default function Header({ clearUsername }: HeaderProps) {
  const router = useRouter();

  function handleLogout() {
    clearUsername();
    router.push("/login");
  }  

  return (
    <header className="flex justify-evenly w-full bg-[#5C9ECF] p-2 max-sm:flex-col max-sm:items-center max-sm:p-1">
      <div className="flex items-center gap-4 max-sm:flex-wrap max-sm:gap-2 max-sm:justify-evenly">
        <span className="text-pink-500 text-xl font-bold bg-white rounded-full p-1 px-5 mr-4">
          orgit
        </span>
        <a href="" className="text-white text-sm font-bold">
          Início
        </a>
        <p className="text-[#5292C1]">|</p>
        <a href="" className="text-white text-sm">
          Pull Requests
        </a>
        <p className="text-[#5292C1]">|</p>
        <a href="" className="text-white text-sm">
          Pull Requests
        </a>
        <p className="text-[#5292C1]">|</p>
        <a href="" className="text-white text-sm">
          Issues
        </a>
        <p className="text-[#5292C1]">|</p>
        <a href="" className="text-white text-sm">
          Marketplace
        </a>
        <p className="text-[#5292C1]">|</p>
        <a href="" className="text-white text-sm">
          Explore
        </a>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-[#5292C1]">|</p>
        <button onClick={handleLogout} className="text-white text-sm">
          Sair
        </button>
        <div className="relative max-lg:hidden">
          <IconSearch
            color="white"
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            className="text-white text-sm bg-[#5579A1] rounded-full pl-10 p-2 placeholder:text-white"
            type="text"
            placeholder="Pesquisar no Login"
          />
        </div>
      </div>
    </header>
  );
}


