import { Subscription, UserDetails } from "@/types"
import { User } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null; 
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
};


/* Hook que se encargara de obtener los datos del usuario y chequear que esté logueado y/o tenga subscripcion */

export const MyUserContextProvider = (props: Props) => {
  const {session, isLoading: isLoadingUser, supabaseClient: supabase} = useSessionContext();

  // cambia el nombre de useUser a useSupaUser, ya que usaremos useUser para este hook
  const user = useSupaUser();

  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  
  // Obtiene los detalles del usuario
  const getUserDetails = () => supabase
                                .from('users')
                                .select('*')
                                .single();
  
  // Obtiene la subscripcion del usuario
  const getSubscription = () => supabase
                                  .from('subscriptions')
                                  .select('*, prices(*, products(*))')
                                  .in('status',['trialing', 'active'])
                                  .single();

  useEffect(() => { // Si esta logeado, no esta cargando datos, no ha cargado detalles de usuario y no ha cargado la suscripcion actual.
    if(user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);

      // Obtiene los detalles del usuario y su subscripcion, luego a estos resultados los asigna a constantes de promesa.
      Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        // Si las promesas fueron cumplidas, las asigna a sus constantes.
        if(userDetailsPromise.status === 'fulfilled') setUserDetails(userDetailsPromise.value.data as UserDetails);
        if(subscriptionPromise.status === 'fulfilled') setSubscription(subscriptionPromise.value.data as Subscription);
        
        setIsLoadingData(false);

      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  // encapsula los valores utilizados en un objeto
  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription
  };

  return <UserContext.Provider value={value} {...props} />;

}

export const userUser = () => {
  const context = useContext(UserContext);
  
  if(context === undefined) throw new Error('Hook useUser debe ser utilizado en un contexto de MyUserContextProvider');
  
  return context;

}
