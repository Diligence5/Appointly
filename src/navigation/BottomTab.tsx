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
                        fontSize: 9,
                        fontFamily: FontFamily.medium,
                    },
                    tabBarActiveTintColor: Color.primary,
                    tabBarInactiveTintColor: Color.black,
                    tabBarStyle: {
                        backgroundColor: Color.white,
                        height: 70,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconSource;
                        switch (route.name) {
                            case "Booking":
                                iconSource = images.icon_home;
                                break;
                            case "Messages":
                                iconSource = images.icon_my_needs;
                                break;
                            case "Profile":
                                iconSource = images.icon_profile;
                                break;
                            default:
                                iconSource = null;
                        }

                        return iconSource ? (
                            <Image
                                source={iconSource}
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: color,
                                }}
                                resizeMode="contain"
                            />
                        ) : null;
                    },
                    title: setTabBarTitle(route.name),
                    tabBarIconStyle: { height: 20, width: 20, marginTop: 14, marginBottom: 6 }
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
