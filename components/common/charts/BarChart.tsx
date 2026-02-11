import { View, Text } from "react-native";

type BarChartItem = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartItem[];
  maxValue?: number;
  valueSuffix?: string;
};

export default function BarChart({
  data,
  maxValue,
  valueSuffix = "",
}: BarChartProps) {
  if (!data.length) {
    return (
      <View className="bg-white rounded-2xl px-5 py-5">
        <Text className="text-gray-500 text-sm">No data available.</Text>
      </View>
    );
  }

  const computedMax = maxValue ?? Math.max(...data.map((item) => item.value), 1);

  return (
    <View className="bg-white rounded-2xl px-5 py-5">
      {data.map((item) => {
        const width = computedMax
          ? `${Math.max(4, (item.value / computedMax) * 100)}%`
          : "0%";
        return (
          <View key={item.label} className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-700 text-xs flex-1" numberOfLines={2}>
                {item.label}
              </Text>
              <Text className="text-gray-500 text-xs">
                {item.value}
                {valueSuffix}
              </Text>
            </View>
            <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <View
                className="h-full bg-indigo-500"
                style={{ width }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
