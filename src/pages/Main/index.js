import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../services/api';
import globalStyles from '../../../public/stylesheets/main';
import TransactionItem from '../../components/TransactionItem';

export default function Main() {

    const navigation = useNavigation();

    const [user, setUser] = useState('');
    const [transactions, setTransactions] = useState([]);

    const route = useRoute();

    const userId = route.params.userId;

    useEffect(() => {
        navigation.addListener('focus', () => {
            loadData();
            loadTransactions();
        });
        loadData();
        loadTransactions();
    }, [])

    useEffect(() => {
        handleTransactions(transactions);
    }, [transactions])

    loadData = async () => {
        const response = await api.get(`/${userId}`);
        const user = response.data;

        setUser(user);
    }

    loadTransactions = async () => {
        const response = await api.get(`/${userId}/transactions`);
        const transactions = response.data;

        setTransactions(transactions);
    }

    handleNavigateToCreate = () => {
        navigation.navigate('Create', {
            userId
        });
    }

    handleNavigateToTransactions = () => {
        navigation.navigate('Transactions', {
            userId
        });
    }

    handleTransactions = (trc) => {
        if (trc.length == 0) {
            return (
                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>Bem - vindos!</Text>
                    <Text style={styles.messageText}>Você ainda não tem nenhum item na lista</Text>
                </View>
            )
        }
    }

    isPositive = (transaction) => {
        if (transaction.value >= 0) {
            return <Text style={globalStyles.positive}>R$ {transaction.value}</Text>
        } else {
            return <Text style={globalStyles.negative}>R$ {transaction.value}</Text>
        }
    }

    return (
        <View style={globalStyles.container}>
            <Text style={styles.title}>Valor total</Text>
            <Text style={styles.balance}>R$ {user.balance}</Text>
            <View style={styles.transactionHeader}>
                <Text style={styles.transactionHeaderTitle}>Lista de Gastos</Text>
                <RectButton style={styles.button} onPress={handleNavigateToTransactions}>
                    <Text style={styles.buttonText}>Mais</Text>
                </RectButton>
            </View>

            <View style={styles.transactionContainer}>
                {handleTransactions(transactions)}
                {transactions.slice(0, 5).map(transaction => {
                    return (
                        <TransactionItem
                            key={transaction.id}
                            id={transaction.id}
                            name={transaction.name}
                            value={isPositive(transaction)}
                            delete={transaction.id}
                            edit={transaction.id}
                            userId={userId}
                       />
                    )
                })}
            </View>

            <RectButton style={globalStyles.button} onPress={handleNavigateToCreate}>
                <Text style={globalStyles.buttonText}>Adicionar item</Text>
            </RectButton>
        </View>
    )

}

const styles = StyleSheet.create({
    title: {
        color: '#616161',
        marginTop: 20,
        paddingBottom: 10,
        fontSize: 20,
    },
    balance: {
        color: '#8926D8',
        fontSize: 45,
    },
    historicContainer: {
        height: 100,
        marginTop: 20,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0',
    },
    historicItem: {
        width: '50%',
        borderRightWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    historicTitle: {
        color: '#575757',
        fontSize: 15,
        marginTop: 15,
        paddingBottom: 10
    },
    revenueValue: {
        color: '#5ACC24',
        fontSize: 22
    },
    expensesValue: {
        color: '#D3483F',
        fontSize: 22
    },
    transactionContainer: {
        marginTop: 20,
        height: 320
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1.5,
        borderBottomColor: '#bfbfbf',
        marginTop: 20,
        paddingBottom: 7
    },
    transactionHeaderTitle: {
        color: '#616161',
        fontSize: 20,
        marginTop: 5
    },
    button: {
        backgroundColor: '#8926D8',
        paddingRight: 20,
        paddingLeft: 20,
        padding: 7,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
    },
    messageContainer: {
        alignItems: 'center'
    },
    messageText: {
        color: '#a6a6a6',
        fontSize: 15,
        marginTop: 15
    }
})