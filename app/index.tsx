
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, YStack, XStack, Button, Input } from "tamagui";
import { Plus, Trash2 } from "@tamagui/lucide-icons";

type Note = {
  id: string;
  title: string;
  body: string;
  updated: number;
};

const NOTES_KEY = "NOTES_V1";

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

  useEffect(() => {
    const unsubscribe = router.addListener("focus", loadNotes);
    return unsubscribe;
  }, [router]);

  return (
    <YStack f={1} bg="$background" p="$4" pt="$8">
      <XStack ai="center" jc="space-between" mb="$4">
        <Text fontFamily="$heading" fontSize={32} fontWeight="700" color="$color" letterSpacing={-1}>
          Notes
        </Text>
        <Button
          size="$4"
          circular
          bg="$accent"
          icon={Plus}
          onPress={() => goToEdit()}
          pressStyle={{ scale: 0.95 }}
        />
      </XStack>
      {loading ? (
        <Text color="$color" fontSize={18} ta="center" mt="$8">
          Loading...
        </Text>
      ) : notes.length === 0 ? (
        <YStack ai="center" mt="$10">
          <Text color="$color" fontSize={20} fontWeight="600" mb="$2">
            No notes yet
          </Text>
          <Text color="$color" fontSize={16} opacity={0.7}>
            Tap + to create your first note!
          </Text>
        </YStack>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {notes
            .sort((a, b) => b.updated - a.updated)
            .map((note) => (
              <TouchableOpacity
                key={note.id}
                onPress={() => goToEdit(note)}
                activeOpacity={0.8}
                style={{
                  marginBottom: 18,
                  borderRadius: 18,
                  backgroundColor: "#f7f7fa",
                  shadowColor: "#000",
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                  elevation: 2,
                  padding: 18,
                }}
              >
                <XStack ai="center" jc="space-between">
                  <YStack f={1} pr="$2">
                    <Text fontSize={18} fontWeight="700" color="#2d2d2d" numberOfLines={1}>
                      {note.title || "Untitled"}
                    </Text>
                    <Text fontSize={15} color="#6b6b6b" numberOfLines={2} mt="$1">
                      {note.body ? note.body.replace(/\n/g, " ") : "No content"}
                    </Text>
                  </YStack>
                  <Button
                    size="$2"
                    circular
                    chromeless
                    icon={Trash2}
                    onPress={() => confirmDelete(note.id)}
                    pressStyle={{ scale: 0.9 }}
                  />
                </XStack>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}
    </YStack>
  );
}