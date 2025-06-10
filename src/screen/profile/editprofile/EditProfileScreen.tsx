import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/authSlice';
import CustomTextInput from '../../../components/CustomTextInput';
import { useTranslation } from 'react-i18next';

export const EditProfileScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state: any) => state.auth.user);

  // Form state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone_number || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [postcode, setPostcode] = useState(user?.postcode || '');
  const [country, setCountry] = useState(user?.country || '');

  const goBack = () => {
    navigation.goBack();
  };

  const handleChoosePhoto = () => {
    // Implement photo selection logic
    // This could open an image picker
  };

  const handleSave = () => {
    // Update user data
    const updatedUser = {
      ...user,
      name,
      email,
      phone_number: phone,
      address,
      city,
      postcode,
      country,
    };

    // Dispatch action to update user in Redux store
    dispatch(setUser(updatedUser));

    // Navigate back
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Image
            source={images.icon_back_press_arrow}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{t('edit_profile')}</Text>
          <Text style={styles.subtitle}>{t('update_your_information')}</Text>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{name.charAt(0) || 'U'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.changePhotoButton} onPress={handleChoosePhoto}>
            <Text style={styles.changePhotoText}>{t('change_photo')}</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <CustomTextInput
            title={t('full_name')}
            value={name}
            onChangeText={setName}
            containerStyle={styles.inputContainer}
          />

          <CustomTextInput
            title={t('email_address')}
            value={email}
            onChangeText={setEmail}
            containerStyle={styles.inputContainer}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextInput
            title={t('phone_number')}
            value={phone}
            onChangeText={setPhone}
            containerStyle={styles.inputContainer}
            keyboardType="phone-pad"
          />

          <CustomTextInput
            title={t('address')}
            value={address}
            onChangeText={setAddress}
            containerStyle={styles.inputContainer}
          />

          <CustomTextInput
            title={t('city')}
            value={city}
            onChangeText={setCity}
            containerStyle={styles.inputContainer}
          />

          <CustomTextInput
            title={t('postcode')}
            value={postcode}
            onChangeText={setPostcode}
            containerStyle={styles.inputContainer}
          />

          <CustomTextInput
            title={t('country')}
            value={country}
            onChangeText={setCountry}
            containerStyle={styles.inputContainer}
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>{t('save_changes')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Color.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontFamily: FontFamily.bold,
    color: Color.white,
  },
  changePhotoButton: {
    padding: 8,
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.primary,
  },
  formContainer: {
    marginTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  bottomContainer: {
    padding: 24,
    paddingHorizontal: 24,
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