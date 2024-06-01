import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { CategoryCard } from '@/components/card/CategoryCard'
import { database } from '@/constants/appwriteConfig'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Models, Query } from 'react-native-appwrite'

type Props = {}

export default function CategoryList(props: Props) {
  const { id } = useLocalSearchParams()
  const [data, setData] = useState<Models.Document[]>([])
  const getQuiz = async (id: string[] | string) => {

    console.log("hhi", id)
    const response = await database.listDocuments(process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string, [Query.equal("category", id)])
    console.log("hhi", response.documents)
    setData(response.documents)


  }
  useEffect(() => {
    if (id) {

       getQuiz(id)
      
    }
  }, [id])
  return (
    // <FlatList/>
    <ThemedView style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => <CategoryCard title={item.title} />}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  }
})