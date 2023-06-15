import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';
import globalStyles from '../../../public/stylesheets/main';
import InputContainer from '../../components/InputContainer';

export default function Create() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const route = useRoute();
  const userId = route.params.userId;
  const transactionId = route.params; 
  console.log(transactionId)
  console.log(route)
  console.log(userId, '2')

  useEffect(() => {
    if (transactionId) {
      loadTransaction();
    }
  }, []);

  const loadTransaction = async () => {
    try {
      const response = await api.get(`/${userId}/transactions`);
      const transactions = response.data;
      console.log(transactions);
  
      const transaction = transactions.find((t) => t.id === transactionId);
      if (transaction) {
        setName(transaction.name);
        setValue(transaction.value.toString());
      } else {
        console.log(`Transaction with ID ${transactionId} not found`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const transaction = {
      name,
      value: parseFloat(value),
    };

    if (name.length === 0 || value.length === 0) {
      alert('Por favor insira todos os campos');
    } else {
      if (transactionId) {
        // Editar transação existente
        try {
          await api.put(`/${userId}/transactions/${transactionId}`, transaction);
          handleNavigateBack();
        } catch (error) {
          console.error(error);
        }
      } else {
        // Criar nova transação
        try {
          await api.post(`/${userId}/transactions`, transaction);
          handleNavigateBack();
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>
        {transactionId ? 'Editar item' : 'Adicionar um item'}
      </Text>

      <InputContainer name="Name" value={name} onChangeText={setName} />

      <View style={styles.inputContainer}>
        <Text style={styles.placeholder}>Valor</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />
      </View>

      <View style={styles.blank}></View>

      <RectButton style={globalStyles.button} onPress={handleSubmit}>
        <Text style={globalStyles.buttonText}>Confirmar</Text>
      </RectButton>
      <RectButton style={styles.cancelButton} onPress={handleNavigateBack}>
        <Text style={globalStyles.buttonText}>Cancelar</Text>
      </RectButton>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
  },
  placeholder: {
    color: '#616161',
    fontSize: 17,
    paddingBottom: 5,
  },
  input: {
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRadius: 5,
    padding: 10,
    height: 40,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#D3483F',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  blank: {
    paddingTop: 320,
  },
});
