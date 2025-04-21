
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { YStack, XStack, Button, Input, TextArea, Text } from "tamagui";
import { ArrowLeft, Save } from "@tamagui/lucide-icons";

type Note = {
  id: string;
  title: string;
  body: string;
  updated: number;
};

const NOTES_KEY = "NOTES_V1";

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
      style={{ flex: 1, backgroundColor: "#f7f7fa" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <YStack f={1} p="$4" pt="$8" bg="#f7f7fa">
        <XStack ai="center" jc="space-between" mb="$4">
          <Button
            size="$3"
            circular
            chromeless
            icon={ArrowLeft}
            onPress={() => router.back()}
            pressStyle={{ scale: 0.95 }}
          />
          <Button
            size="$3"
            icon={Save}
            bg="$accent"
            onPress={saveNote}
            disabled={saving}
            pressStyle={{ scale: 0.97 }}
          >
            Save
          </Button>
        </XStack>
        <Input
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          fontSize={22}
          fontWeight="700"
          mb="$3"
          bg="#fff"
          borderWidth={0}
          px="$3"
          py="$2"
          borderRadius={12}
        />
        <TextArea
          placeholder="Start typing your note..."
          value={body}
          onChangeText={setBody}
          fontSize={17}
          minHeight={180}
          bg="#fff"
          borderWidth={0}
          px="$3"
          py="$2"
          borderRadius={12}
          multiline
          flex={1}
        />
      </YStack>
    </KeyboardAvoidingView>
  );
}