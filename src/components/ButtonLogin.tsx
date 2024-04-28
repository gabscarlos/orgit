interface ButtonLoginProps {
  text: string;
  type?: string;
  onClick?: () => void;
  className?: string;
}

export default function ButtonLogin(props: ButtonLoginProps) {
  return (
    <button
      className={`flex items-center justify-center w-44 h-8 bg-[#2E7BB4] hover:bg-[#1f425e] text-white text-center rounded-lg p-2 
        ${props.className ?? ""}
      `}
    >
      {props.text}
    </button>
  );
}
