interface InputProps {
  placeholder: string;
  type?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  
  className?: string;
}

export default function Input(props: InputProps) {
  return (
    <input
      className={`w-[209px] h-[32px] rounded-lg text-zinc-400 text-sm border border-zinc-400 p-4 ${props.className}`}
      type={props.type}
      placeholder={props.placeholder}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}    
      required
    />
  );
}
