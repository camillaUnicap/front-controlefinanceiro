import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, RectButton } from 'react-native-gesture-handler';
import { Link, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import bcrypt from 'react-native-bcrypt';

import api from '../../services/api';
import landingStyles from '../../../public/stylesheets/landing';
import mainStyles from '../../../public/stylesheets/main';
import InputContainer from '../../components/InputContainer';

export default function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    handleSubmit = async () => {

        try {
            const response = await api.get(`/email?value=${email}`);
            const userId = response.data.id;

            bcrypt.compare(password, response.data.password, (err, res) => {
                if (res) {
                    navigation.navigate('Main', {
                        userId
                    });
                } else {
                    alert('Senha inválida');
                }
            })
        } catch (e) {
            alert('Usuário ou senha inválido');
        }
    }
    return (
        <View style={landingStyles.container}>
            <Text style={landingStyles.header}>Controle Financeiro</Text>
            <View style={landingStyles.form} >
                <View style={landingStyles.content}>
                    <Text style={landingStyles.title}>Login</Text>
                    <InputContainer name="E-mail" onChangeText={setEmail} isBold={true} />
                    <View style={landingStyles.inputContainer}>
                        <Text style={landingStyles.inputText}>Senha</Text>
                        <TextInput style={landingStyles.input} secureTextEntry={true} onChangeText={setPassword}></TextInput>
                    </View>
                    <Text style={landingStyles.forgot}>Esqueceu a senha?</Text>
                    <RectButton style={mainStyles.button} onPress={handleSubmit}>
                        <Text style={mainStyles.buttonText}>Entrar</Text>
                    </RectButton>
                    <Text style={landingStyles.create}>Não tem uma conta? <Link to='/Register' style={landingStyles.signUp}>Cadastrar</Link></Text>
                    <Text style={landingStyles.or}>OR</Text>
                    <View style={landingStyles.iconsContainer}>
                        <Icon style={landingStyles.icon} name="facebook-square"></Icon>
                        <Icon style={landingStyles.icon} name="google-plus-square"></Icon>
                        <Icon style={landingStyles.icon} name="twitter-square"></Icon>
                    </View>
                </View>
            </View>
        </View>
    )
}