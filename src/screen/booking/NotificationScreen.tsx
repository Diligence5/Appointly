import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import { Color } from '../../themes/theme';
import { FontFamily } from '../../constants/FontFamily';
import images from '../../../assets/images/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

// Define notification interface
interface Notification {
    id: string;
    type: 'appointment' | 'booking';
    title: string;
    details: string;
    time: string;
    isNew: boolean;
    date: string;
}

export const NotificationScreen = ({ navigation }: any) => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    // Mock data for notifications
    const newestNotifications = [
        {
            id: '1',
            type: 'appointment',
            title: t('upcoming_appointment'),
            details: `You have an appointment with John Doe for Haircut on 15 Dec at 2:30PM`,
            time: t('just_now'),
            isNew: true,
            date: '15 Dec'
        },
        {
            id: '2',
            type: 'booking',
            title: t('new_booking_received'),
            details: `John Doe has booked Haircut on 15 Dec at 2:30PM`,
            time: t('just_now'),
            isNew: true,
            date: '15 Dec'
        },
    ];

    const oldestNotifications = [
        {
            id: '3',
            type: 'booking',
            title: t('new_booking_received'),
            details: `John Doe has booked Haircut on 15 Dec at 2:30PM`,
            time: t('just_now'),
            isNew: true,
            date: '15 Dec'
        },
        {
            id: '4',
            type: 'booking',
            title: t('new_booking_received'),
            details: `John Doe has booked Haircut on 15 Dec at 2:30PM`,
            time: t('just_now'),
            isNew: true,
            date: '15 Dec'
        },
    ];

    const goBack = () => {
        navigation.goBack();
    };

    const navigateToSettings = () => {
        // Navigate to settings screen
        // navigation.navigate('Settings');
    };

    const renderNotificationItem = (item: Notification) => (
        <View style={styles.notificationItem}>
            {/* Icon */}
            <View style={styles.notificationIconContainer}>
                <Image
                    source={item.type === 'appointment' ? images.icon_calendar : images.icon_clock}
                    style={styles.notificationIcon}
                    resizeMode="contain"
                />
            </View>

            {/* Content */}
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationDetails}>{item.details}</Text>
            </View>

            {/* Time and Status */}
            <View style={styles.notificationStatus}>
                <Text style={styles.notificationTime}>{item.time}</Text>
                {item.isNew && <View style={styles.newDot} />}
            </View>
            <View style={styles.notificationLine} />
        </View>
    );

    return (
        <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Image
                        source={images.icon_back_press_arrow}
                        style={styles.backIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{t('notification')}</Text>

                <TouchableOpacity style={styles.settingsButton} onPress={navigateToSettings}>
                    <Image
                        source={images.icon_setting_black}
                        style={styles.settingsIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {/* Newest Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('newest')}</Text>

                    {newestNotifications.map(item => (
                        <View key={item.id}>
                            {renderNotificationItem(item as Notification)}
                        </View>
                    ))}
                </View>

                {/* Oldest Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('oldest')}</Text>

                    {oldestNotifications.map(item => (
                        <View key={item.id}>
                            {renderNotificationItem(item as Notification)}
                        </View>
                    ))}
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
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,

    },
    backButton: {

        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {

    },
    headerTitle: {
        fontSize: 18,
        fontFamily: FontFamily.bold,
        color: Color.black,
    },
    settingsButton: {
        borderWidth: 1,
        borderColor: Color.border,
        borderRadius: 100,
        padding: 8,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {

    },
    section: {
        marginTop: 20,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: FontFamily.bold,
        color: Color.black,
        marginBottom: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    notificationIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8EAF6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    notificationIcon: {
        width: 20,
        height: 20,
        tintColor: Color.primary,
    },
    notificationContent: {
        flex: 1,
        marginRight: 8,
    },
    notificationTitle: {
        fontSize: 14,
        fontFamily: FontFamily.medium,
        color: Color.black,
        marginBottom: 4,
    },
    notificationDetails: {
        fontSize: 13,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        lineHeight: 18,
    },
    notificationStatus: {
        alignItems: 'flex-end',
    },
    notificationTime: {
        fontSize: 12,
        fontFamily: FontFamily.regular,
        color: Color.placeholder,
        marginBottom: 4,
    },
    newDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF6D00',
    },
    notificationLine: {
        height: 1,
        backgroundColor: Color.border,
        marginBottom: 16,
    },
}); 