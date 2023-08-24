import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 }}>
      <TouchableOpacity onPress={() => onToggle(todo.id)}>
        <Text style={{ textDecorationLine: todo.completed ? 'line-through' : 'none' }}>{todo.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
