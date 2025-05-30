import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AboutScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  const appVersion = '2.3.1';

  const goBack = () => {
    navigation.goBack();
  };

  const openTermsAndConditions = () => {
    // Open terms and conditions URL
    Linking.openURL('https://appointly.com/terms');
  };

  const openPrivacyPolicy = () => {
    // Open privacy policy URL
    Linking.openURL('https://appointly.com/privacy');
  };

  const openWebsite = () => {
    // Open website URL
    Linking.openURL('https://appointly.com');
  };

  const contactSupport = () => {
    // Open email client with support email
    Linking.openURL('mailto:support@appointly.com');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
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
          <Text style={styles.headerTitle}>About</Text>
          <View style={styles.placeholderView} />
        </View>

        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={images.icon_profile_place_holder} // Replace with actual app logo
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Appointly</Text>
          <Text style={styles.versionText}>Version {appVersion}</Text>
        </View>

        {/* App Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Appointly is a comprehensive appointment booking platform for businesses and service providers.
            Manage your schedule, services, and clients all in one place.
          </Text>
        </View>

        {/* Links Section */}
        <View style={styles.linksContainer}>
          <TouchableOpacity style={styles.linkItem} onPress={openWebsite}>
            <View style={styles.linkIconContainer}>
              <Image
                source={images.icon_info_circle_black}
                style={styles.linkIcon}
              />
            </View>
            <Text style={styles.linkText}>Visit our website</Text>
            <Image
              source={images.icon_arrow_right_black}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem} onPress={contactSupport}>
            <View style={styles.linkIconContainer}>
              <Image
                source={images.icon_info_circle_black}
                style={styles.linkIcon}
              />
            </View>
            <Text style={styles.linkText}>Contact support</Text>
            <Image
              source={images.icon_arrow_right_black}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem} onPress={openTermsAndConditions}>
            <View style={styles.linkIconContainer}>
              <Image
                source={images.icon_info_circle_black}
                style={styles.linkIcon}
              />
            </View>
            <Text style={styles.linkText}>Terms and Conditions</Text>
            <Image
              source={images.icon_arrow_right_black}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkItem} onPress={openPrivacyPolicy}>
            <View style={styles.linkIconContainer}>
              <Image
                source={images.icon_info_circle_black}
                style={styles.linkIcon}
              />
            </View>
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Image
              source={images.icon_arrow_right_black}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Credits */}
        <View style={styles.creditsContainer}>
          <Text style={styles.copyrightsText}>
            © {new Date().getFullYear()} Appointly. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  logoContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Color.black,
    marginBottom: 8,
  },
  versionText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  descriptionContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  descriptionText: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Color.black,
    lineHeight: 24,
    textAlign: 'center',
  },
  linksContainer: {
    paddingHorizontal: 20,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
  },
  linkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkIcon: {
    width: 24,
    height: 24,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  creditsContainer: {
    marginTop: 40,
    marginBottom: 24,
    alignItems: 'center',
  },
  copyrightsText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
}); 