import { QuizContextType, QuizProviderProps } from "@/types/types.def";
import { createContext, useContext, useState } from "react";

export const QuizContext=createContext<QuizContextType|undefined>(undefined)

export default function QuizProvider({children}:QuizProviderProps){
const [score,setScore]=useState(0)
 return(
     <QuizContext.Provider value={{score,setQuizScore:setScore}}>
         {children}
     </QuizContext.Provider>
 )
}

export function useQuizContext(): QuizContextType{
    const context=useContext(QuizContext)
    if (context === undefined) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }

    return context;
}