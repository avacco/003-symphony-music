import getSongsByTitle from "@/actions/getSongsByTitle";
import { Header } from "../components/Header";
import SearchInput from "../components/SearchInput";
import SearchContent from "../components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  }
};
/* Renderiza la página de busqueda. Recibe como parámetro (con searchParams) el título de la canción a buscar. */
const Search = async ({ searchParams }: SearchProps) => {
  
  // Envia el titulo de la cancion a buscar y recibe las canciones que coinciden con ese titulo, o que al menos, son parecidas.
  const songs = await getSongsByTitle(searchParams.title);  

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Buscar
          </h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  )
};

export default Search;