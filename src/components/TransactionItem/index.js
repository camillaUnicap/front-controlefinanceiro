import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import globalStyles from '../../../public/stylesheets/main';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TransactionItem = (props) => {
  const navigation = useNavigation();
  const userId = props.userId;
  console.log(userId);
  const handleEditPress = async (transactionId) => {
    console.log(transactionId)
    navigation.navigate("Create", transactionId, userId);
  };

  const handleDeletePress = (transactionId) => {
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
              axios.delete(`/${userId}/transactions/${transactionId}`);
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
      {props.value}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePress(props.id)}>
            <Icon name="trash" color="white" size={18} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(props.id)}>
            <Icon name="edit" color="white" size={18} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    paddingBottom: 10,
    marginTop: 10,
  },
  editButton: {
    marginLeft: 40,
    height: 40,
    backgroundColor: '#04d361',
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: '#ccc',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 40,
    height: 40,
    width: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    fontSize: 12,
    elevation: 10,
    shadowOpacity: 10,
    shadowColor: '#ccc',
    alignItems: 'center',
  },
});

export default TransactionItem;
