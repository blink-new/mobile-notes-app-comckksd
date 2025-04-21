
import { useEffect, useState } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { View, ScrollView, TouchableOpacity, Alert, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

type Note = {
  id: string;
  title: string;
  body: string;
  updated: number;
};

const NOTES_KEY = "NOTES_V1";

// Simple icon components that work on all platforms
const PlusIcon = ({ size = 24, color = "#fff" }) => (
  <Text style={{ color, fontSize: size, fontWeight: "bold" }}>+</Text>
);

const TrashIcon = ({ size = 20, color = "#7c5cff" }) => (
  <Text style={{ color, fontSize: size }}>🗑️</Text>
);

export default function NotesListScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    setLoading(true);
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    if (raw) {
      setNotes(JSON.parse(raw));
    }
    setLoading(false);
  }

  async function deleteNote(id: string) {
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  }

  function confirmDelete(id: string) {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteNote(id) },
    ]);
  }

  function goToEdit(note?: Note) {
    router.push({
      pathname: "/edit",
      params: note
        ? {
            id: note.id,
            title: note.title,
            body: note.body,
          }
        : {},
    });
  }

  // Use useFocusEffect for screen focus
  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => goToEdit()}
          activeOpacity={0.8}
        >
          <PlusIcon />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : notes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No notes yet</Text>
          <Text style={styles.emptySubtitle}>Tap + to create your first note!</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {notes
            .sort((a, b) => b.updated - a.updated)
            .map((note) => (
              <TouchableOpacity
                key={note.id}
                onPress={() => goToEdit(note)}
                activeOpacity={0.8}
                style={styles.noteCard}
              >
                <View style={styles.noteContent}>
                  <Text style={styles.noteTitle} numberOfLines={1}>
                    {note.title || "Untitled"}
                  </Text>
                  <Text style={styles.notePreview} numberOfLines={2}>
                    {note.body ? note.body.replace(/\n/g, " ") : "No content"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => confirmDelete(note.id)}
                  style={styles.deleteButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <TrashIcon />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}
    </View>
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
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2d2d2d",
    letterSpacing: -1,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7c5cff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7c5cff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginTop: 40,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2d2d2d",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  noteCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  noteContent: {
    flex: 1,
    paddingRight: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d2d2d",
  },
  notePreview: {
    fontSize: 15,
    color: "#6b6b6b",
    marginTop: 4,
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});