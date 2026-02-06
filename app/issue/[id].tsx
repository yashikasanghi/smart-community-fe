import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";

export default function IssueDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, backgroundColor: "#EEF6FB" }}>
      
      {/* Header */}
      <View
        style={{
          backgroundColor: "#2E6CF6",
          paddingTop: 48,
          paddingBottom: 24,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>
          Issue #{id}
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* Title Card */}
        <View style={card}>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
            Pothole on Main St
          </Text>

          <Image
            source={{ uri: "https://via.placeholder.com/120" }}
            style={{ width: 120, height: 90, borderRadius: 8, marginBottom: 16 }}
          />

          {/* Status */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Status label="Open" active />
            <Status label="In Progress" active />
            <Status label="Resolved" />
          </View>
        </View>

        {/* Description */}
        <View style={card}>
          <Text style={sectionTitle}>Description</Text>
          <Text style={{ color: "#555" }}>
            Large pothole causing traffic.
          </Text>
        </View>

        {/* Location */}
        <View style={card}>
          <Text style={sectionTitle}>Location</Text>
          <Image
            source={{ uri: "https://maps.googleapis.com/maps/api/staticmap?center=New+York&zoom=14&size=300x150" }}
            style={{ width: "100%", height: 150, borderRadius: 12 }}
          />
        </View>

      </ScrollView>
    </View>
  );
}

function Status({ label, active }: { label: string; active?: boolean }) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          backgroundColor: active ? "#2E6CF6" : "#ccc",
          marginBottom: 6,
        }}
      />
      <Text style={{ fontSize: 12, color: active ? "#000" : "#888" }}>
        {label}
      </Text>
    </View>
  );
}

const card = {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  elevation: 4,
};

const sectionTitle = {
  fontWeight: "600" as const,
  marginBottom: 6,
};
