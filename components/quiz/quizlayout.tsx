
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { Answer } from '../answer/answer'
import { ThemedButton } from '../ThemedButton'
import { StyleSheet } from 'react-native'

type Props = {
    question: string,
   
    handleOptionPress:(option:string)=>void
    isAnswerCorrect: boolean|null
    option:string[],
    selectedOption:string|null

}

export const Quizlayout = (props: Props) => {
    console.log("question",props.question)
    return (
        <><ThemedView style={styles.questionContainer}>
            <ThemedText style={styles.question}>
               {props.question}
            </ThemedText>
        </ThemedView>
        { props.option?.map((item,index)=>(
            
            <Answer key={index} option={item} handleOptionPress={props.handleOptionPress} isAnswerCorrect={props.isAnswerCorrect} selectedOption={props.selectedOption} />
        ))
        }
       </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:"100%",
      alignItems: "center"
    },
    questionContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom:5
  
  
    },
    question:{
     fontSize:20,
  
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
    buttonContainer:{
      display:"flex",
      marginTop:20,
      width:"100%",
      height:50,
      flexDirection:"row",
      justifyContent:"center",
      gap:50,
      alignItems:"center"
  
    },
    previouButton:{
      backgroundColor:"gray"
    },
    nextButton:{
      backgroundColor:"purple",
      paddingHorizontal:40
    }
  
  })