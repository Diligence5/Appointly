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
    Dimensions,
    Linking,
    StatusBar,
} from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Types for staff and services
interface StaffMember {
    id: string;
    name: string;
    specialty: string;
    price: string;
    image: any;
}

interface Service {
    id: string;
    name: string;
    price: string;
    image: any;
}

export const StoreListingScreen = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();

    // Sample staff data
    const staffMembers: StaffMember[] = [
        {
            id: '1',
            name: 'Darrell Steward',
            specialty: 'Haircut Expert',
            price: '£25.00',
            image: images.icon_profile_place_holder, // Replace with actual staff image
        },
        {
            id: '2',
            name: 'Jacob Jones',
            specialty: 'Beard Specialist',
            price: '£20.00',
            image: images.icon_profile_place_holder, // Replace with actual staff image
        },
        {
            id: '3',
            name: 'Brooklyn Simmons',
            specialty: 'Haircut Expert',
            price: '£25.00',
            image: images.icon_profile_place_holder, // Replace with actual staff image
        },
    ];

    // Sample services data
    const services: Service[] = [
        {
            id: '1',
            name: 'Haircut & Shave',
            price: '£25.00',
            image: images.icon_profile_place_holder, // Replace with actual service image
        },
        {
            id: '2',
            name: 'Haircut & Facial',
            price: '£40.00',
            image: images.icon_profile_place_holder, // Replace with actual service image
        },
        {
            id: '3',
            name: 'Haircut & Beard Grooming',
            price: '£30.00',
            image: images.icon_profile_place_holder, // Replace with actual service image
        },
        {
            id: '4',
            name: 'Haircut & Anti-Pollution Cleanup',
            price: '£50.00',
            image: images.icon_profile_place_holder, // Replace with actual service image
        },
    ];

    const goBack = () => {
        navigation.goBack();
    };

    const openWebsite = () => {
        Linking.openURL('https://famousbarbershop.com');
    };

    const makeCall = () => {
        Linking.openURL('tel:+1234567890');
    };

    const getDirections = () => {
        Linking.openURL('https://maps.google.com/?q=123+Main+St,+Albuquerque,+New+Mexico');
    };

    const sendMessage = () => {
        // Navigate to message screen or open messaging app
        navigation.navigate('Messages');
    };

    const bookStaff = (staffId: string) => {
        // Handle staff booking
        console.log(`Booking staff member with ID: ${staffId}`);
    };

    const bookService = (serviceId: string) => {
        // Handle service booking
        console.log(`Booking service with ID: ${serviceId}`);
    };

    const renderStaffItem = ({ item }: { item: StaffMember }) => (
        <View style={styles.staffItem}>
            <View style={styles.staffInfoContainer}>
                <Image source={item.image} style={styles.staffImage} />
                <View style={styles.staffInfo}>
                    <Text style={styles.staffName}>{item.name}</Text>
                    <Text style={styles.staffSpecialty}>{item.specialty}</Text>
                    <Text style={styles.staffPrice}>{item.price}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.bookButton}
                onPress={() => bookStaff(item.id)}
            >
                <Text style={styles.bookButtonText}>Book</Text>
                <Text style={styles.bookButtonPlus}>+</Text>
            </TouchableOpacity>
        </View>
    );

    const renderServiceItem = ({ item }: { item: Service }) => (
        <View style={styles.serviceItem}>
            <View style={styles.serviceInfoContainer}>
                <Image source={item.image} style={styles.serviceImage} />
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <Text style={styles.servicePrice}>{item.price}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.bookButton}
                onPress={() => bookService(item.id)}
            >
                <Text style={styles.bookButtonText}>Book</Text>
                <Text style={styles.bookButtonPlus}>+</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Shop Image */}
                <View style={styles.shopImageContainer}>
                    <Image
                        source={images.icon_sorting_listing_image} // Replace with actual shop image
                        style={styles.shopImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.backButton} onPress={goBack}>
                        <Image
                            source={images.icon_back_press_arrow}
                            style={styles.backIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                {/* Shop Details Card */}
                <View style={styles.shopDetailsCard}>
                    <View style={styles.line} />
                    <Text style={styles.shopName}>Famous Barbershop</Text>
                    <Text style={styles.shopAddress}>
                        123 Main St, Albuquerque, New Mexico 87104
                    </Text>

                    <View style={styles.shopStatusRow}>
                        <View style={styles.openStatusContainer}>
                            <Image source={images.icon_clock_green} resizeMode="contain" />
                            <Text style={styles.openStatusText}>Now Open</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Image
                                source={images.icon_star_yellow} // Using an available icon
                                style={styles.starIcon}
                            />
                            <Text style={styles.ratingText}>4.8 (236)</Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={openWebsite}>
                            <View style={styles.actionIconContainer}>
                                <Image
                                    source={images.icon_global_black}
                                    style={styles.actionIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.actionText}>Website</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={makeCall}>
                            <View style={styles.actionIconContainer}>
                                <Image
                                    source={images.icon_call_black} // Replace with call icon
                                    style={styles.actionIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.actionText}>Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={getDirections}>
                            <View style={styles.actionIconContainer}>
                                <Image
                                    source={images.icon_map_black} // Replace with directions icon
                                    style={styles.actionIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.actionText}>Direction</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={sendMessage}>
                            <View style={styles.actionIconContainer}>
                                <Image
                                    source={images.icon_message_unselected} // Replace with message icon
                                    style={styles.actionIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.actionText}>Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                {/* Staff Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Book A Consultation</Text>
                    <FlatList
                        data={staffMembers}
                        renderItem={renderStaffItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                {/* Services Section */}
                <View style={[styles.sectionContainer, { marginBottom: 30 }]}>
                    <Text style={styles.sectionTitle}>Services</Text>
                    <FlatList
                        data={services}
                        renderItem={renderServiceItem}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
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
    shopImageContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    shopImage: {
        width: '100%',
        height: '100%',

    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {

    },
    shopDetailsCard: {
        marginTop: -20,
        padding: 16,
        backgroundColor: Color.white,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    line: {
        height: 4,
        backgroundColor: Color.border,
        marginBottom: 8,
        width: '35%',
        alignSelf: 'center',
    },
    shopName: {
        fontSize: 18,
        fontFamily: FontFamily.bold,
        color: Color.black,
        marginBottom: 4,
    },
    shopAddress: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        marginBottom: 8,
    },
    shopStatusRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 16,
    },
    openStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginRight: 24,
    },

    openStatusText: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.black,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 4,
        tintColor: Color.yellow,
    },
    ratingText: {
        fontSize: 12,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    actionIcon: {

    },
    actionText: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.black,
    },
    horizontalLine: {
        height: 8,
        backgroundColor: Color.border,
        marginTop: 16,
    },
    sectionContainer: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: FontFamily.bold,
        color: Color.black,
        marginBottom: 16,
    },
    staffItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: Color.border,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
        borderRadius: 16,
    },
    staffInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    staffImage: {
        width: 68,
        height: 68,
        borderRadius: 5,
        marginRight: 12,
    },
    staffInfo: {
        flex: 1,
    },
    staffName: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    staffSpecialty: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
    },
    staffPrice: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginTop: 2,
    },
    bookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 54,
    },
    bookButtonText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginRight: 4,
    },
    bookButtonPlus: {
        fontSize: 14,
        fontFamily: FontFamily.bold,
        color: Color.black,
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        borderColor: Color.border,
        borderWidth: 1,
        padding: 16,
        borderRadius: 16,
    },
    serviceInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    serviceImage: {
        width: 68,
        height: 68,
        borderRadius: 5,
        marginRight: 12,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    servicePrice: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginTop: 2,
    },
}); 