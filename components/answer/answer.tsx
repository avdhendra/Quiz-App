import React from 'react'
import { ThemedView } from '../ThemedView'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText } from '../ThemedText'

type Props = {
    option:string;
    handleOptionPress:(option:string)=>void;
    isAnswerCorrect: boolean|null;
    selectedOption:string|null
}

export const Answer = (props: Props) => {
    return (
        <TouchableOpacity style={[styles.container,props.selectedOption === props.option
            ? props.isAnswerCorrect
              ? styles.correctOption
              : styles.incorrectOption
            : null]} onPress={()=>props.handleOptionPress(props.option)}>

            
                <ThemedText>{props.option}</ThemedText>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        width: "80%",
        height: "10%",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    correctOption: {
        backgroundColor: 'green'
    },
    incorrectOption: {
        backgroundColor:'red'
    },
    text: {
        fontSize: 12,
        
    }
})