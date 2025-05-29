import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { clearAccessToken } from '../../redux/slices/authSlice';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define booking interface
interface Booking {
    id: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed';
    customer: {
        name: string;
        image: any;
    };
    services: string[];
    amount: string;
}

export const BookingScreen = ({ navigation }: any) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const insets = useSafeAreaInsets();

    // Tab selection state
    const [selectedTab, setSelectedTab] = useState('all');

    // Mock data for bookings
    const [bookings] = useState<Booking[]>([
        {
            id: '1',
            date: '15 Dec 2024',
            time: '2:30PM',
            status: 'upcoming',
            customer: {
                name: 'John Doe',
                image: require('../../../assets/images/icon_profile_place_holder.png'),
            },
            services: ['1x haircut', '1x facial'],
            amount: '£60.000'
        },
        {
            id: '2',
            date: '15 Dec 2024',
            time: '2:30PM',
            status: 'upcoming',
            customer: {
                name: 'John Doe',
                image: require('../../../assets/images/icon_profile_place_holder.png'),
            },
            services: ['1x haircut', '1x facial'],
            amount: '£60.000'
        },
        {
            id: '3',
            date: '22 Jan 2023',
            time: '',
            status: 'completed',
            customer: {
                name: 'John Doe',
                image: require('../../../assets/images/icon_profile_place_holder.png'),
            },
            services: ['1x haircut', '1x facial'],
            amount: '£20.00'
        },
        {
            id: '4',
            date: '22 Jan 2023',
            time: '',
            status: 'completed',
            customer: {
                name: 'John Doe',
                image: require('../../../assets/images/icon_profile_place_holder.png'),
            },
            services: ['Consultation with David Stewart', 'Scalp Health & Hair Loss Solutions'],
            amount: '£20.00'
        },
        {
            id: '5',
            date: '22 Jan 2023',
            time: '',
            status: 'completed',
            customer: {
                name: 'John Doe',
                image: require('../../../assets/images/icon_profile_place_holder.png'),
            },
            services: ['1x beard trim', '1x haircut', '1x facial'],
            amount: '£32.00'
        },
    ]);

    // Filter bookings based on selected tab
    const filteredBookings = bookings.filter(booking => {
        if (selectedTab === 'all') return true;
        if (selectedTab === 'upcoming') return booking.status === 'upcoming';
        if (selectedTab === 'past') return booking.status === 'completed';
        return true;
    });

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        // Clear the authentication state
                        dispatch(clearAccessToken());
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const renderBookingItem = ({ item }: { item: Booking }) => (
        <View style={styles.bookingItem}>
            {/* Date and Status */}
            <View style={styles.bookingHeader}>
                <Text style={styles.bookingDate}>
                    {item.date} {item.time ? `at ${item.time}` : ''}
                </Text>
                <View style={[
                    styles.statusBadge,
                    item.status === 'completed' ? styles.completedBadge : styles.upcomingBadge
                ]}>
                    <Text style={[
                        styles.statusText,
                        item.status === 'completed' ? styles.completedText : styles.upcomingText
                    ]}>
                        {item.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </Text>
                </View>
            </View>
            <View style={styles.bookingLine} />
            {/* Customer Info and Services */}
            <View style={styles.bookingContent}>
                <Image
                    source={item.customer.image}
                    style={styles.customerImage}
                />
                <View style={styles.bookingDetails}>
                    <Text style={styles.customerName}>{item.customer.name}</Text>
                    <Text style={styles.serviceText}>{item.services.join(' + ')}</Text>
                </View>
            </View>
            <View style={styles.bookingLine} />
            {/* Payment and Message Button */}
            <View style={styles.bookingFooter}>
                <View>
                    <Text style={styles.paymentLabel}>Total Payment</Text>
                    <Text style={styles.paymentAmount}>{item.amount}</Text>
                </View>
                <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.messageButtonText}>Message Client</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Bookings</Text>
                <TouchableOpacity style={styles.notificationButton}>
                    <Image
                        source={images.icon_notification_black}
                        style={styles.notificationIcon}
                    />
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationCount}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Tab Selector */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'all' && styles.activeTab]}
                    onPress={() => setSelectedTab('all')}
                >
                    <Text style={[
                        styles.tabText,
                        selectedTab === 'all' && styles.activeTabText
                    ]}>All</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'upcoming' && styles.activeTab]}
                    onPress={() => setSelectedTab('upcoming')}
                >
                    <Text style={[
                        styles.tabText,
                        selectedTab === 'upcoming' && styles.activeTabText
                    ]}>Upcoming</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'past' && styles.activeTab]}
                    onPress={() => setSelectedTab('past')}
                >
                    <Text style={[
                        styles.tabText,
                        selectedTab === 'past' && styles.activeTabText
                    ]}>Past</Text>
                </TouchableOpacity>
            </View>

            {/* Bookings List */}
            <FlatList
                data={filteredBookings}
                renderItem={renderBookingItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.bookingsList}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No bookings available</Text>
                    </View>
                }
            />
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
    headerTitle: {
        fontSize: 24,
        fontFamily: FontFamily.bold,
        color: Color.black,
    },
    notificationButton: {
        position: 'relative',
        borderWidth: 1,
        borderColor: Color.border,
        borderRadius: 100,
        padding: 8,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationIcon: {
        width: 24,
        height: 24,
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationCount: {
        color: Color.white,
        fontSize: 10,
        fontFamily: FontFamily.bold,
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        backgroundColor: '#F2F2F2',
        borderRadius: 25,
        padding: 4,
        marginBottom: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 25,
    },
    activeTab: {
        backgroundColor: Color.white,
    },
    tabText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.placeholder,
    },
    activeTabText: {
        color: Color.black,
    },
    bookingsList: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    bookingItem: {
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: Color.white,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    bookingLine: {
        height: 1,
        backgroundColor: Color.border,
        marginBottom: 16,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bookingDate: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 40,
    },
    upcomingBadge: {
        backgroundColor: '#FFF3E0',
    },
    completedBadge: {
        backgroundColor: '#E8F5E9',
    },
    statusText: {
        fontSize: 12,
        fontFamily: FontFamily.medium,
    },
    upcomingText: {
        color: '#FF9800',
    },
    completedText: {
        color: '#4CAF50',
    },
    bookingContent: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    customerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    bookingDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    customerName: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginBottom: 4,
    },
    serviceText: {
        fontSize: 14,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
    },
    bookingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentLabel: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        marginBottom: 4,
    },
    paymentAmount: {
        fontSize: 16,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    messageButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 20,
    },
    messageButtonText: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
    },
    emptyStateText: {
        fontSize: 16,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
    },
});
