import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';

//Form Validation

const PasswordSchema = Yup.object().shape({
  password: Yup.number(),
});
export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = ({
    passwordLength,
  }: {
    passwordLength: number;
  }) => {
    let passwordString = '';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const specialCharacters = '!@#$%^&*()_+';

    if (lowerCase) {
      passwordString += lowerCaseLetters;
    }
    if (upperCase) {
      passwordString += upperCaseLetters;
    }
    if (symbols) {
      passwordString += specialCharacters;
    }
    if (numbers) {
      passwordString += digits;
    }

    const createdPasswordString = createPassword(
      passwordString,
      passwordLength,
    );

    setPassword(createdPasswordString);
    setIsPasswordGenerated(true);
  };

  const createPassword = (passwordString: string, passwordLength: number) => {
    let password = '';
    for (let index = 0; index < passwordLength; index++) {
      const randomIndex = Math.round(Math.random() * passwordString.length);
      password += passwordString[randomIndex];
    }
    return password;
  };

  const resetPassword = () => {
    setPassword('');
    setLowerCase(true);
    setUpperCase(false);
    setNumber(false);
    setSymbols(false);
    setIsPasswordGenerated(false);
  };
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
