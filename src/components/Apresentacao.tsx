import Image from "next/image";

export default function Apresentacao() {
    return (
        <div className="flex flex-col items-center w-2/3 h-full bg-white rounded-lg gap-1">
          <Image
            className="mt-9 mb-12 w-[150px]"
            src="code1.svg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
          <div className="flex">
            <p className="text-pink-500 font-bold">Siga &nbsp;</p>
            <p>amigos e outros devs do seu interesse usando o botão seguir</p>
          </div>
          <div className="flex">
            <p className="text-pink-500 font-bold">Conheça &nbsp;</p>
            <p>novos devs e repositórios através da aba explorar</p>
          </div>
          <div className="flex">
            <p className="text-pink-500 font-bold">Compartilhe &nbsp;</p>
            <p>ideias e soluções em um só lugar</p>
          </div>
        </div>
    )
}