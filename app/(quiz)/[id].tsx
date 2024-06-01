import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { Answer } from "@/components/answer/answer";
import { Quizlayout } from "@/components/quiz/quizlayout";
import { database } from "@/constants/appwriteConfig";
import { useQuizContext } from "@/context/QuizContext";
import { QuizDocument } from "@/types/types.def";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native"
import { Models, Query } from "react-native-appwrite";
import { useNavigation } from "expo-router";



export default function Quiz() {
const navigation=useNavigation()
  const {score,setQuizScore}=useQuizContext()
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const { id } = useLocalSearchParams()
  const [data, setData] = useState<Models.Document[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const getQuiz = async (id: string[] | string) => {

     try{

       const response = await database.listDocuments(process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string, [Query.equal("title", id)])
      
       setData(response.documents)
     }    catch(error){
       console.log("error getting quiz data :",error)
     }


  }

  useEffect(() => {
    setQuizScore(0)
    if (id) {

      getQuiz(id)

    }
  }, [id])
  const currentQuestion = data[0]?.questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          clearInterval(timer);
          handleTimeOut();
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const handleTimeOut = () => {
    Alert.alert('Time is up!', `Your score is ${20}`);
    navigation.goBack()

  };
  

  const handleNextProps = (scorevalue:number) => {
    
    setSelectedOption(null);
    
    setIsAnswerCorrect(null);
    if (currentQuestionIndex < data[0].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      
      Alert.alert('Quiz Completed!', `Your final score is ${scorevalue}`);
      navigation.goBack()
    }
  }
  
  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    if (option === data[0].questions[currentQuestionIndex].answer) {
      setIsAnswerCorrect(true);
      setQuizScore(prev=>prev+5);
      setTimeout(() => {
        handleNextProps(score+5);
      }, 1000);
    } else {
      setIsAnswerCorrect(false);
      setTimeout(() => {
        handleNextProps(score);
      }, 1000);
    }
   

  }
  console.log("score",score)
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Text style={styles.title}>{data[0]?.title} Quiz</Text>
        <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      </ThemedView>

      <Quizlayout 
      selectedOption={selectedOption}
      isAnswerCorrect={isAnswerCorrect} 
      option={currentQuestion?.options} 
      question={currentQuestion?.question} 
      handleOptionPress={handleOptionPress}/>

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff"
  },
  timer: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#fff"
  },


})