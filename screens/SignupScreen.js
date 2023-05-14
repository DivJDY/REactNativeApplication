/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import {styles} from '../styles/formStyles';
import {Button, Text} from 'react-native-paper';
import TextComponent from '../components/TextComponent';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignupSchema = Yup.object().shape({
  password: Yup.string().min(6).required('Please provide your password'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please provide your email'),
});

const SignupScreen = ({navigation}) => {
  const figma_url = 'https://www.figma.com/summary-of-policy/';
  const privacy_url = 'https://www.figma.com/privacy/';
  const handlePress = () => {
    Linking.openURL('https://accounts.google.com/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Want to check out this file? Log in or Sign up
      </Text>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{marginBottom: 15}}>
          <Button
            icon={({size, color}) => (
              <Icon name="google" size={size} color={color} />
            )}
            mode="outlined"
            contentStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={styles.outlinedBtn}
            onPress={handlePress}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              Continue with Google
            </Text>
          </Button>

          <Text style={{textAlign: 'center', marginVertical: 5}}>or</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              navigation.navigate('SignupNext');
              console.warn(values);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                <TextInputComponent
                  placeholder={'Email'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                />
                {errors.email && touched.email && (
                  <TextComponent text={errors.email} style={styles.error} />
                )}

                <TextInputComponent
                  placeholder={'Password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={true}
                  value={values.password}
                  style={styles.input}
                />
                {errors.password && touched.password && (
                  <TextComponent text={errors.password} style={styles.error} />
                )}

                <ButtonComponent name="Create account" onPress={handleSubmit} />
              </View>
            )}
          </Formik>
          <View style={styles.paraContainer}>
            <Text style={styles.text}>
              By clicking "Create account" or "Continous with Google". you agree
              to{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(figma_url)}>
                Figma TOS {''}
              </Text>
              and{' '}
              <Text
                style={{color: 'blue'}}
                onPress={() => Linking.openURL(privacy_url)}>
                Privacy Policy.
              </Text>
            </Text>
          </View>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: 'blue',
              fontWeight: 'bold',
              marginVertical: 15,
            }}
            onPress={() => Alert.alert('Single Sign-On')}>
            Use single sign-on
          </Text>

          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              marginBottom: 10,
              fontSize: 15,
              color: 'gray',
            }}>
            Already have an account?{' '}
            <Text
              style={{color: 'blue', fontWeight: '600'}}
              onPress={() => navigation.navigate('SignupNext')}>
              {' '}
              Log in
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;
