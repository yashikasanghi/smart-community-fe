import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function IssueListingScreen() {
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
          New Issues
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* AI Summary */}
        <View
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: 10,
            padding: 10,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 12, color: "#333" }}>
            AI Summary: Pothole sent 2 days ago. High priority.
          </Text>
        </View>

        {/* Highlight Card */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 20 }}>
          
          <View style={roleCard("#E8F6EC", "#4FC37A")}>
            <Text style={roleTitle}>I am a Citizen</Text>
            <Text style={roleDesc}>Report issues, track progress.</Text>
          </View>

          <View style={roleCard("#EAF3FF", "#2E6CF6")}>
            <Image
              source={{ uri: "https://via.placeholder.com/80" }}
              style={{ width: "100%", height: 80, borderRadius: 8, marginBottom: 8 }}
            />
            <Text style={{ fontWeight: "600" }}>Add Photos</Text>
            <StatusBadge label="Open" />
          </View>

        </View>

        {/* Issue List */}
        <View style={card}>
          <IssueRow title="Illegal Dumping on Elm St" id="0021037" />
          <IssueRow title="Illegal Dumping on Elm St" id="202451232" />
          <IssueRow title="Pothole near Lake" id="0022037" />
          <IssueRow title="E-sign Details" id="0022038" />
        </View>

        {/* Continue */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2E6CF6",
            paddingVertical: 14,
            borderRadius: 28,
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Continue
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

/* ---------- Components ---------- */

function IssueRow({ title, id }: { title: string; id: string }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 14, alignItems: "center" }}>
      <Image
        source={{ uri: "https://via.placeholder.com/50" }}
        style={{ width: 50, height: 50, borderRadius: 6, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600" }}>{title}</Text>
        <Text style={{ fontSize: 12, color: "#666" }}>{id}</Text>
      </View>
      <StatusBadge label="Open" />
    </View>
  );
}

function StatusBadge({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: "#E74C3C",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 12 }}>{label}</Text>
    </View>
  );
}

/* ---------- Styles ---------- */

const card = {
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 16,
  elevation: 4,
};

const roleCard = (bg: string, border: string) => ({
  flex: 1,
  backgroundColor: bg,
  borderRadius: 16,
  padding: 16,
  borderWidth: 2,
  borderColor: border,
});

const roleTitle = {
  fontWeight: "600" as const,
  marginBottom: 6,
};

const roleDesc = {
  fontSize: 12,
  color: "#555",
};
