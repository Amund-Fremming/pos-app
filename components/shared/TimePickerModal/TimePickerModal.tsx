import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { styles } from "./TimePickerModal.styles";

type TimePickerModalProps = {
  visible: boolean;
  value: Date;
  onClose: () => void;
  onConfirm: (value: Date) => void;
};

export function TimePickerModal({ visible, value, onClose, onConfirm }: TimePickerModalProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (visible) setDraft(value);
  }, [visible, value]);

  const handleDone = () => {
    onConfirm(draft);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <DateTimePicker
            value={draft}
            mode="time"
            display="spinner"
            is24Hour
            themeVariant="light"
            onChange={(_event, date) => date && setDraft(date)}
          />
          <View style={styles.buttonWrap}>
            <PrimaryButton label="Ferdig" onPress={handleDone} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
