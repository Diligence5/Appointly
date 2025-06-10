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
import CustomTextInput from '../../../components/CustomTextInput';
import { useTranslation } from 'react-i18next';

// Define service interface
interface Service {
  id: string;
  name: string;
  isSelected: boolean;
  price?: string;
  duration?: string;
  isExpanded?: boolean;
}

export const ServicePricingScreen = ({ navigation, route }: any) => {
  const { userData, token, selectedServices } = route.params;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  // Initial services list with pricing fields
  const [services, setServices] = useState<Service[]>(
    selectedServices.map((service: Service) => ({
      ...service,
      price: service.id === '1' ? '£0.00' : '',
      duration: service.id === '1' ? '30 mins' : '',
      isExpanded: service.id === '1' // Expand first service by default
    }))
  );

  const goBack = () => {
    navigation.goBack();
  };

  const toggleExpand = (id: string) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, isExpanded: !service.isExpanded }
        : service
    ));
  };

  const updateServicePrice = (id: string, price: string) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, price }
        : service
    ));
  };

  const updateServiceDuration = (id: string, duration: string) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, duration }
        : service
    ));
  };

  const handleSave = () => {
    // Validate that all services have price and duration
    const isComplete = services.every(service =>
      service.price && service.price.trim() !== '' &&
      service.duration && service.duration.trim() !== ''
    );

    if (!isComplete) {
      // Handle incomplete data (could show an alert)
      return;
    }

    // Navigate to the services offered screen
    navigation.navigate('ServicesOffered', {
      userData,
      token,
      services
    });
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
          <Text style={styles.title}>{t('add_price_duration')}</Text>
          <Text style={styles.subtitle}>{t('add_your_store_services')}</Text>
        </View>

        {/* Services List */}
        {services.map((service) => (
          <View key={service.id} style={styles.serviceItem}>
            {/* Service Name with Expand/Collapse */}
            <TouchableOpacity
              style={styles.serviceHeader}
              onPress={() => toggleExpand(service.id)}
            >
              <Text style={styles.serviceName}>{service.name}</Text>
              <Image
                source={images.icon_down_arrow_black}
                style={[
                  styles.arrowIcon,
                  service.isExpanded && styles.arrowIconUp
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Expanded Content */}
            {service.isExpanded && (
              <View style={styles.serviceDetails}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>{t('price')}</Text>
                    <CustomTextInput
                      value={service.price}
                      onChangeText={(text) => updateServicePrice(service.id, text)}
                      containerStyle={styles.priceInput}
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.column}>
                    <Text style={styles.label}>{t('duration')}</Text>
                    <CustomTextInput
                      value={service.duration}
                      onChangeText={(text) => updateServiceDuration(service.id, text)}
                      containerStyle={styles.durationInput}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>{t('save')}</Text>
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
    paddingBottom: 24,
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
  serviceItem: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Color.border,
    paddingBottom: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: Color.black,
  },
  arrowIconUp: {
    transform: [{ rotate: '180deg' }],
  },
  serviceDetails: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.black,
    marginBottom: 4,
  },
  priceInput: {
    marginTop: 0,
  },
  durationInput: {
    marginTop: 0,
  },
  bottomContainer: {
    padding: 24,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: Color.border,
    backgroundColor: Color.white,
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