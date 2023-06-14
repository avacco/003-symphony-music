import { FaTrash } from "react-icons/fa"


const DeleteButton = () => {
  return (
    <button className="transition opacity-0 rounded-full flex items-center bg-red-600 p-4 drop-shadow-sm translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
      <FaTrash className="text-black" />
    </button>
  )
}

export default DeleteButton;