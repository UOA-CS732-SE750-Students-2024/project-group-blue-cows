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
      className={`bg-customAccent hover:bg-customAccent hover:brightness-90 h-16 w-16 p-0 rounded-full ${className}`}
      {...props}
    >
      <div className="w-full h-full flex justify-center items-center relative left-[-0.2em] transition-transform hover:-translate-x-1">
        <div className="w-0 h-0 border-transparent border-r-black border-y-[1em] border-r-[1.2em]" />
      </div>
    </Button>
  );
}
