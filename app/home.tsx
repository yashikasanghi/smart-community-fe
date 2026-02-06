import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#EEF6FB" }}>
      
      {/* Header */}
      <View
        style={{
          backgroundColor: "#2E6CF6",
          paddingTop: 48,
          paddingBottom: 32,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          Welcome,
        </Text>
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "600" }}>
          Citizen
        </Text>
      </View>

      {/* Content */}
      <View style={{ padding: 20 }}>
        
        {/* Report Issue Card */}
        <TouchableOpacity
          onPress={() => router.push("/create-issue")}
          style={{
            backgroundColor: "#4FB6C2",
            borderRadius: 20,
            paddingVertical: 32,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 32, color: "#fff", marginBottom: 8 }}>＋</Text>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Report New Issue
          </Text>
        </TouchableOpacity>

        {/* Summary Card */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 20,
            elevation: 4,
          }}
        >
          <Text style={{ fontWeight: "600", marginBottom: 12 }}>
            My Issues Summary
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>2</Text>
              <Text style={{ color: "#666" }}>Open</Text>
            </View>

            <View style={{ width: 1, backgroundColor: "#eee" }} />

            <View style={{ alignItems: "center", flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>1</Text>
              <Text style={{ color: "#666" }}>Resolved</Text>
            </View>

          </View>
        </View>

      </View>
    </View>
  );
}
