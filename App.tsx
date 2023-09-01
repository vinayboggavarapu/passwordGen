import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

//Form Validation

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number(),
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
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Password Generator</Text>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={PasswordSchema}
          onSubmit={values => {
            console.log(values);
            generatePasswordString({
              passwordLength: Number(values.passwordLength),
            });
          }}>
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleReset,
            handleSubmit,
            // isSubmitting,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <Text style={styles.passwordLabel}>Password Length</Text>
                  <TextInput
                    style={styles.input}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Password Length"
                  />
                  {touched.passwordLength && errors.passwordLength && (
                    <Text>{errors.passwordLength}</Text>
                  )}
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkBoxText}>Include lowercase</Text>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkBoxText}>Include uppercase</Text>
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor="green"
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkBoxText}>Include numbers</Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setNumber(!numbers)}
                    fillColor="violet"
                  />
                </View>
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkBoxText}>
                    Include special characters
                  </Text>
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={() => setSymbols(!symbols)}
                    fillColor="purple"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.button}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.reset]}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
        {isPasswordGenerated && (
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Generated Password:</Text>
            <Text>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedText}>
              {password}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  heading: {
    fontSize: 25,
    color: 'black',
    fontWeight: '400',
    marginBottom: 40,
    textAlign: 'center',
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'space-between',
    width: '80%',
  },
  checkBoxText: {
    fontSize: 17,
    width: '60%',
  },
  inputContainer: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderWidth: 0.21,
    borderStyle: 'solid',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'black',
    padding: 25,
  },

  generatedText: {
    fontSize: 25,
    marginLeft: 15,
    marginTop: 15,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },

  button: {
    backgroundColor: '#4156f6',
    padding: 10,
    borderRadius: 15,
    width: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reset: {
    backgroundColor: 'black',
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },

  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },

  passwordLabel: {
    fontSize: 17,
    fontWeight: '400',
  },
});
