import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Icon,
  TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {TextInput} from 'react-native-paper';
import {setTextRange} from 'typescript';

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isEmail, setIsEmail] = useState(false);

  return (
    <>
      <StatusBar translucent barStyle="light-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text>Register YourSelf</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            label="Email"
            value={email}
            mode="outlined"
            placeholder="john@example.com"
            onChangeText={email => setEmail(email)}
            selectionColor="#3944F7"
            style={styles.inputStyle}
            keyboardType="email-address"
            onSubmitEditing={() => {
              email !== '' ? setIsEmail(true) : setIsEmail(false);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              email !== '' ? setIsEmail(true) : setIsEmail(false);
            }}>
            <Icon name="thumbs-up" color="#000" size={14} />
          </TouchableOpacity>
        </View>
        {isEmail ? (
          <View style={styles.passwordContainer}>
            <TextInput
              label="Password"
              mode="outlined"
              style={styles.inputStyle}
              autoCorrect={false}
              secureTextEntry={!isVisible}
              placeholder="Password"
              value={password}
              onChangeText={password => setPassword(password)}
              enablesReturnKeyAutomatically={true}
            />
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
              <Icon
                name={isVisible ? 'fa-eye' : 'eye-slash'}
                color="#000"
                size={14}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <Button
          title={isEmail ? 'Next' : 'Submit'}
          style={styles.viewResultsButton}
          onPress={() => console.log('Submit Button')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
  },
  viewResultsButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
});

export default SignupScreen;
