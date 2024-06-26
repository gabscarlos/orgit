interface ButtonHomeProps {
  text: string;
}

export default function ButtonHome(props: ButtonHomeProps) {
  return (
    <button
      className={`flex items-center justify-center w-48 h-12 bg-[#D9E6F6] text-base text-[#2E7BB4] hover:bg-[#6F92BB] hover:text-white text-center rounded-lg p-2 
        
      `}
    >
      {props.text}
    </button>
  );
}
