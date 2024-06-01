import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { database } from "@/constants/appwriteConfig";
import { FormValues, QuizDocument } from "@/types/types.def";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { FieldArray, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ID, Models, Query } from "react-native-appwrite";
import RNPickerSelect from 'react-native-picker-select';


const categories = [
  { label: 'Math', value: 'math' },
  { label: 'Science', value: 'science' },
  { label: 'History', value: 'history' },
  // Add more categories as needed
]



export default function EditQuiz() {
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()
  const [data, setData] = useState<Models.Document[]>([])
  const [loading, setLoading] = useState(true);
  
  const getQuizData = async (id: string[] | string) => {
     try{

      const response = await database.listDocuments(process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string, [Query.equal("$id", id)])
     console.log("response gea",response.documents)
      setData(response.documents)
    }    catch(error){
      console.log("error updating quiz: ",error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {

      getQuizData(id)
    }
  }, [id])




  const saveQuiz = async (values: FormValues) => {
    try {
      const response = await database.updateDocument(
        process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string,
        data[0].$id,
        values
      );
      Alert.alert('Quiz Successfully updated');
    } catch (error) {
      console.error('Failed to update quiz:', error);
    }
  }
  const handleDelete=async()=>{
    try{
      const response=await database.deleteDocument(process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string,data[0].$id)
      console.log("response",response)
      Alert.alert('Quiz Successfully deleted');
      navigation.goBack()
      
    }catch(error){
      console.log("error deleting data: ",error)
    }
  }


if(loading){
  return(
    <ThemedText>Loading...</ThemedText>
  )
}

  return (
    <ThemedView>
      <Formik
        initialValues={{
          title: data[0]?.title || '',
          category: '',
          questions: data[0].questions||[{
            question: '',
            answer: '',
            options: ['']
          }]
        }}
        onSubmit={values =>

          saveQuiz(values)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <ThemedView>
            <ScrollView>
              <TextInput
                placeholder="Title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
                style={styles.input}
              />
              <RNPickerSelect
                onValueChange={handleChange('category')}
                items={categories}
                style={pickerSelectStyles}
                placeholder={{ label: 'Select a category', value: '' }}
                value={values.category}
              />
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <ThemedView>
                    {values.questions.map((question:any, questionIndex:number) => (
                      <ThemedView key={questionIndex} style={styles.questionContainer}>
                        <TextInput
                          placeholder={`Question ${questionIndex + 1}`}
                          onChangeText={handleChange(`questions[${questionIndex}].question`)}
                          onBlur={handleBlur(`questions[${questionIndex}].question`)}
                          value={question.question}
                          style={styles.input}
                        />
                        <TextInput
                          placeholder="Answer"
                          onChangeText={handleChange(`questions[${questionIndex}].answer`)}
                          onBlur={handleBlur(`questions[${questionIndex}].answer`)}
                          value={question.answer}
                          style={styles.input}
                        />
                        <FieldArray name={`questions[${questionIndex}].options`} >
                          {({ push: pushOption, remove: removeOption }) => (
                            <View>
                              <ThemedText>Options:</ThemedText>
                              {question.options.map((option:any, optionIndex:number) => (
                                <View key={optionIndex} style={styles.optionContainer}>
                                  <TextInput
                                    placeholder={`Option ${optionIndex + 1}`}
                                    onChangeText={handleChange(`questions[${questionIndex}].options[${optionIndex}]`)}
                                    onBlur={handleBlur(`questions[${questionIndex}].options[${optionIndex}]`)}
                                    value={option}
                                    style={styles.input}
                                  />
                                  {optionIndex > 0 && (
                                    <Button title="Remove" onPress={() => removeOption(optionIndex)} />
                                  )}
                                </View>
                              ))}
                              <Button title="Add Option" onPress={() => pushOption('')} />
                            </View>
                          )}
                        </FieldArray>
                        <ThemedView style={styles.removeQuestion}>

                          {questionIndex > 0 && (
                            <Button title="Remove Question" onPress={() => remove(questionIndex)} />
                          )}
                        </ThemedView>
                      </ThemedView>
                    ))}
                    <Button title="Add Question" onPress={() => push({
                      question: '',
                      answer: '',
                      options: ['']
                    })} />
                  </ThemedView>
                )}
              </FieldArray>

              <TouchableOpacity onPress={() => handleSubmit()} style={styles.submitButton}>
                <ThemedText>Update</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete()} style={styles.submitButton}>
                <ThemedText>Delete</ThemedText>
              </TouchableOpacity>
            </ScrollView>
          </ThemedView>
        )}
      </Formik>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: "100%",
    borderColor: '#ccc',
    color: "#000",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
  },
  questionContainer: {
    marginBottom: 20,
  },
  inputoption: {
    borderWidth: 1,
    width: "80%",
    borderColor: '#ccc',
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
  },
  removeQuestion: {
    marginTop: 10,

  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: "flex",
    width: "100%",
    gap: 3,
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: 'purple',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: "#fff",
    marginVertical: 5,
  },
});