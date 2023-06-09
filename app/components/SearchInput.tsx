"use client";

import qs from "query-string";

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./Input";

/* Componente que permite realizar la busqueda de canciones */
const SearchInput = () => {

  const router = useRouter();

  const [value, setValue] = useState<string>("")
  const debouncedValue = useDebounce<string>(value, 1000);

  useEffect(() => {
    const query = { title: debouncedValue, }; // Prepara el query para la busqueda

    const url = qs.stringifyUrl({ // Convierte el query en una url
      url: "/search",
      query: query
    });

    router.push(url); // Redirecciona a la url

    // Todo esto con el objetivo de que en la pagina /search, a traves de los parametros enviados, se haga la busqueda de las canciones coincidentes

  }, [debouncedValue, router])
  

  return (
    <div>
      <Input 
        placeholder="¿Que quieres escuchar?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default SearchInput