import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

// Define service interface
interface Service {
  id: string;
  name: string;
  isSelected: boolean;
}

export const ServicesScreen = ({ navigation, route }: any) => {
  const { userData, token } = route.params;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  
  // Initial services list
  const [services, setServices] = useState<Service[]>([
    { id: '1', name: t('haircut'), isSelected: true },
    { id: '2', name: t('beard_trim'), isSelected: true },
    { id: '3', name: t('hair_colouring'), isSelected: true },
    { id: '4', name: t('highlights_balayage'), isSelected: true },
    { id: '5', name: t('hair_wash_blow_dry'), isSelected: true },
    { id: '6', name: t('styling'), isSelected: true },
    { id: '7', name: t('kids_haircut'), isSelected: true },
    { id: '8', name: t('head_shave'), isSelected: true },
    { id: '9', name: t('scalp_treatment'), isSelected: true },
    { id: '10', name: t('extensions'), isSelected: true },
    { id: '11', name: t('bridal_hair'), isSelected: false },
    { id: '12', name: t('custom_service'), isSelected: false },
  ]);

  const goBack = () => {
    navigation.goBack();
  };

  const toggleService = (id: string) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, isSelected: !service.isSelected } 
        : service
    ));
  };

  const handleContinue = () => {
    const selectedServices = services.filter(service => service.isSelected);
    if (selectedServices.length === 0) {
      // Handle no selection case (could show an alert)
      return;
    }
    
    // Navigate to the next screen with selected services
    navigation.navigate('ServicePricing', {
      userData,
      token,
      selectedServices
    });
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity 
      style={styles.serviceItem} 
      onPress={() => toggleService(item.id)}
      activeOpacity={0.7}
    >
      <View style={item.isSelected ? styles.checkedBox : styles.uncheckedBox}>
        {item.isSelected && (
          <Image 
            source={images.icon_check_green} 
            style={styles.checkIcon}
            resizeMode="contain"
          />
        )}
      </View>
      <Text style={styles.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top ,paddingBottom:insets.bottom}]}>
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
        <Text style={styles.title}>{t('select_type_of_services')}</Text>
        <Text style={styles.subtitle}>{t('add_your_store_services')}</Text>
      </View>

      {/* Service Selection Instructions */}
      <Text style={styles.instructions}>{t('please_select_service')}</Text>

      {/* Services List */}
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.servicesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
        >
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
  instructions: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.black,
    marginBottom: 12,
  },
  servicesList: {
    paddingBottom: 24,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkedBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  uncheckedBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.placeholder,
    marginRight: 12,
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: Color.white,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.black,
  },
  bottomContainer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Color.border,
    backgroundColor: Color.white,
  },
  continueButton: {
    backgroundColor: Color.primary,
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