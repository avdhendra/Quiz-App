import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'

const cardGap = 16;
const cardWidth = (Dimensions.get('window').width - cardGap * 6) / 2;

type Props = {
    
    title: string;
}

export const Card = (props: Props) => {
   
    return (
        <TouchableOpacity onPress={()=>router.push({pathname:'category/[id]',params:{id:props.title}})}>
            <ThemedView style={styles.card}>

                <ThemedText type="defaultSemiBold" style={styles.cardText} >
                    {props.title}
                </ThemedText>
            </ThemedView>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {

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