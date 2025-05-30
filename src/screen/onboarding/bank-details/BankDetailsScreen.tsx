import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BankDetailsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
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
        <Text style={styles.title}>Bank Details</Text>
        <Text style={styles.subtitle}>Add your banking information for payments</Text>
      </View>

      {/* Placeholder Content */}
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Bank Details Screen</Text>
        <Text style={styles.placeholderSubtext}>This screen will allow you to add banking information</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
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
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontFamily: FontFamily.bold,
    color: Color.black,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    textAlign: 'center',
  },
}); 