import React from "react";
import { Image, StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontFamily } from "../constants/FontFamily";
import { Color } from "../themes/theme";
import images from "../../assets/images/images";
import { BookingScreen } from "../screen/booking/BookingScreen";
import { MessagesScreen } from "../screen/messages/MessagesScreen";
import { ProfileScreen } from "../screen/profile/ProfileScreen";
import { strings, Messages } from "../constants/strings";





function BottomTab(props: any): React.JSX.Element {
    const Tab = createBottomTabNavigator();
    const insets = useSafeAreaInsets();

    const setTabBarTitle = (route: string) => {
        switch (route) {
            case "Booking":
                return strings.Booking;
            case "Messages":
                return Messages.my_needs
            case "Profile":
                return strings.profile;
            default:
                return '';
        }
    };

    return (
        <View style={{ flex: 1, paddingBottom: insets.bottom, backgroundColor: Color.white }}>
            <StatusBar backgroundColor={Color.primary} barStyle={'light-content'} />
            <Tab.Navigator
                initialRouteName="Booking"
                screenOptions={({ route }) => ({
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontFamily: FontFamily.medium,
                        marginBottom: 8,
                    },
                    tabBarActiveTintColor: Color.primary,
                    tabBarInactiveTintColor: Color.black,
                    tabBarStyle: {
                        backgroundColor: Color.white,
                        height: 60,
                        borderTopWidth: 1,
                        borderTopColor: '#E5E5E5',
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconSource;
                        switch (route.name) {
                            case "Booking":
                                iconSource = focused ? images.icon_booking_selected : images.icon_booking_unselected;
                                break;
                            case "Messages":
                                iconSource = focused ? images.icon_message_selected : images.icon_message_unselected;
                                break;
                            case "Profile":
                                iconSource = focused ? images.icon_profile_selected : images.icon_profile_unselected;
                                break;
                            default:
                                iconSource = null;
                        }

                        return iconSource ? (
                            <Image
                                source={iconSource}
                                style={{
                                    width: 24,
                                    height: 24,
                                }}
                                resizeMode="contain"
                            />
                        ) : null;
                    },
                    title: setTabBarTitle(route.name),
                    tabBarIconStyle: { marginTop: 10 }
                })}
            >
                <Tab.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Messages" component={MessagesScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </View>
    );
}

export default BottomTab;
