import { createContext, useState } from "react";

const DataContext=createContext({})

export const DataProvider=({children})=>{
    //logic
  const [signedIn ,setSignedIn]=useState(false)

return(
    <DataContext.Provider value={{
        setSignedIn ,signedIn
    }}>
        {children}
    </DataContext.Provider>
)
}

export default DataContext