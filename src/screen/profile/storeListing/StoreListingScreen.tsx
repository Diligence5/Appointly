import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import { Color } from '../../../themes/theme';
import { FontFamily } from '../../../constants/FontFamily';
import images from '../../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Define store/service interface
interface Store {
    id: string;
    name: string;
    type: string;
    address: string;
    image: any;
    rating: number;
    isActive: boolean;
}

export const StoreListingScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const { t } = useTranslation();
    const user = useSelector((state: any) => state.auth.user);

    // Sample store data - in a real app, this would come from the API
    const stores: Store[] = [
        {
            id: '1',
            name: 'Barber Street',
            type: 'Barbershop',
            address: '123 High Street, London',
            image: images.icon_profile_place_holder,
            rating: 4.8,
            isActive: true,
        },
        {
            id: '2',
            name: 'Style Studio',
            type: 'Hair Salon',
            address: '45 Fashion Avenue, London',
            image: images.icon_profile_place_holder,
            rating: 4.5,
            isActive: true,
        },
        {
            id: '3',
            name: 'Beauty Lounge',
            type: 'Beauty Salon',
            address: '78 Beauty Boulevard, London',
            image: images.icon_profile_place_holder,
            rating: 4.7,
            isActive: false,
        },
    ];

    const goBack = () => {
        navigation.goBack();
    };

    const handleAddStore = () => {
        // Navigate to add store screen
        navigation.navigate('StoreDetails');
    };

    const handleEditStore = (store: Store) => {
        // Navigate to edit store screen
        navigation.navigate('StoreProfile', { storeData: store });
    };

    const renderStoreItem = ({ item }: { item: Store }) => (
        <TouchableOpacity
            style={styles.storeItem}
            onPress={() => handleEditStore(item)}
        >
            {/* Store Image */}
            <Image
                source={item.image}
                style={styles.storeImage}
                resizeMode="cover"
            />

            {/* Store Info */}
            <View style={styles.storeInfo}>
                <View style={styles.storeHeader}>
                    <Text style={styles.storeName}>{item.name}</Text>
                    <View style={[
                        styles.statusIndicator,
                        { backgroundColor: item.isActive ? '#4CAF50' : '#9E9E9E' }
                    ]} />
                </View>
                <Text style={styles.storeType}>{item.type}</Text>
                <Text style={styles.storeAddress}>{item.address}</Text>
                
                {/* Rating */}
                <View style={styles.ratingContainer}>
                    <Image
                        source={images.icon_card_black}
                        style={styles.starIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                </View>
            </View>

            {/* Arrow Icon */}
            <Image
                source={images.icon_arrow_right_black}
                style={styles.arrowIcon}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Image
                        source={images.icon_back_press_arrow}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('your_stores')}</Text>
                <View style={styles.placeholderView} />
            </View>

            {/* Store List */}
            <FlatList
                data={stores}
                renderItem={renderStoreItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Add Store Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddStore}>
                <Text style={styles.addButtonText}>{t('add_new_store')}</Text>
            </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
    },
    backIcon: {

    },
    headerTitle: {
        fontSize: 18,
        fontFamily: FontFamily.bold,
        color: Color.black,
    },
    placeholderView: {
        width: 44,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Space for the add button
    },
    storeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    storeImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 16,
    },
    storeInfo: {
        flex: 1,
    },
    storeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    storeName: {
        fontSize: 16,
        fontFamily: FontFamily.bold,
        color: Color.black,
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    storeType: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.primary,
        marginBottom: 4,
    },
    storeAddress: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        width: 16,
        height: 16,
        tintColor: '#FFC107',
        marginRight: 4,
    },
    ratingText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    arrowIcon: {
        width: 16,
        height: 16,
        tintColor: '#AAAAAA',
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        left: 24,
        right: 24,
        backgroundColor: Color.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 16,
        fontFamily: FontFamily.bold,
        color: Color.white,
    },
}); 