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
import { useDispatch } from 'react-redux';
import { setAccessToken, setUser } from '../../../redux/slices/authSlice';
import { User } from '../../../interface/UserInterface';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTextInput from '../../../components/CustomTextInput';
import { useTranslation } from 'react-i18next';

export const StoreProfileScreen = ({ navigation, route }: any) => {
  const { userData, token } = route.params;
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  // Form state
  const [storeName, setStoreName] = useState('Barber Street');
  const [storeAddress, setStoreAddress] = useState('123 High Street');
  const [city, setCity] = useState('London');
  const [postcode, setPostcode] = useState('W1A 1AA');
  const [country, setCountry] = useState('United Kingdom');
  const [phoneNumber, setPhoneNumber] = useState('07123456789');
  const [website, setWebsite] = useState('www.barberst.co.uk');
  const [storeDescription, setStoreDescription] = useState('A luxury salon specializing in haircuts.');
  const [bookingFee, setBookingFee] = useState('30%');
  const [storeCategory, setStoreCategory] = useState('Barbershop');

  const goBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    // Save profile data to userData if needed
    const updatedUserData = {
      ...userData,
      store: {
        name: storeName,
        address: storeAddress,
        city: city,
        postcode: postcode,
        country: country,
        phoneNumber: phoneNumber,
        website: website,
        description: storeDescription,
        bookingFee: bookingFee,
        category: storeCategory
      }
    };

    // Navigate back to store details screen
    navigation.navigate('StoreDetails', { userData: updatedUserData, token });
  };

  const navigateToHours = () => {
    // Navigate to a screen for setting up working hours
    navigation.navigate('StoreHours', { userData, token });
  };

  const navigateToCategory = () => {
    // Navigate to a screen for selecting a category
    navigation.navigate('StoreCategory', { userData, token });
  };

  const navigateToBookingFee = () => {
    // Navigate to a screen for setting booking fee
    navigation.navigate('BookingFee', { userData, token });
  };

  const handleChoosePhoto = () => {
    // Implement photo selection logic
    // This could open an image picker
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top ,paddingBottom:insets.bottom}]}>
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
          <Text style={styles.title}>{t('setup_store_profile')}</Text>
          <Text style={styles.subtitle}>{t('add_store_details')}</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <CustomTextInput
            title={t('store_salon_name')}
            value={storeName}
            onChangeText={setStoreName}
            containerStyle={styles.inputContainer}
          />

          <CustomTextInput
            title={t('store_salon_address')}
            value={storeAddress}
            onChangeText={setStoreAddress}
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

          <CustomTextInput
            title={t('phone_number')}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            containerStyle={styles.inputContainer}
            keyboardType="phone-pad"
          />

          <CustomTextInput
            title={t('website_optional')}
            value={website}
            onChangeText={setWebsite}
            containerStyle={styles.inputContainer}
            keyboardType="url"
          />

          <CustomTextInput
            title={t('store_description')}
            value={storeDescription}
            onChangeText={setStoreDescription}
            containerStyle={styles.inputContainer}
            multiline={true}
            numberOfLines={3}
            textInputStyle={styles.multilineInput}
          />

          {/* Booking Fee */}
          <Text style={styles.sectionTitle}>{t('booking_fee')}<Text style={styles.requiredStar}>*</Text></Text>
          <TouchableOpacity style={styles.selectionItem} onPress={navigateToBookingFee}>
            <Text style={styles.selectionText}>{bookingFee}</Text>
            <Image
              source={images.icon_arrow_right_black}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Store Hours */}
          <Text style={styles.sectionTitle}>{t('store_hours')}</Text>
          <TouchableOpacity style={styles.selectionItem} onPress={navigateToHours}>
            <Text style={styles.selectionText}>{t('setup_working_hours')}</Text>
            <Image
              source={images.icon_arrow_right_black}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Store Category */}
          <Text style={styles.sectionTitle}>{t('store_category')}</Text>
          <TouchableOpacity style={styles.selectionItem} onPress={navigateToCategory}>
            <Text style={styles.selectionText}>{storeCategory}</Text>
            <Image
              source={images.icon_arrow_right_black}
              style={styles.arrowIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Add Store Images */}
          <Text style={styles.sectionTitle}>{t('add_store_images')}</Text>
          <TouchableOpacity style={styles.photoSelector} onPress={handleChoosePhoto}>
            <Text style={styles.photoText}>{t('choose_photo')}</Text>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>{t('continue')}</Text>
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
  formContainer: {
    marginTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  multilineInput: {
    
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: FontFamily.semi_bold,
    color: Color.black_text,
    marginBottom: 8,
    marginTop: 8,
  },
  requiredStar: {
    color: Color.red,
  },
  selectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.border,
    borderRadius: 52,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  selectionText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#AAAAAA',
  },
  photoSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.border,
    borderRadius: 52,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  photoText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Color.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  addButtonText: {
    fontSize: 16,
    color: Color.black,
    fontWeight: 'bold',
  },
  bottomContainer: {
    padding: 24,
    paddingHorizontal: 24,
  },
  continueButton: {
    backgroundColor: '#45594B', // Dark green color as shown in the image
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.bold,
    color: Color.white,
  },
}); 