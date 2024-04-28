import Image from "next/image";

export default function Apresentacao() {
    return (
        <div className="flex flex-col items-center w-2/3 h-[320px] bg-white rounded-lg gap-1 max-sm:w-full">
          <Image
            className="mt-9 mb-8 w-36 max-sm:my-2"
            src="code1.svg"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
          <div className="flex text-sm text-center">            
            <p><b className="text-pink-500 font-bold">Siga &nbsp;</b>amigos e outros devs do seu interesse usando o botão seguir</p>
          </div>
          <div className="flex text-sm text-center">            
            <p><b className="text-pink-500 font-bold">Conheça &nbsp;</b>novos devs e repositórios através da aba explorar</p>
          </div>
          <div className="flex text-sm text-center">            
            <p><b className="text-pink-500 font-bold">Compartilhe &nbsp;</b>ideias e soluções em um só lugar</p>
          </div>
        </div>
    )
}