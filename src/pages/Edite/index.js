import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native'

import api from '../../services/api';
import globalStyles from '../../../public/stylesheets/main';
import InputContainer from '../../components/InputContainer';

export default function Form() {

    const navigation = useNavigation();
    const route = useRoute();
    const { userId, transactionId } = route.params;

    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        fetchTransaction();
    }, []);

    const fetchTransaction = async () => {
        try {
            const response = await api.get(`/${userId}/transactions/${transactionId}`);
            console.log("w", response.data);
            const { name, value } = response.data;
            setName(name);
            setValue(value.toString());
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        const updatedTransaction = {
            name,
            value: parseFloat(value)
        };

        try {
            await api.put(`/${userId}/transactions/${transactionId}`, updatedTransaction);
            // navigation.navigate("Main", userId);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    const handleNavigateBack = () => {
        navigation.navigate("Main", userId);
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Editar uma item</Text>

            <InputContainer name="Name" onChangeText={setName} />

            <View style={styles.inputContainer}>
                <Text style={styles.placeholder}>Valor</Text>
                <TextInput style={styles.input} keyboardType='numeric' onChangeText={setValue} />
            </View>

            <View style={styles.blank}></View>

            <RectButton style={globalStyles.button} onPress={handleSubmit}>
                <Text style={globalStyles.buttonText}>Confirmar</Text>
            </RectButton>
            <RectButton style={styles.cancelButton} onPress={handleNavigateBack}>
                <Text style={globalStyles.buttonText}>Cancelar</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 30,
    },
    placeholder: {
        color: '#616161',
        fontSize: 17,
        paddingBottom: 5
    },
    input: {
        fontSize: 17,
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRadius: 5,
        padding: 10,
        height: 40
    },
    cancelButton: {
        marginTop: 20,
        backgroundColor: '#D3483F',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center'
    },
    blank: {
        paddingTop: 320
    }
});