import React, {useState, useEffect, useRef} from 'react';
import {View, Button, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Home() {
  // use navigation Hook to get the navigation object
  const navigation = useNavigation();
  // use state Hook to define state for component
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  //use ref Hook to get reference of Email & Name Input
  const emailInput = useRef(null);
  const nameInput = useRef(null);

  // use effect Hook to get into the Lifecycle-Methods componentDidMount and componentDidUpdate
  useEffect(() => {
    console.log('Home Screen mounted or updated');
  });

  const login = () => {
    if (!name) {
      setErrorMessage('Please provide at least a Username.')
      return
    }
    navigation.navigate('Profile', {name: name, email: email})
  }

  const jumpIntoNextInput = () => {
    emailInput && emailInput.current.focus()
  }
  
  const onNameFocus = () => {
    !!errorMessage && setErrorMessage(null)
  }

  return (
    <KeyboardAvoidingView 
      behavior='padding'
      enabled
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        style={{width: '80%', height: 30, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
        keyboardType='default'
        textContentType='name'
        onChangeText={name => setName(name)}
        value={name}
        placeholder='Enter your name'
        onSubmitEditing={jumpIntoNextInput}
        ref={nameInput}
        onFocus={() => onNameFocus()}
      />
      <TextInput
        style={{width: '80%', height: 30, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
        keyboardType='email-address'
        textContentType='emailAddress'
        onChangeText={email => setEmail(email)}
        value={email}
        placeholder='Enter your Email address'
        ref={emailInput}
        onSubmitEditing={login}
      />
      {!!errorMessage && !name && (
        <Text style={{color: 'red', marginBottom: 10}}>{errorMessage}</Text>
      )}
      <View style={{width: '80%', borderWidth: 1, borderColor: '#000000'}}>
        <Button
          title="Login"
          onPress={login}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
