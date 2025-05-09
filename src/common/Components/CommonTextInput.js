import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../Utils/Colors';

const CommonTextInput = ({value, onChangeText, placeholder}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.inputStyle}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          style={styles.clearButton}>
          <Text style={styles.clearText}>✖</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: RFValue(1),
    borderColor: COLORS.Grey,
    borderRadius: RFValue(10),
    paddingHorizontal: RFValue(10),
    marginBottom: RFValue(6),
    marginHorizontal: RFValue(5),
  },
  inputStyle: {
    flex: 1,
    paddingVertical: RFValue(10),
  },
  clearButton: {
    padding: RFValue(5),
  },
  clearText: {
    color: COLORS.Black,
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
});
