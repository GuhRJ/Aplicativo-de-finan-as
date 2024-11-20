import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTransactions = async (transactions) => {
  try {
    await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
  } catch (error) {
    console.error(error);
  }
};

const loadTransactions = async () => {
  try {
    const storedTransactions = await AsyncStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadTransactions();
}, [loadTransactions]);

const addTransaction = () => {
  const newTransactions = [...transactions, { id: Date.now().toString(), description, amount }];
  setTransactions(newTransactions);
  saveTransactions(newTransactions);
};

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const addTransaction = () => {
    if (description && amount && category) {
      setTransactions([
        ...transactions,
        { id: Date.now().toString(), description, amount, category },
      ]);
      setDescription('');
      setAmount('');
      setCategory('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transações</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text>{item.description} - {item.category}</Text>
            <Text>R$ {item.amount}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
        <Picker.Item label="Alimentação" value="Alimentação" />
        <Picker.Item label="Transporte" value="Transporte" />
        <Picker.Item label="Entretenimento" value="Entretenimento" />
        <Picker.Item label="Outros" value="Outros" />
      </Picker>
      <Button title="Adicionar Transação" onPress={addTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  transaction: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
