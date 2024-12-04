import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface MultiUrlInputProps {
  urls: string[];
  onUrlsChange: (urls: string[]) => void;
}

const MultiUrlInput: React.FC<MultiUrlInputProps> = ({
  urls,
  onUrlsChange,
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  const handleInputChange = (text: string) => {
    setCurrentUrl(text);
  };

  const addUrl = () => {
    const trimmedUrl = currentUrl.trim();

    if (trimmedUrl) {
      console.log("3");
      if (!urls.some((url) => url === trimmedUrl)) {
        onUrlsChange([...urls, trimmedUrl]);
        setCurrentUrl("");
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === " ") {
      addUrl();
    }
  };
  console.log(urls);

  const removeUrl = (urlToRemove: string) => {
    onUrlsChange(urls.filter((url) => url !== urlToRemove));
  };

  const UrlItem = ({
    item,
    onRemove,
  }: {
    item: string;
    onRemove: (url: string) => void;
  }) => (
    <TouchableOpacity
      onPress={() => onRemove(item)}
      className="flex-row justify-between w-16 items-center border border-gray-200 p-1 px-2 rounded-lg mb-2 space-x-2"
    >
      <Text className="flex-1" numberOfLines={1}>
        {item.length > 15 ? item.substring(0, 15) + "..." : item}
      </Text>
      <View className="ml-2">
        <Text className="text-gray-500 font-bold">×</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 w-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className=" w-full">
        <ScrollView
          className="max-h-50 flex flex-row w-full "
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
          }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          {urls.length > 0 ? (
            urls.map((url, index) => (
              <UrlItem
                key={`${url}-${index}`}
                item={url}
                onRemove={removeUrl}
              />
            ))
          ) : (
            <Text className="text-gray-400 p-2">No URLs added yet</Text>
          )}
        </ScrollView>
      </View>
      <TextInput
        value={currentUrl}
        onChangeText={handleInputChange}
        onKeyPress={handleKeyPress}
        onSubmitEditing={addUrl}
        placeholder="Enter URLs (space to add)"
        className="border border-gray-300 p-2.5 rounded-lg bg-white mb-4"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        returnKeyType="done"
      />
    </KeyboardAvoidingView>
  );
};

export default MultiUrlInput;
