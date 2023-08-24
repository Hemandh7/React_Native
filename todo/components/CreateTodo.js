import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const CreateTodo = ({ onCreate }) => {
  const [title, setTitle] = useState('');

  const handleCreate = () => {
    if (title.trim() !== '') {
      onCreate(title);
      setTitle('');
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
      <TextInput
        placeholder="Enter ToDo title"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 8 }}
      />
      <Button title="Add ToDo" onPress={handleCreate} />
    </View>
  );
};

export default CreateTodo;
