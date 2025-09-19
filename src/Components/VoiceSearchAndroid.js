import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, PermissionsAndroid, Platform } from "react-native";
import Voice from "@react-native-voice/voice";
import requestMicrophonePermission from './requestMicrophonePermission';

export default function VoiceSearchAndroid() {
  const [result, setResult] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        setResult(event.value[0]);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    try {
      await Voice.start("en-US"); // you can change to "hi-IN" for Hindi, etc.
    } catch (e) {
      console.error("Voice start error:", e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      console.error("Voice stop error:", e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        {result || "Say something..."}
      </Text>

      <TouchableOpacity
        onPress={isListening ? stopListening : startListening}
        style={{
          backgroundColor: isListening ? "red" : "blue",
          padding: 20,
          borderRadius: 50,
        }}
      >
        <Text style={{ color: "white" }}>
          {isListening ? "Stop" : "Start Talking"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
