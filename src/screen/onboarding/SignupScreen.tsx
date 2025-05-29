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
  Image,
  Alert,
} from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import { strings } from '../../constants/strings';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../redux/slices/authSlice';
import { User } from '../../interface/UserInterface';

export const SignupScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  const validateName = (name: string) => {
    if (!name) {
      setNameError('Name is required');
      return false;
    }
    setNameError('');
    return true;
  };
  
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError('Phone number is required');
      return false;
    }
    setPhoneError('');
    return true;
  };
  
  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const handleSignup = () => {
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);
    
    if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
      setIsLoading(true);
      
      // In a real app, you would make an API call here
      // For this demo, we'll simulate a successful registration
      setTimeout(() => {
        // Create a user object from the form data
        const newUser: User = {
          id: Math.random().toString(36).substring(2),
          name: name,
          email: email,
          phone_number: phone,
        };
        
        // Generate a mock token
        const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        
        // Dispatch actions to update Redux state
        dispatch(setUser(newUser));
        dispatch(setAccessToken(mockToken));
        
        setIsLoading(false);
        
        // Navigate to the main app
        navigation.replace('MainApp');
      }, 1500); // Simulate network delay
    }
  };
  
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  
  const goBack = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image
              source={images.icon_back_press_arrow}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create New Account</Text>
            <Text style={styles.subtitle}>Please create account first before enjoy the features.</Text>
          </View>
          
          <View style={styles.form}>
            {/* Name Input */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={images.icon_person_black}
                style={styles.inputIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                onBlur={() => validateName(name)}
              />
            </View>
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            
            {/* Email Input */}
            <Text style={[styles.label, { marginTop: 20 }]}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={images.icon_email_black}
                style={styles.inputIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onBlur={() => validateEmail(email)}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            
            {/* Phone Input */}
            <Text style={[styles.label, { marginTop: 20 }]}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={images.icon_person_black}
                style={styles.inputIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                onBlur={() => validatePhone(phone)}
              />
            </View>
            {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
            
            {/* Password Input */}
            <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={images.icon_lock_black}
                style={styles.inputIcon}
                resizeMode="contain"
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
                onBlur={() => validatePassword(password)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Image
                  source={passwordVisible ? images.icon_eye_open_black : images.icon_eye_close_black}
                  style={styles.eyeIconImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            
            {/* Signup Button */}
            <TouchableOpacity 
              onPress={handleSignup} 
              style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
              disabled={isLoading}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
            
            {/* Social Signup Section */}
            <View style={styles.socialLoginContainer}>
              <Text style={styles.orText}>Or login using</Text>
              
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={images.icon_google_logo}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialButtonText}>Sign Up using Google</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <Image
                  source={images.icon_facebook_logo}
                  style={styles.socialIcon}
                  resizeMode="contain"
                />
                <Text style={styles.socialButtonText}>Sign Up using Facebook</Text>
              </TouchableOpacity>
            </View>
            
            {/* Login instead */}
            <View style={styles.loginInsteadContainer}>
              <Text style={styles.loginInsteadText}>Already have an account?</Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.loginLinkText}>Login</Text>
              </TouchableOpacity>
            </View>
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
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  backIcon: {
  
  },
  headerContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Color.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.black,
    marginBottom: 8,
  },
  inputWrapper: {
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.black,
  },
  eyeIcon: {
    padding: 8,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
  },
  errorText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: 'red',
    marginTop: 5,
  },
  signupButton: {
    backgroundColor: Color.primary,
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  signupButtonDisabled: {
    backgroundColor: Color.primary + '80', // Add transparency to indicate disabled state
  },
  signupButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: Color.white,
  },
  socialLoginContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  orText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 56,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  loginInsteadContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  loginInsteadText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    marginRight: 4,
  },
  loginLinkText: {
    fontSize: 14,
    fontFamily: FontFamily.bold,
    color: Color.primary,
  },
}); 