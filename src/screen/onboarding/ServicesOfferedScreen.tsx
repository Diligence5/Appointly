import React from 'react';
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
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define complete service interface
interface Service {
  id: string;
  name: string;
  isSelected: boolean;
  price?: string;
  duration?: string;
}

export const ServicesOfferedScreen = ({ navigation, route }: any) => {
  const { userData, token, services } = route.params;
  const insets = useSafeAreaInsets();
  
  const goBack = () => {
    navigation.goBack();
  };

  const handleEditServices = () => {
    // Navigate back to the service pricing screen
    navigation.navigate('ServicePricing', {
      userData,
      token,
      selectedServices: services
    });
  };

  const handleContinue = () => {
    // Save services to user data and navigate back to store details
    const updatedUserData = {
      ...userData,
      services: services
    };
    
    navigation.navigate('StoreDetails', { 
      userData: updatedUserData, 
      token 
    });
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceImageContainer}>
        <Image
          source={require('../../../assets/images/icon_profile_place_holder.png')}
          style={styles.serviceImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.servicePrice}>{item.price}</Text>
      </View>
    </View>
  );

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
          <Text style={styles.title}>Services Offered</Text>
          <Text style={styles.subtitle}>Add your store's services</Text>
        </View>

        {/* Services List */}
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.servicesList}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Disable scrolling as the parent ScrollView handles it
        />

        {/* Edit Services Button */}
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={handleEditServices}
        >
          <Text style={styles.editButtonText}>Edit Services</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
        >
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
    width: 20,
    height: 20,
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
  servicesList: {
    paddingBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: Color.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.black,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  editButton: {
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.primary,
  },
  bottomContainer: {
    padding: 24,
    paddingHorizontal: 24,
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