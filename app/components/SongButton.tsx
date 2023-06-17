import { FaPlay, FaTrash, FaTimes } from "react-icons/fa"
import { twMerge } from "tailwind-merge"

interface PlayButtonProps {
  className?: string
  variant: "play" | "delete" | "cancel"
}

const SongButton: React.FC<PlayButtonProps> = ({ className, variant }) => {
  return (
    <button className={twMerge(`transition opacity-0 rounded-full flex items-center p-4 drop-shadow-sm translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110`, className)}>
      {variant === "play" && <FaPlay className="text-black" />}
      {variant === "delete" && <FaTrash className="text-black" />}
      {variant === "cancel" && <FaTimes className="text-black" />}
    </button>
  )
}

export default SongButton