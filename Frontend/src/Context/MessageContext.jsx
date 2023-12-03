import { createContext, useContext, useState} from "react";


const MessageContext = createContext()

export function MessageContextProvider({children}) {
  
  const [successMessage, setSuccessMessage] = useState(false)
  const [editMessage, setEditMessage] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(false)
    
    const contexValues = {
        successMessage,
        setSuccessMessage,
        editMessage,
        setEditMessage,
        deleteMessage,
        setDeleteMessage,
    }  


    return <MessageContext.Provider value={contexValues}>{children}</MessageContext.Provider>
}

export function useMessageContext() {
    return useContext(MessageContext)
}