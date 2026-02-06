import { router } from "expo-router";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateIssueScreen() {
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
                    Report New Issue
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 20 }}>

                {/* Card */}
                <View
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        padding: 20,
                        elevation: 4,
                    }}
                >
                    {/* Issue Title */}
                    <Text style={{ fontWeight: "600", marginBottom: 6 }}>
                        Issue Title
                    </Text>
                    <TextInput
                        placeholder="e.g. Garbage not collected"
                        style={inputStyle}
                    />

                    {/* Description */}
                    <Text style={{ fontWeight: "600", marginBottom: 6, marginTop: 16 }}>
                        Description
                    </Text>
                    <TextInput
                        placeholder="Describe the issue..."
                        multiline
                        numberOfLines={4}
                        style={[inputStyle, { height: 100, textAlignVertical: "top" }]}
                    />

                    {/* Location */}
                    <Text style={{ fontWeight: "600", marginBottom: 6, marginTop: 16 }}>
                        Location
                    </Text>
                    <TextInput
                        placeholder="Your area / landmark"
                        style={inputStyle}
                    />

                    {/* Category */}
                    <Text style={{ fontWeight: "600", marginBottom: 6, marginTop: 16 }}>
                        Category
                    </Text>
                    <TextInput
                        placeholder="Road / Water / Garbage"
                        style={inputStyle}
                    />

                    {/* Submit */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#2E6CF6",
                            paddingVertical: 14,
                            borderRadius: 28,
                            alignItems: "center",
                            marginTop: 24,
                        }}
                    //onPress={() => router.back()}
                    >
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }} onPress={() => router.push({
                            pathname: "/issue/[id]",
                            params: { id: "12345" },
                        })}>
                            Submit Issue
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const inputStyle = {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
};
