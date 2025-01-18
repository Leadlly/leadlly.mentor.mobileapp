import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
  StyleSheet,
  SectionList,
  UIManager,
  LayoutAnimation,
} from "react-native";
import Input from "../../../../components/shared/Input";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/constants";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";
import { ChatMessage, ChatSection } from "@/types/type";
import { useGetChatMessages } from "@/services/queries/chatQuery";
import { useAppDispatch, useAppSelector } from "@/services/redux/hooks";
import { useLocalSearchParams } from "expo-router";
import { useSocket } from "@/contexts/SocketProvider";
import clsx from "clsx";
import { unreadMessages } from "@/services/redux/slices/unreadMessageSlice";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const chatInputFormSchema = z.object({
  message: z
    .string({ required_error: "Please type a message!" })
    .min(1, { message: "Please type a message!" }),
});

const ChatScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sections, setSections] = useState<ChatSection[]>([]);
  const [messageContainerHeight, setMessageContainerHeight] = useState(0);
  const [inputContainerHeight, setInputContainerHeight] = useState(0);

  const messageContainerRef = useRef<View>(null);
  const inputContainerRef = useRef<View>(null);
  const sectionListRef = useRef<SectionList>(null);

  const { studentId, student } = useLocalSearchParams<{
    studentId: string;
    student: string;
  }>();

  const studentData = JSON.parse(student);

  const { socket } = useSocket();

  const mentor = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof chatInputFormSchema>>({
    resolver: zodResolver(chatInputFormSchema),
    defaultValues: {
      message: "",
    },
  });

  const messageValue = form.watch("message");

  const messageContainerLayout = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.measure((x, y, width, height) => {
        setMessageContainerHeight(height);
      });
    }
  };
  const inputContainerLayout = () => {
    if (inputContainerRef.current) {
      inputContainerRef.current.measure((x, y, width, height) => {
        setInputContainerHeight(height);
      });
    }
  };

  const getDateSection = (date: Date): string => {
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisWeek(date)) {
      return format(date, "EEEE"); // Day name (Monday, Tuesday, etc.)
    } else if (isThisYear(date)) {
      return format(date, "MMMM d"); // Month and day (September 14)
    } else {
      return format(date, "MMMM d, yyyy"); // Full date for older messages
    }
  };

  const groupMessagesByDate = (msgs: ChatMessage[]): ChatSection[] => {
    // Group messages by date section
    const groupedMessages = [...msgs].reduce(
      (groups: { [key: string]: ChatMessage[] }, message) => {
        const section = getDateSection(new Date(message.timestamp));
        if (!groups[section]) {
          groups[section] = [];
        }
        groups[section].push(message);
        return groups;
      },
      {}
    );

    // Convert grouped messages to sections array
    return Object.entries(groupedMessages).map(([title, data]) => ({
      title,
      data,
    }));
  };

  useEffect(() => {
    const newSections = groupMessagesByDate(messages);
    setSections(newSections);
  }, [messages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (sections.length > 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [sections]);

  const scrollToBottom = () => {
    if (sectionListRef.current && sections.length > 0) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex: sections.length - 1,
        itemIndex: sections[sections.length - 1].data.length - 1,
        viewPosition: 1,
      });
    }
  };

  const handleScrollToIndexFailed = () => {
    // If scrolling fails, try again without animation
    const timer = setTimeout(() => {
      if (sectionListRef.current) {
        sectionListRef.current.scrollToLocation({
          animated: false,
          sectionIndex: sections.length - 1,
          itemIndex: sections[sections.length - 1].data.length - 1,
          viewPosition: 1,
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  };

  const { data, isLoading } = useGetChatMessages({
    mentorId: mentor?._id,
    studentId,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data && data.messages && data.messages.length > 0) {
      setMessages(data.messages);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (socket) {
      socket.on(
        "room_message",
        (data: { message: string; timestamp: string; sendBy: string }) => {
          setMessages((prevMessages) => [...prevMessages, data]);
          console.log("Received room message room event:", data);
        }
      );

      return () => {
        socket.off("room_message");
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.emit("open_chat", {
        userId: mentor?._id,
        room: studentData?.email,
      });
      dispatch(unreadMessages(0));
    }
  }, [socket, messages, mentor, dispatch, studentData]);

  const handleSendMessage = async (
    data: z.infer<typeof chatInputFormSchema>
  ) => {
    const formattedData = {
      message: data?.message,
      sender: mentor?._id,
      receiver: studentId,
      sendBy: mentor?._id,
      room: studentData?.email,
      timestamp: new Date(Date.now()),
      socketId: socket?.id,
    };

    try {
      if (socket) socket.emit("chat_message", formattedData);

      form.reset({ message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <View
      ref={messageContainerRef}
      className="flex-1 bg-white mb-16"
      onLayout={messageContainerLayout}
    >
      <SectionList
        ref={sectionListRef}
        sections={sections}
        renderItem={({ item }) => (
          <Pressable
            style={{
              marginHorizontal: 12,
              marginVertical: 4,
              maxWidth: "50%",
              marginLeft: item.sendBy === mentor?._id ? "auto" : undefined,
              marginRight: item.sendBy === studentId ? "auto" : undefined,
            }}
          >
            <View
              style={styles.boxShadow}
              className={clsx(
                "p-2.5 rounded-lg",
                item.sendBy === mentor?._id
                  ? "bg-primary items-end"
                  : "bg-white items-start"
              )}
            >
              <Text
                className={clsx(
                  "text-base font-mada-regular leading-5",
                  item.sendBy === mentor?._id ? "text-white" : "text-black"
                )}
              >
                {item.message}
              </Text>
              <Text
                className={clsx(
                  "text-xs  font-mada-regular",
                  item.sendBy === mentor?._id
                    ? "text-white"
                    : "text-secondary-text"
                )}
              >
                {format(item.timestamp, "hh:mm aaa")}
              </Text>
            </View>
          </Pressable>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View className="items-center justify-center bg-input-border mx-auto px-6 py-1.5 rounded-full my-1">
            <Text className="text-secondary-text text-[13px] font-mada-medium">
              {title}
            </Text>
          </View>
        )}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
        stickySectionHeadersEnabled={false}
        maintainVisibleContentPosition={{
          autoscrollToTopThreshold: 10,
          minIndexForVisible: 0,
        }}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={21}
        contentContainerStyle={{
          minHeight: messageContainerHeight - inputContainerHeight - 20,
          justifyContent: "flex-end",
        }}
      />

      <View
        ref={inputContainerRef}
        onLayout={inputContainerLayout}
        className="flex-row items-center gap-x-3 px-4 py-3 border-t border-gray-200 bg-white"
      >
        <View className="flex-1">
          <Controller
            name="message"
            control={form.control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Type a message here..."
                multiline={true}
                containerStyle="border-0 rounded-full"
                inputStyle="px-3 max-h-24"
              />
            )}
          />
        </View>

        <TouchableOpacity
          className={`p-3 rounded-full ${messageValue.length > 0 ? "bg-primary" : "bg-gray-300"}`}
          onPress={form.handleSubmit(handleSendMessage)}
          disabled={messageValue.length <= 0}
        >
          <Ionicons
            name="send"
            size={24}
            color={messageValue.length > 0 ? "white" : "#999"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default ChatScreen;
