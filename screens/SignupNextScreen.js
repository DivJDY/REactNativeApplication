/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextComponent from '../components/TextComponent';
import TextInputComponent from '../components/TextInputComponent';
import {styles} from '../styles/formStyles';
import {Text, Checkbox} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ButtonComponent from '../components/ButtonComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from 'react-native-dropdown-select-list';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Enter your name'),
  // selected: Yup.string().required('Please select the work'),
  // figma: Yup.string().required('Please select the work'),
});

function SignupNextScreen({navigation}) {
  const [checked, setChecked] = useState(true);
  const [selected, setSelected] = useState('');
  const [figma, setFigma] = useState('');
  const [show, setShow] = useState(false);

  const data = [
    {key: '1', value: 'Design'},
    {key: '2', value: 'Student or educator'},
    {key: '3', value: 'User research'},
    {key: '4', value: 'Product management'},
    {key: '5', value: 'Marketting'},
  ];

  const data2 = [
    {key: '1', value: 'For personal use'},
    {key: '2', value: 'For teaching or taking a class'},
    {key: '3', value: 'For Work'},
  ];
  const userLogin = async values => {
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    Alert.alert(JSON.stringify(values));
    const value = {work: selected, primarily: figma};
    Alert.alert(JSON.stringify(value));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {marginTop: 50, marginBottom: 10}]}>
        Tell us about yourself
      </Text>
      <Formik
        initialValues={{
          name: '',
          selected: selected,
          figma: figma,
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          userLogin(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView style={{marginBottom: 15}}>
              <View style={styles.formContainer}>
                <TextInputComponent
                  placeholder={'Your name'}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
                />
                {errors.name && touched.name && (
                  <TextComponent text={errors.name} style={styles.error} />
                )}

                <SelectList
                  onSelect={() => {
                    setShow(!show);
                  }}
                  placeholder="What kind of work do you do? *"
                  setSelected={val => setSelected(val)}
                  data={data}
                  save="value"
                  arrowicon={
                    <FontAwesome
                      name="chevron-down"
                      size={14}
                      color={'black'}
                    />
                  }
                  boxStyles={{
                    borderRadius: 3,
                    borderWidth: 2,
                    borderColor: 'black',
                    width: 280,
                    marginBottom: 20,
                  }}
                  dropdownStyles={{
                    width: 280,
                  }}
                  inputStyles={{fontSize: 15}}
                  dropdownTextStyles={{fontSize: 14, fontWeight: '500'}}
                />

                {show ? (
                  <SelectList
                    placeholder="How will you primarily use Figma?"
                    setSelected={val => setFigma(val)}
                    data={data2}
                    save="value"
                    arrowicon={
                      <FontAwesome
                        name="chevron-down"
                        size={14}
                        color={'black'}
                      />
                    }
                    boxStyles={{
                      borderRadius: 3,
                      borderWidth: 2,
                      borderColor: 'black',
                      width: 280,
                      marginBottom: 20,
                    }}
                    dropdownStyles={{
                      width: 280,
                    }}
                    inputStyles={{fontSize: 15}}
                    dropdownTextStyles={{fontSize: 14, fontWeight: '500'}}
                  />
                ) : null}

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    color="blue"
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(!checked);
                    }}
                  />
                  <TextComponent
                    text="I agree to join Figma's mailing list"
                    style={{textAlign: 'center', fontWeight: 'bold'}}
                  />
                </View>
                <ButtonComponent name="Create account" onPress={handleSubmit} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
}

export default SignupNextScreen;
