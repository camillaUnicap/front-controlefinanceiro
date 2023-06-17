import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import globalStyles from '../../../public/stylesheets/main';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const TransactionItem = (props) => {

  const navigation = useNavigation();
  const userId = props.userId;
  console.log(props);
  console.log(userId);

  const handleEditPress = async (transactionId) => {
    console.log(transactionId)
    navigation.navigate("Form", {transactionId, userId});
  };

  const handleDeletePress = (transactionId) => {
    console.log(transactionId);
    Alert.alert(
      "Atenção",
      "Você tem certeza que deseja excluir este item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            try {
             const result=  api.delete(`/${userId}/transaction/${transactionId}`);
             console.log(result);
              navigation.navigate("Main", userId);
            } catch (error) {
              console.error(error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={globalStyles.transactionItem} key={props.id}>
      <Text style={globalStyles.transactionText}>{props.name}</Text>
        <View style={styles.buttonsContainer}>
          {props.value}
          <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(props.id)}>
            <Icon name="edit" color="white" size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePress(props.id)}>
            <Icon name="trash-2" color="white" size={18} />
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingBottom: 10,
    marginTop: 10,
  },
  editButton: {
    marginRight: 10,
    height: 40,
    backgroundColor: '#04d361',
    borderRadius: 10,
    padding: 8,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: '#ccc',
    alignItems: 'center',
  },
  deleteButton: {
    marginRight: 10,
    height: 40,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 8,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: '#ccc',
    alignItems: 'center',
  },
});

export default TransactionItem;
