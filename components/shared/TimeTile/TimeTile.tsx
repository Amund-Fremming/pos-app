import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles } from "./TimeTile.styles";

type TimeTileProps = {
  label: string;
  value: Date;
  onChange: (value: Date) => void;
};

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function TimeTile({ label, value, onChange }: TimeTileProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (event.type === "set" && selected) onChange(selected);
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={styles.tile} onPress={() => setShowPicker(true)}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{formatTime(value)}</Text>
      </Pressable>
      {showPicker ? (
        <DateTimePicker value={value} mode="time" is24Hour display="default" onChange={handleChange} />
      ) : null}
    </View>
  );
}
