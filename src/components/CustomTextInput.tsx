import React, { forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps as RNTextInputProps,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  TouchableOpacity,
} from "react-native";
import { Color, FontSizes } from "../themes/theme";
import images from "../../assets/images/images";
import { FontFamily } from "../constants/FontFamily";

interface CustomTextInputProps extends RNTextInputProps {
  title?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  showPassword?: boolean;
  pressOnPassword?: () => void;
  secureTextEntry?: boolean; // Add this to toggle text visibility
  editable?: boolean; // Add this line
}

const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      placeholder,
      title,
      onChangeText,
      containerStyle,
      textInputStyle,
      showPassword,
      pressOnPassword,
      secureTextEntry,
      editable = true, // Default to true
      ...rest
    },
    ref
  ): React.JSX.Element => {
    return (
      <View style={StyleSheet.flatten([styles.container, containerStyle])}>
        {title && <Text style={styles.header_text_style}>{title}</Text>}
        <View style={StyleSheet.flatten([
          styles.text_input_container,
          textInputStyle,
          !editable && { opacity: 0.7 } // Add opacity when disabled
        ])}>
          <TextInput
            ref={ref}
            placeholder={placeholder}
            style={styles.tex_input_style}
            placeholderTextColor={Color.placeholder}
            onChangeText={onChangeText}
            selectionColor={Color.primary}
            returnKeyLabel="done"
            returnKeyType="done"
            editable={editable} // Use editable prop
            secureTextEntry={secureTextEntry}
            {...rest}
          />
          {showPassword && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={pressOnPassword}
              style={{ alignSelf: "center" }}
            >
              <Image
                source={secureTextEntry ? images.icon_eye_open_black : images.icon_eye_close_black}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
);

export default CustomTextInput;

export const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
    marginTop: 10,
  },
  header_text_style: {
    fontFamily: FontFamily.semi_bold,
    fontSize: FontSizes.size14,
    color: Color.black_text,
  },
  text_input_container: {
    backgroundColor: Color.white,
    borderColor: Color.border,
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 52,
    flexDirection: 'row',
  },
  tex_input_style: {
    fontSize: FontSizes.size14,
    fontFamily: FontFamily.medium,
    color: Color.black,
    padding: 16,
    flex: 1,
  },

  inner_container: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 65,
    alignContent: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center', // Ensures that icons and images are aligned properly
  },
  icon: {
    alignSelf: 'center', // Center the icons horizontally
    height: 24,
    width: 24,
  },
  headerImage: {
    alignSelf: 'center', // Center the header image
  },
  button: {
    backgroundColor: Color.secondary,
    height: 48,
    alignContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  buttonDisabled: {
    backgroundColor: Color.secondary,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.size16,
    color: Color.white,
    lineHeight: 16,
    // textTransform:'capitalize'
  },
  search_bar: {
    height: 44,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.placeholder,
    padding: 10,
    flexDirection: 'row',
    columnGap: 8,
  },
  search_text: {
    fontSize: FontSizes.size14,
    fontFamily: FontFamily.medium,
    color: Color.placeholder,
  },
  header_title_text: {
    fontFamily: FontFamily.bold,
    fontSize: FontSizes.size18,
    color: Color.white,
  },
  discount_view_container: {
    marginTop: 5,
    rowGap: 8,
  },
  discount_text: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.size14,
    color: Color.primary,
  },
  discount_text_input_container: {
    height: 48,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: Color.placeholder,
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 2
  },
  apply_text: {
    fontFamily: FontFamily.medium,
    fontSize: FontSizes.size14,
    color: Color.secondary,
    textTransform: 'uppercase',
    marginRight: 5
  },

});
