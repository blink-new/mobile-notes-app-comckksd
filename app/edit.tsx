
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Note = {
  id: string;
  title: string;
  body: string;
  updated: number;
};

const NOTES_KEY = "NOTES_V1";

// Simple icon components that work on all platforms
const ArrowLeftIcon = ({ size = 24, color = "#7c5cff" }) => (
  <Text style={{ color, fontSize: size, fontWeight: "bold" }}>←</Text>
);

const SaveIcon = ({ size = 18, color = "#fff" }) => (
  <Text style={{ color, fontSize: size, marginRight: 6 }}>💾</Text>
);

export default function EditNoteScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [title, setTitle] = useState((params.title as string) || "");
  const [body, setBody] = useState((params.body as string) || "");
  const [saving, setSaving] = useState(false);

  async function saveNote() {
    if (!title.trim() && !body.trim()) {
      router.back();
      return;
    }
    setSaving(true);
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    let notes: Note[] = raw ? JSON.parse(raw) : [];
    if (params.id) {
      // Edit
      notes = notes.map((n) =>
        n.id === params.id
          ? { ...n, title, body, updated: Date.now() }
          : n
      );
    } else {
      // New
      notes.push({
        id: Math.random().toString(36).slice(2),
        title,
        body,
        updated: Date.now(),
      });
    }
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    setSaving(false);
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={saveNote}
          disabled={saving}
          activeOpacity={0.8}
        >
          <SaveIcon />
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#999"
      />
      
      <ScrollView style={styles.bodyContainer}>
        <TextInput
          style={styles.bodyInput}
          placeholder="Start typing your note..."
          value={body}
          onChangeText={setBody}
          multiline
          placeholderTextColor="#999"
          textAlignVertical="top"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7fa",
    padding: 16,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#7c5cff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#7c5cff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  titleInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  bodyInput: {
    flex: 1,
    padding: 16,
    fontSize: 17,
    minHeight: 200,
  },
});