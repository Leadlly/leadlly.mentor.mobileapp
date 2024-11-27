import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/constants";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! Dhruv Rawal, I have a doubt.",
      isOutgoing: false,
      time: "9:41 AM",
      sender: "You",
    },
    {
      text: "Hey! John Musk, we can address this during the meeting, we can maintain focus on the topic at hand and work towards achieving our objectives efficiently.",
      isOutgoing: true,
      time: "9:41 AM",
      sender: "Mentor",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        { text: newMessage, isOutgoing: true, time, sender: "You" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white pb-20 w-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 py-10 w-full"
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              className={`flex-row w-full items-center ${
                item.isOutgoing ? "justify-end" : "justify-start"
              } mb-4 px-4`}
            >
              {!item.isOutgoing && (
                <View className="w-9 h-9 rounded-full bg-gray-300 mr-2 items-center justify-center">
                  <Text className="text-white font-bold text-base">
                    {item.sender[0].toUpperCase()}
                  </Text>
                </View>
              )}
              <View
                className={`rounded-lg p-3 max-w-[70%] ${
                  item.isOutgoing ? "bg-primary" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`${item.isOutgoing ? "text-white" : "text-black"}`}
                >
                  {item.text}
                </Text>
                <Text
                  className={`text-xs mt-1 ${
                    item.isOutgoing ? "text-white opacity-80" : "text-gray-500"
                  }`}
                >
                  {item.time}
                </Text>
              </View>
              {item.isOutgoing && (
                <View className="w-9 h-9 rounded-full bg-gray-300 ml-2 items-center justify-center">
                  <Text className="text-white font-bold">
                    {item.sender[0].toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
          )}
        />

        <View className="flex-row items-center px-4 py-3 border-t border-gray-200 absolute bottom-0 left-0 right-0 bg-white">
          <TextInput
            className="flex-1 h-12 bg-gray-100 rounded-full px-4 mr-3"
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
          />
          <TouchableOpacity
            className={`p-3 rounded-full ${newMessage.trim() ? "bg-primary" : "bg-gray-300"}`}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Ionicons
              name="send"
              size={24}
              color={newMessage.trim() ? "white" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
