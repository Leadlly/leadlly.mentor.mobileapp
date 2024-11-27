import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { colors } from "@/constants/constants";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "tutor" },
    { id: 2, text: "Hi there! How can I help you today?", sender: "student" },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: "student" },
      ]);
      setMessage("");
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 p-4">
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`${
              msg.sender === "student" ? "self-end" : "self-start"
            } p-3 rounded-2xl max-w-[80%] mb-3`}
            style={{
              backgroundColor: msg.sender === "student" ? colors.primary : "#E8E8E8",
            }}
          >
            <Text
              className={`${
                msg.sender === "student" ? "text-white" : "text-black"
              } font-mada`}
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      
      <View className="flex-row p-4 border-t border-inputBorder bg-white">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          className="flex-1 border border-inputBorder rounded-full px-4 py-2 mr-2 font-mada"
        />
        <TouchableOpacity
          onPress={handleSend}
          className="bg-primary rounded-full p-2.5 justify-center items-center"
        >
          <Text className="text-white font-mada-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;


