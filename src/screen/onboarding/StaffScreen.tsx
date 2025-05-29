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
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput';

export const StaffScreen = ({ navigation, route }: any) => {
  const { userData, token } = route.params;
  const insets = useSafeAreaInsets();
  
  // Form state
  const [fullName, setFullName] = useState('Anthony Philips');
  const [role, setRole] = useState('Senior Stylist');
  const [consultationFee, setConsultationFee] = useState('£20.00');
  
  const goBack = () => {
    navigation.goBack();
  };

  const navigateToAvailability = () => {
    // Navigate to availability/working hours screen
    navigation.navigate('StaffAvailability', { userData, token });
  };

  const handleChoosePhoto = () => {
    // Implement photo selection logic
    // This could open an image picker
  };

  const handleSave = () => {
    // Save staff member data
    const staffMember = {
      fullName,
      role,
      consultationFee,
      // Other data would be added here
    };
    
    const updatedUserData = {
      ...userData,
      staff: userData.staff ? [...userData.staff, staffMember] : [staffMember]
    };
    
    // Navigate back to store details screen
    navigation.navigate('StoreDetails', { userData: updatedUserData, token });
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
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
          <Text style={styles.title}>Add Staff Members</Text>
          <Text style={styles.subtitle}>Add Team Profiles</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Full Name */}
          <CustomTextInput
            title="Full Name"
            value={fullName}
            onChangeText={setFullName}
            containerStyle={styles.inputContainer}
          />
          
          {/* Role/Title */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Role/Title (e.g., Senior Stylist, Junior Barber)</Text>
            <CustomTextInput
              value={role}
              onChangeText={setRole}
              containerStyle={styles.roleInputContainer}
              textInputStyle={styles.roleInput}
            />
          </View>
          
          {/* Availability */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Availability</Text>
            <TouchableOpacity style={styles.selectionItem} onPress={navigateToAvailability}>
              <Text style={styles.selectionText}>Setup working hours/days</Text>
              <Image
                source={images.icon_arrow_right_black}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          
          {/* Profile Picture */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Profile Picture</Text>
            <TouchableOpacity style={styles.photoSelector} onPress={handleChoosePhoto}>
              <Text style={styles.photoText}>Choose a photo</Text>
              <View style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          {/* Consultation Fee */}
          <CustomTextInput
            title="Consultation Fee"
            value={consultationFee}
            onChangeText={setConsultationFee}
            containerStyle={styles.inputContainer}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
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
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: FontFamily.semi_bold,
    color: Color.black_text,
    marginBottom: 8,
  },
  roleInputContainer: {
    marginTop: 0,
  },
  roleInput: {
    borderWidth: 0,
  },
  selectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
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