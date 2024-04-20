import { cn } from "@/lib/utils"
import "./style.css"

export const AppButton = (props:React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>)=>{
    return <button {...props} className={cn("w-full btn rounded-full border-2 px-4 py-4 border-black bg-white text-neutral-700 transition-all duration-200 text-base font-semibold text-center",props.className)}>{props.children}</button>
}
