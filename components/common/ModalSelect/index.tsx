import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  value?: string;
  options: SelectOption[];
  onChange: (value: string) => void;

  placeholder?: string;
  title?: string;
  disabled?: boolean;
};

export function ModalSelect({
  value,
  options,
  onChange,
  placeholder = "Select",
  title = "Select an option",
  disabled = false,
}: Props) {
  const [open, setOpen] = useState(false);

  const selectedLabel = options.find((o) => o.value === value)?.label || value;

  console.log("options", options);

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.8}
        className={`border border-gray-300 rounded-xl px-4 justify-center h-12 bg-white ${
          disabled ? "opacity-50" : ""
        }`}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled, expanded: open }}
      >
        <Text className={selectedLabel ? "text-black" : "text-gray-400"}>
          {selectedLabel || placeholder}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Backdrop */}
        <Pressable
          onPress={() => setOpen(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          accessibilityLabel="Close selection"
        >
          {/* Box */}
          <Pressable
            onPress={() => {}}
            style={{
              width: "85%",
              maxHeight: "60%",
              backgroundColor: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              elevation: 12,
            }}
            accessibilityViewIsModal
          >
            {/* Header */}
            <View className="px-4 py-3 border-b border-gray-200">
              <Text className="text-base font-semibold">{title}</Text>
            </View>

            {/* List */}
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log("ward", item);
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={`px-4 py-4 ${
                    index !== options.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }`}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                >
                  <Text className="text-base">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
