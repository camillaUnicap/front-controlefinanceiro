import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import landingStyles from '../../../public/stylesheets/landing';

const InputContainer = (props) => (
    <View style={styles.inputContainer}>
        <Text style={props.isBold ? landingStyles.inputText : styles.placeholder}>{props.name}</Text>
        <TextInput style={styles.input} onChangeText={props.onChangeText} />
    </View>
)

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
    }
});

export default InputContainer;
