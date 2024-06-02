import { Image, StyleSheet, View, FlatList } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

import { Card } from '@/components/card/Card';
import { useEffect, useState } from 'react';
import { GroupedData, QuizDocument } from '@/types/types.def';
import { database } from '@/constants/appwriteConfig';
import { Models } from 'react-native-appwrite';



export default function HomeScreen() {
  const [groupedData, setGroupedData] = useState<GroupedData[]>([]);
  const [refresh, setRefresh] = useState(false)
  const groupQuizzesByCategory = (data: Models.Document[]) => {
    const groupedData: { [key: string]: QuizDocument[] } = {};

    data.forEach(item => {
      const category = item.category;
      if (!groupedData[category]) {
        groupedData[category] = [];
      }
      groupedData[category].push(item as QuizDocument);
    });

    return Object.keys(groupedData).map(key => ({
      title: key,
      data: groupedData[key]
    }));
  };
  const getCategoriesData = async () => {
    setRefresh(true)
    try {

      const response = await database.listDocuments(process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string)
      setGroupedData(groupQuizzesByCategory(response.documents))
    } catch (error) {
      console.log("error", error)
    }

    setRefresh(false)
  }


  useEffect(() => {
    getCategoriesData()
  }, [])
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}

      headerImage={
        <View style={styles.reactLogoImage}>

          <Image
            source={require('@/assets/images/Quiz-App.png')}
            style={styles.reactLogo}
          />
        </View>
      }>

      <FlatList
        style={styles.cardlayout}
        numColumns={2}
        data={groupedData}
        onRefresh={() => getCategoriesData()}
        refreshing={refresh}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <Card key={index} title={item.title} />
        )}
      />


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  cardlayout: {

    display: 'flex',
    flexDirection: 'row',





  }

});

