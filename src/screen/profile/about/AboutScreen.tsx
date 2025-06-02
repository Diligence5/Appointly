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
import { useTranslation } from 'react-i18next';

export const AboutScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const APP_VERSION = '1.0.0'; // This would come from your app config

  const menuItems = [
    {
      id: 'terms',
      title: t('terms_of_service'),
      onPress: () => Linking.openURL('https://example.com/terms'),
    },
    {
      id: 'privacy',
      title: t('privacy_policy'),
      onPress: () => Linking.openURL('https://example.com/privacy'),
    },
    {
      id: 'contact',
      title: t('contact_us'),
      onPress: () => Linking.openURL('mailto:support@appointly.com'),
    },
    {
      id: 'rate',
      title: t('rate_the_app'),
      onPress: () => Linking.openURL('https://example.com/rate'),
    },
  ];

  const goBack = () => {
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
          <Text style={styles.title}>{t('about')}</Text>
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <Image
            source={images.icon_profile_place_holder}
            style={styles.appLogo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Appointly</Text>
          <Text style={styles.appVersion}>Version {APP_VERSION}</Text>
          <Text style={styles.appDescription}>
            {t('app_description')}
          </Text>
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

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © {new Date().getFullYear()} Appointly. {t('all_rights_reserved')}
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
  },
  appInfoContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
  },
  appLogo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Color.black,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    marginBottom: 16,
  },
  appDescription: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.black,
    textAlign: 'center',
    lineHeight: 22,
  },
  menuContainer: {
    marginBottom: 32,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
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
  footerContainer: {
    marginTop: 'auto',
    marginBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    textAlign: 'center',
  },
}); 