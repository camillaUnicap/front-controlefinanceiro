import React from 'react';
import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
    container: {
        backgroundColor: '#8926D8'
    },
    header: {
        color: 'white',
        fontSize: 30,
        marginRight: 15,
        marginLeft: 15,
        paddingTop: 60,
        paddingBottom: 30
    },
    form: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 25,
    },
    content: {
        marginRight: 15,
        marginLeft: 15,
    },
    title: {
        color: '#575757',
        fontSize: 24,
        paddingTop: 50
    },
    inputContainer: {
        paddingTop: 50
    },
    inputText: {
        color: '#575757',
        fontSize: 18,
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
    forgot: {
        color: '#575757',
        fontSize: 14,
        alignSelf: 'flex-end',
        paddingTop: 8,
        paddingBottom: 40
    },
    create: {
        color: '#575757',
        paddingTop: 30,
        alignSelf: 'center'
    },
    signUp: {
        color: '#8926D8',
    },
    or: {
        color: '#e0e0e0',
        fontSize: 25,
        padding: 25,
        alignSelf: 'center'
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },  
    icon: {
        paddingRight: 20,
        paddingLeft: 20,
        color: '#383838',
        fontSize: 50
    },
    blank: {
        padding: 33
    }
})