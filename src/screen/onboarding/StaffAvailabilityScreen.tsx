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

// Define time slot interface
interface TimeSlot {
  id: string;
  open: string;
  close: string;
}

// Define day interface
interface DaySchedule {
  day: string;
  isOpen: boolean;
  timeSlots: TimeSlot[];
}

export const StaffAvailabilityScreen = ({ navigation, route }: any) => {
  const { userData, token } = route.params;
  const insets = useSafeAreaInsets();

  // Initial schedule data
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: 'Mon',
      isOpen: true,
      timeSlots: [{ id: 'mon-1', open: '9:00 AM', close: '12:00 PM' }]
    },
    {
      day: 'Tue',
      isOpen: true,
      timeSlots: [{ id: 'tue-1', open: '9:00 AM', close: '12:00 PM' }]
    },
    {
      day: 'Wed',
      isOpen: true,
      timeSlots: [{ id: 'wed-1', open: '9:00 AM', close: '12:00 PM' }]
    },
    {
      day: 'Thu',
      isOpen: true,
      timeSlots: [{ id: 'thu-1', open: '9:00 AM', close: '12:00 PM' }]
    },
    {
      day: 'Fri',
      isOpen: true,
      timeSlots: [{ id: 'fri-1', open: '9:00 AM', close: '12:00 PM' }]
    },
    {
      day: 'Sat',
      isOpen: false,
      timeSlots: []
    },
    {
      day: 'Sun',
      isOpen: false,
      timeSlots: []
    }
  ]);

  const goBack = () => {
    navigation.goBack();
  };

  const toggleDayStatus = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isOpen = !newSchedule[index].isOpen;
    if (!newSchedule[index].isOpen) {
      newSchedule[index].timeSlots = [];
    } else if (newSchedule[index].timeSlots.length === 0) {
      // Add default time slot if toggling to open
      newSchedule[index].timeSlots = [
        {
          id: `${newSchedule[index].day.toLowerCase()}-1`,
          open: '9:00 AM',
          close: '12:00 PM'
        }
      ];
    }
    setSchedule(newSchedule);
  };

  const addTimeSlot = (dayIndex: number) => {
    const newSchedule = [...schedule];
    const day = newSchedule[dayIndex];
    const newSlotId = `${day.day.toLowerCase()}-${day.timeSlots.length + 1}`;

    day.timeSlots.push({
      id: newSlotId,
      open: '9:00 AM',
      close: '12:00 PM'
    });

    setSchedule(newSchedule);
  };

  const handleSave = () => {
    // Save the schedule data and navigate back to staff screen
    navigation.navigate('Staff', {
      userData: {
        ...userData,
        staffAvailability: schedule
      },
      token
    });
  };

  // Fake time selection - in a real app, this would open a time picker
  const selectTime = (dayIndex: number, slotIndex: number, type: 'open' | 'close') => {
    // In a real implementation, this would open a time picker
    console.log(`Select ${type} time for ${schedule[dayIndex].day}, slot ${slotIndex}`);
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
          <Text style={styles.title}>Staff Availability</Text>
          <Text style={styles.subtitle}>Please select working hours and days for this staff member.</Text>
        </View>

        {/* Days of week */}
        <View style={styles.daysContainer}>
          {schedule.map((day, dayIndex) => (
            <View key={day.day} style={styles.dayRow}>
              {/* Checkbox */}
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleDayStatus(dayIndex)}
              >
                {day.isOpen ? (
                  <View style={styles.checkedBox}>
                    <Image
                      source={images.icon_check_green}
                      style={styles.checkIcon}
                      resizeMode="contain"
                    />
                  </View>
                ) : (
                  <View style={styles.uncheckedBox} />
                )}
              </TouchableOpacity>

              {/* Day Name */}
              <Text style={styles.dayName}>{day.day}</Text>

              {/* Time slots or Closed */}
              {day.isOpen ? (
                <View style={styles.timeSlotsContainer}>
                  {day.timeSlots.map((slot, slotIndex) => (
                    <View key={slot.id} style={styles.timeSlot}>
                      {/* Opening Time */}
                      <TouchableOpacity
                        style={styles.timeSelector}
                        onPress={() => selectTime(dayIndex, slotIndex, 'open')}
                      >
                        <Text style={styles.timeText}>{slot.open}</Text>
                        <Image
                          source={images.icon_down_arrow_black}
                          style={styles.dropdownIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>

                      <Text style={styles.timeSeparator}>-</Text>

                      {/* Closing Time */}
                      <TouchableOpacity
                        style={styles.timeSelector}
                        onPress={() => selectTime(dayIndex, slotIndex, 'close')}
                      >
                        <Text style={styles.timeText}>{slot.close}</Text>
                        <Image
                          source={images.icon_down_arrow_black}
                          style={styles.dropdownIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}

                  {/* Add another button */}
                  <TouchableOpacity
                    style={styles.addAnotherButton}
                    onPress={() => addTimeSlot(dayIndex)}
                  >
                    <Text style={styles.addAnotherText}>Add another</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.closedText}>Unavailable</Text>
              )}
            </View>
          ))}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
  },
  daysContainer: {
    marginTop: 16,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 12,
  },
  checkedBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckedBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.placeholder,
  },
  checkIcon: {
    width: 14,
    height: 14,
    tintColor: Color.white,
  },
  dayName: {
    width: 40,
    fontSize: 16,
    fontFamily: FontFamily.medium,
    color: Color.black,
  },
  timeSlotsContainer: {
    flex: 1,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 100,
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.black,
  },
  dropdownIcon: {
    width: 12,
    height: 12,
    tintColor: Color.placeholder,
  },
  timeSeparator: {
    fontSize: 16,
    fontFamily: FontFamily.regular,
    color: Color.black,
    marginHorizontal: 8,
  },
  addAnotherButton: {
    paddingVertical: 8,
  },
  addAnotherText: {
    fontSize: 14,
    fontFamily: FontFamily.medium,
    color: Color.primary,
  },
  closedText: {
    fontSize: 14,
    fontFamily: FontFamily.regular,
    color: Color.placeholder,
    marginLeft: 20,
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