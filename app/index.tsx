import React, { useState } from "react";
import {
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import Checkbox from "expo-checkbox";


type TodoType = {
  id: number;
  task: string;
  completed: boolean;
};

export default function Index() {

  const todoData = [
    { id: 1, task: "Buy groceries", completed: false },
    { id: 2, task: "Walk the dog", completed: true },
    { id: 3, task: "Read a book", completed: false },
  
  ];

  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleClear = () => {
    setText('');
  };

  const [isChecked, setChecked] = useState(false);
  
  return (
    <SafeAreaView style={styles.container} >

    <View style={styles.header} >
      <TouchableOpacity onPress={() => {alert('Clicked!')}} >  
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {alert('Profile Clicked!')}}>  
        <Ionicons name="person-circle-sharp" size={40} color="black" />
      </TouchableOpacity>

      {/* <Image 
        source={{uri: 'https://www.vectorstock.com/royalty-free-vector/male-profile-avatar-with-brown-hair-vector-120551052'}} 
        style={{width: 40, height: 40 , borderRadius:20}} 
      /> */}
        
    </View>

    <View style={{marginBottom:20}} >
      <Text style={{fontSize:32, fontWeight:'bold'}} >Hello, User!</Text>
      <Text style={{fontSize:18, color:'gray'}} >Here's your todo list for today.</Text>
    </View>

    <View style={styles.searchBar} >
      <Ionicons name="search" size={24} color="black" />
      <TextInput 
        placeholder="Search" 
        style={styles.searchInput} 
        onChangeText={setText} 
        value={text} 
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)} 
      />       
      <TouchableOpacity onPress={handleClear} style={{ padding: 10 }}>
          <Ionicons name="close-circle" size={20} color="gray" />
        </TouchableOpacity>
    </View>



    
    
   <FlatList 
      data={todoData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (<ToDoItem todo={item} />)}
    />

    <KeyboardAvoidingView style={styles.addTodoContainer} behavior="padding" keyboardVerticalOffset={20} >
      <TextInput placeholder="Add new todo" style={styles.textInput}/>
      <TouchableOpacity onPress={() => {alert('Add Clicked!')}} >  
        <Ionicons name="add-circle" size={50} color="green" />
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({ todo }: { todo: TodoType })  => (
  <View style={styles.todoItemStyle} >
      <View style={styles.checkboxContainer} >
        <Checkbox
          value={todo.completed}
          // onValueChange={() => setChecked(!isChecked)}
          color={todo.completed ? 'green' : undefined}
        />
        <Text 
          style={[styles.todoText, 
          todo.completed &&{textDecorationLine: "line-through"}]}>{todo.task}
        </Text>
      </View>   
        <TouchableOpacity onPress={() => {alert('Delete Clicked!')}} >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>    
  </View>
);

const styles = StyleSheet.create({
  container : {
    flex: 1,    
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    // backgroundColor: 'blue',
  },
  todoItemStyle: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  todoText: {
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flex: 1,
    padding: 20,
    fontSize: 16,
  },
  addTodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
})
