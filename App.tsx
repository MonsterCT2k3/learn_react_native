import { Alert, Button, FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

interface ITodo {
  id: number;
  name: string
}
export default function App() {
  const [todo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState<ITodo[]>([])

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const handleAddTodo = () => {
    if (!todo) {
      Alert.alert("Loi input todo", "Todo khong duoc de trong", [
        { text: "Ok con de", onPress: () => console.log('Ok Pressed') }
      ])
      return;
    }
    setListTodo([...listTodo,
    { id: randomInteger(2, 299999), name: todo }
    ]);
    setTodo("");
  }

  const deleteTodo = (id: number) => {
    const newTodo = listTodo.filter(item => item.id !== id);
    setListTodo(newTodo);
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* header */}
        <Text style={styles.header}>Todo APP</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.todoInput}
            onChangeText={(value) => setTodo(value)}
            value={todo}
          />
          <Button title='Add todo'
            onPress={handleAddTodo}
          />
        </View>

        <View style={styles.todo}>
          <FlatList
            data={listTodo}
            keyExtractor={item => item.id + ""}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                  onPress={() => deleteTodo(item.id)}>
                  <View style={styles.groupTodo}>
                    <Text style={styles.todoItem}>{item.name}</Text>
                    <AntDesign name="close" size={24} color="black" />
                  </View>
                </Pressable>
              )
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  groupTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: 15,
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 10,
  },
  header: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 40,
    // flex: 1
  },
  container: {
    paddingTop: 50,
    // paddingHorizontal:20,
    flex: 1,
    backgroundColor: '#fff',

  },

  form: {
    // flex: 2
    marginBottom: 20
  },
  todo: {
    flex: 1
  },
  todoInput: {
    borderBottomWidth: 1,
    borderBottomColor: "green",
    padding: 5,
    margin: 15
  },



  todoItem: {
    fontSize: 20,
    // marginBottom: 20,

  }
});
