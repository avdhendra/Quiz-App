import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TouchableOpacity, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { database } from '@/constants/appwriteConfig';
import { QuizCard } from '@/components/card/QuizCard';

export default function TabTwoScreen() {
  const [data,setData]=useState<any>([])
  const [refresh,setRefresh]=useState(false)
  const getQuizData=async()=>{
    try{
      setRefresh(true)
      const response=await database.listDocuments(process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string)
     
      setData(response.documents)

    }catch(error){
      console.log("error",error)
    }
    setRefresh(false)
  }
  useEffect(()=>{
   getQuizData()

  },[])
  console.log("data explore",data)
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}

      headerImage={
        <ThemedView style={styles.reactLogoImage}>

          <Image
            source={require('@/assets/images/Quiz-App.png')}
            style={styles.reactLogo}
          />
        </ThemedView>
      }>
        <ThemedView style={styles.container}>

        <TouchableOpacity>
         <FlatList
         data={data}
         numColumns={2}
         scrollEnabled={false}
         onRefresh={()=>getQuizData()}
         refreshing={refresh}
         renderItem={({item})=><QuizCard id={item.$id} category={item.category} title={item.title} key={item.id}/>}
         />
        </TouchableOpacity>
      <TouchableOpacity style={styles.testContainer} onPress={()=>router.push("(quiz)/createquiz")}>
        
        <ThemedView style={styles.createTestContainer}>
          <ThemedText style={styles.createTestText}>Create Quiz</ThemedText>
          <Ionicons name="add-circle" size={32} color="white" />
        </ThemedView>
      </TouchableOpacity>
        </ThemedView>



    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
flex:1
  },
  reactLogoImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
    width: '100%',
  },
  reactLogo: {
    height: 170,
    width: '100%',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  testContainer: {
    display: "flex",
    width: "50%",
    backgroundColor: 'gray',
    borderRadius: 20,
   marginTop:10
  },
  createTestContainer: {
    display: "flex",
    width: "100%",
    justifyContent:"center",
    backgroundColor: 'gray',
    alignItems: "center",
    borderRadius: 20,
    gap:10,
    height:100

  },
  createTestText: {
    fontSize: 18
  }
});
