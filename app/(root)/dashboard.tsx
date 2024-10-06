import React from 'react';
import { View, Text, ScrollView, TextInput, Image, FlatList,TouchableOpacity  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link } from 'expo-router';

const students = [
  { name: 'Abhinav Mishra', class: 11, level: 'Excellent', color: 'bg-green-100', progressColor: 'bg-green-500' },
  { name: 'Roger Lubin', class: 12, level: 'Optimal', color: 'bg-yellow-100', progressColor: 'bg-yellow-500' },
  { name: 'Charlie Rhiel Madsen', class: 12, level: 'Inefficient', color: 'bg-red-100', progressColor: 'bg-red-500' },
  { name: 'Chance Stanton', class: 11, level: 'Excellent', color: 'bg-green-100', progressColor: 'bg-green-500' },
  { name: 'Chance Bay', class: 11, level: 'Excellent', color: 'bg-green-100', progressColor: 'bg-green-500' },
  { name: 'Chance Jhon', class: 11, level: 'Excellent', color: 'bg-green-100', progressColor: 'bg-green-500' },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  return (
    <SafeAreaView className="bg-[#FEFBFF] flex-1">
      {/* Header */}
      {/* <View className="px-4 pt-0 pb-[16px] flex-row justify-between items-center">
        <Text className="text-[26px] font-bold">Dashboard</Text>
        <View className="flex-row gap-[16px] items-center">
          <FontAwesome name="bell" size={24} color="black" className="mr-4" />
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            className="w-8 h-8 rounded-full"
          />
        </View>
      </View> */}

      {/* Search Bar */}
      <View className="px-3  pb-[10.6px] flex-row justify-between gap-[10px] items-center">
        <TextInput
          className="bg-gray-200 w-[85%] px-4 py-2 rounded-[8px]"
          placeholder="Search a Student"
        />
        <Image source={require('@/assets/images/filtericon.png')} className='w-[20px] h-[20px]'/>
      </View>

      {/* Filter Tabs */}
      <View className="flex-row px-4 gap-2 justify-between">
      {['All', 'Excellent', 'Optimal', 'Inefficient'].map((tab) => (
        <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
          <Text
            className={`rounded-[5.1px] bg-white px-[16px] py-[4px] ${
              activeTab === tab ? 'text-black' : 'text-gray-500'
            }`}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

      {/* Students List */}
      <View className="flex-1 px-4">
        <View className='flex-row justify-between items-center mb-[12px] mt-[16px]'>
        <Text className="text-lg font-semibold mb-2">All Students</Text>
        <Text className="text-[16px] font-medium text-[#9654F4] mb-2">See All</Text>
        </View>
        
        <FlatList
          data={students}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Link href={`/(student)/dashboard?name=${item.name}`}>
            <View className={`p-4 mb-4 rounded-lg ${item.color}`}>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <View>
                    <Text className="text-lg font-bold">{item.name}</Text>
                    <Text className="text-gray-500">Class: {item.class}</Text>
                  </View>
                </View>
                <View className="items-center">
                  <Text>Level:</Text>
                  <View className="w-24 h-2 rounded-full bg-gray-300">
                    <View className={`h-2 rounded-full ${item.progressColor}`} />
                  </View>
                </View>
              </View>
            </View>
            </Link>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
