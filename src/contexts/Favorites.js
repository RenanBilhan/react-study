import { createContext, useContext, useState } from "react";

export const FavoritesContext = createContext()
FavoritesContext.displayName = "MyFavorites"

export default function FavoritesProvider({ children }){
    const [ favorite, setFavorite] = useState([])

    return (
        <FavoritesContext.Provider 
            value={{ favorite, setFavorite }}
        >
            { children }
        </FavoritesContext.Provider>
    );
}

// Hook personalizado
export function useFavoriteContext(){
    const { favorite, setFavorite } = useContext(FavoritesContext)

    function addFavorite(newFavorite){

        // Verificando itens repetidos
        const repeatedFavorite = favorite.some((item) => item.id === newFavorite.id)

        // Nova lista recebe lista anterior
        let newList= [...favorite]

        // Adicionando o item, se nao for repetido
        if(!repeatedFavorite){
            newList.push(newFavorite)
            return setFavorite(newList)
        }

        newList = favorite.filter((fav) => fav.id !== newFavorite.id)
        return setFavorite(newList)
    }
    return { favorite, addFavorite}

}