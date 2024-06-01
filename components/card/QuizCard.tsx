import React from 'react'
import { router } from 'expo-router'
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'

const cardGap = 16;
const cardWidth = (Dimensions.get('window').width - cardGap * 6) / 2;

type Props = {
    id:string;
    title: string;
    category:string;
    
}

export const QuizCard = (props: Props) => {
    console.log("propsid",props.id)
    return (
        <TouchableOpacity onPress={()=>router.push({pathname:'(edit)/[id]',params:{id:props.id}})}>
            <ThemedView style={styles.card}>

                <ThemedText type="defaultSemiBold" style={styles.cardText} >
                    Title: {props.title}
                </ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.cardText} >
                    Category: {props.category}
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        display:"flex",
        marginTop: cardGap,
        marginLeft: 10,
        width: cardWidth,
        height: 180,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowOpacity: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardText: {
        fontSize: 15,
        color:"#000"

    }
});