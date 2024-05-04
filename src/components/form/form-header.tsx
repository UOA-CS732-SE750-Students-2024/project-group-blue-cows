interface AuthHeaderProps {
    label: string
    title: string
    }

export const FormHeader = ({label, title}: AuthHeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className=" text-xl text-muted-foreground">{label}</p>
    </div>
  )
}
