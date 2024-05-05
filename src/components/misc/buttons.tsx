import { Button, ButtonProps } from "../ui/button";

export function YellowButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={`bg-customAccent hover:bg-customAccent hover:brightness-90 text-black w-[20em] font-bold ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export function BlueButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={`bg-customPrimary hover:bg-customPrimary hover:brightness-90 text-white w-[20em] font-bold ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export function BackButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={`bg-customAccent hover:bg-customAccent hover:brightness-90 h-16 w-16 rounded-full hover:pr-6 ${className}`}
      {...props}
    >
      <div className="w-0 h-0 border-transparent border-r-black border-y-[1em] border-r-[1.2em] relative left-[-0.1em]" />
      {children}
    </Button>
  );
}
