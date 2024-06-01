
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { FieldArray, Formik } from 'formik'
import RNPickerSelect from 'react-native-picker-select';
import { Button, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet, Alert } from 'react-native'
import { FormValues } from '@/types/types.def';
import { database } from '@/constants/appwriteConfig';
import { ID } from 'react-native-appwrite';


const categories = [
  { label: 'Math', value: 'math' },
  { label: 'Science', value: 'science' },
  { label: 'History', value: 'history' },
  // Add more categories as needed
]
export default function CreateQuiz() {
  const saveQuiz = async (value: FormValues) => {
    try {
     
      const response = await database.createDocument(process.env.DATABASE_ID as string, process.env.COLLECTION_ID as string,ID.unique(),value)
     
      Alert.alert('Quiz Successfully created');
    } catch (error) {
      console.error('Failed to save quiz:', error);
    }
  }
  return (
    <ThemedView>
      <Formik
        initialValues={{
          title: '',
          category: '',
          questions: [{
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
                    {values.questions.map((question, questionIndex) => (
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
                              {question.options.map((option, optionIndex) => (
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
                <ThemedText>Submit</ThemedText>
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