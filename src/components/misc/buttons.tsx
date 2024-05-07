import Image from "next/image";
import { Button, ButtonProps } from "../ui/button";

export function YellowButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={`bg-customAccent hover:bg-customAccent hover:brightness-90 transition text-black w-[20em] font-bold ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export function BlueButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={`bg-customPrimary hover:bg-customPrimary hover:brightness-90 transition text-white w-[20em] font-bold ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export function BackButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={`bg-customAccent hover:bg-customAccent hover:brightness-90 h-16 aspect-square p-0 rounded-full ${className}`}
      {...props}
    >
      <div className="w-full h-full flex justify-center items-center relative left-[-0.2em] transition-transform hover:-translate-x-1">
        <div className="w-0 h-0 border-transparent border-r-black border-y-[1em] border-r-[1.2em]" />
      </div>
    </Button>
  );
}

export function MiniButton({ className, children, ...props }: ButtonProps) {
  return (
    <Button
      className={`bg-customLight hover:bg-customLight hover:brightness-90 transition h-8 p-0 aspect-square rounded-full ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

type MiniIconButtonProps = ButtonProps & { icon: string; alt: string };

export function MiniIconButton({
  icon,
  alt,
  className,
  ...props
}: MiniIconButtonProps) {
  return (
    <MiniButton type="button" className={`${className}`} {...props}>
      <Image
        src={icon}
        alt={alt}
        width={20}
        height={20}
        className="hover:scale-[115%] transition-transform"
      />
    </MiniButton>
  );
}

export function MiniArrowButton({ className, ...props }: ButtonProps) {
  return (
    <MiniButton type="button" className={`${className}`} {...props}>
      <div className="w-full h-full flex justify-center items-center relative left-[-0.1em] transition-transform hover:-translate-x-0.5">
        <div className="w-0 h-0 border-transparent border-r-black border-y-[0.5em] border-r-[0.6em]" />
      </div>
    </MiniButton>
  );
}
