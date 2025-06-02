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
import { Color, FontSizes } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import { strings } from '../../../constants/strings';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../../redux/slices/authSlice';
import { User } from '../../../interface/UserInterface';
import { useTranslation } from 'react-i18next';

export const LoginScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();

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

    const validatePassword = (password: string) => {
        if (!password) {
            setPasswordError(t('please_enter_password'));
            return false;
        } else if (password.length < 6) {
            setPasswordError(t('password_must_be_at_least_6_characters'));
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleLogin = () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            setIsLoading(true);

            // In a real app, you would make an API call here
            // For this demo, we'll simulate a successful login
            setTimeout(() => {
                // Create a mock user object based on input
                const mockUser: User = {
                    id: '1',
                    name: email.split('@')[0], // Just use part of email as name for demo
                    email: email,
                    phone_number: '',
                };

                // Generate a mock token
                const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2);

                setIsLoading(false);

                // Navigate to the premium plan screen instead of setting auth directly
                navigation.navigate('PremiumPlan', {
                    userData: mockUser,
                    token: mockToken
                });
            }, 1500); // Simulate network delay
        }
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
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
                        <Text style={styles.title}>{t('login_to_your_account')}</Text>
                        <Text style={styles.subtitle}>{t('please_log_in_to_access_your_account')}</Text>
                    </View>

                    <View style={styles.form}>
                        {/* Email/Phone Input */}
                        <Text style={styles.label}>{t('email_address_or_phone_number')}</Text>
                        <View style={styles.inputWrapper}>
                            <Image
                                source={images.icon_email_black}
                                style={styles.inputIcon}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={t('enter_your_email_or_phone_number')}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                onBlur={() => validateEmail(email)}
                            />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        {/* Password Input */}
                        <Text style={[styles.label, { marginTop: 20 }]}>{t('password')}</Text>
                        <View style={styles.inputWrapper}>
                            <Image
                                source={images.icon_lock_black}
                                style={styles.inputIcon}
                                resizeMode="contain"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={t('enter_password')}
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

                        {/* Forgot Password */}
                        <TouchableOpacity
                            onPress={handleForgotPassword}
                            style={styles.forgotPasswordContainer}
                        >
                            <Text style={styles.forgotPasswordText}>{t('forgot_password')}?</Text>
                        </TouchableOpacity>

                        {/* Login Button */}
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                            disabled={isLoading}
                        >
                            <Text style={styles.loginButtonText}>
                                {isLoading ? t('logging_in') : t('login')}
                            </Text>
                        </TouchableOpacity>

                        {/* Social Login Section */}
                        <View style={styles.socialLoginContainer}>
                            <Text style={styles.orText}>{t('or_login_using')}</Text>

                            <TouchableOpacity style={styles.socialButton}>
                                <Image
                                    source={images.icon_google_logo}
                                    style={styles.socialIcon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.socialButtonText}>{t('login_using_google')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButton}>
                                <Image
                                    source={images.icon_facebook_logo}
                                    style={styles.socialIcon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.socialButtonText}>{t('login_using_facebook')}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Signup link */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>{t('dont_have_an_account')}</Text>
                            <TouchableOpacity onPress={handleSignup}>
                                <Text style={styles.signupLinkText}>{t('create_account')}</Text>
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
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginBottom: 24,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    loginButton: {
        backgroundColor: Color.primary,
        height: 56,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    loginButtonDisabled: {
        backgroundColor: Color.primary + '80', // Add transparency to indicate disabled state
    },
    loginButtonText: {
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
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    signupText: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        marginRight: 4,
    },
    signupLinkText: {
        fontSize: 14,
        fontFamily: FontFamily.bold,
        color: Color.primary,
    },

}); 