import { Dispatch, ReactNode, SetStateAction } from "react";

export interface Option {
    option: string;
  }
  
export  interface Question {
    question: string;
    answer: string;
    options: string[];
  }
  
 export interface FormValues {
    title: string;
    category: string;
    questions: Question[];
  }

 export  interface QuizDocument {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[];
    $updatedAt: string;
    category: string;
    questions: Question[];
    title: string;
  }
  
 
 export  interface GroupedData {
    
    title: string;
    data: QuizDocument[];
}


export interface QuizProviderProps {
  children: ReactNode;
}

export interface QuizContextType {
  score: number;
  setQuizScore: Dispatch<SetStateAction<number>>;
}

