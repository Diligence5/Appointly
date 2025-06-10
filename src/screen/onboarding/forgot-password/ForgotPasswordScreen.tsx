import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import { strings } from '../../../constants/strings';
import { useTranslation } from 'react-i18next';

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError(t('email_required'));
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError(t('enter_valid_email'));
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const handleSubmit = () => {
    const isEmailValid = validateEmail(email);
    
    if (isEmailValid) {
      // Here you would normally call your password reset API
      setIsSubmitted(true);
    }
  };
  
  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('forgot_password')}</Text>
            <Text style={styles.subtitle}>
              {isSubmitted 
                ? t('password_reset_sent') 
                : t('enter_email_for_reset')}
            </Text>
          </View>
          
          {!isSubmitted ? (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{t('email')}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t('enter_your_email')}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => validateEmail(email)}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>
              
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>{t('send_reset_link')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                {t('check_email_instructions')}
              </Text>
            </View>
          )}
          
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={styles.backToLoginText}>{t('back_to_login')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: FontFamily.bold,
    color: Color.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Color.black,
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: FontFamily.regular,
  },
  errorText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: 'red',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: Color.primary,
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: Color.white,
  },
  successContainer: {
    padding: 20,
    marginVertical: 30,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  successText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  backToLoginText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.primary,
  },
}); 