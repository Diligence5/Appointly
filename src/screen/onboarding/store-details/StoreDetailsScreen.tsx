import React from 'react';
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

export const StoreDetailsScreen = ({ navigation, route }: any) => {
  const { userData, token } = route.params || {};
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const menuItems = [
    {
      id: 'store_profile',
      title: 'Store Profile',
      onPress: () => navigation.navigate('StoreProfile', { userData, token }),
    },
    {
      id: 'staff',
      title: 'Staff',
      onPress: () => navigation.navigate('Staff', { userData, token }),
    },
    {
      id: 'services',
      title: 'Services',
      onPress: () => navigation.navigate('Services', { userData, token }),
    },
    {
      id: 'bank_details',
      title: 'Bank Details',
      onPress: () => navigation.navigate('BankDetails', { userData, token }),
    },
  ];

  const handleContinue = () => {
    // If we're in the authenticated flow, just go back
    if (!token) {
      navigation.goBack();
      return;
    }
    
    // Otherwise, set user as authenticated and navigate to main app
    if (userData && token) {
      dispatch(setUser(userData as User));
      dispatch(setAccessToken(token));
    }
    navigation.replace('MainApp');
  };

  const goBack = () => {
    navigation.goBack();
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
          <Text style={styles.title}>Store Details</Text>
          <Text style={styles.subtitle}>Setup your store details, services, staff</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Image
                source={images.icon_arrow_right_black}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 100,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: '#AAAAAA',
  },
  bottomContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  continueButton: {
    backgroundColor: '#A3AFA7', // Gray-green color as shown in the image
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