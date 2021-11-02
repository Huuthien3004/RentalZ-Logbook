import React from 'react';
import { TextInput, StyleSheet } from 'react-native'

const Input = (props) => {
    return (
        <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        >
        </TextInput>
    );
}

const styles = StyleSheet.create({
    input: {
        width: '95%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 15
    },
});

export default Input;