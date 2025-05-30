import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import CustomTextInput from '../../../components/CustomTextInput';
import { useTranslation } from 'react-i18next';

export const EditProfileScreen = ({ navigation }: any) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const user = useSelector((state: RootState) => state.auth.user);

  // Form state
  const [name, setName] = useState(user?.name || 'Annie Melfisa');
  const [email, setEmail] = useState(user?.email || 'anniemelfisa23@gmail.com');
  const [phone, setPhone] = useState(user?.phone_number || '081227564283');
  const [password, setPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveChanges = () => {
    // Save changes logic would go here
    // After saving, navigate back
    navigation.goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Image
                source={images.icon_back_press_arrow}
                style={styles.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('edit_profile')}</Text>
            <View style={styles.placeholderView} />
          </View>

          {/* Profile Image */}
          <View style={styles.profileImageContainer}>
            <Image
              source={images.icon_profile_place_holder}
              style={styles.profileImage}
            />
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Name Field */}
            <CustomTextInput
              title={t('full_name')}
              placeholder={t('enter_full_name')}
              value={name}
              onChangeText={setName}
              containerStyle={styles.inputContainerStyle}
            />

            {/* Email Field */}
            <CustomTextInput
              title={t('email_address')}
              placeholder={t('enter_email')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              containerStyle={styles.inputContainerStyle}
            />

            {/* Phone Field */}
            <CustomTextInput
              title={t('phone_number')}
              placeholder={t('enter_phone')}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              containerStyle={styles.inputContainerStyle}
            />

            {/* Password Field */}
            <CustomTextInput
              title={t('password')}
              placeholder={t('enter_password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              showPassword={true}
              pressOnPassword={togglePasswordVisibility}
              containerStyle={styles.inputContainerStyle}
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>{t('save_changes')}</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  backButton: {

  },
  backIcon: {

  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  placeholderView: {
    width: 36, // Same width as backButton for alignment
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainerStyle: {
    marginBottom: 12,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 36,
  },
  saveButton: {
    backgroundColor: Color.primary,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: Color.white,
  },
}); 