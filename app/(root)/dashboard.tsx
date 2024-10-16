import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { useGetAllocatedStudents } from '@/services/queries/userQuery';
import { StudentDataProps } from '@/types/type';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [students, setStudents ] = useState<StudentDataProps[]>([])

  const { data, isError, isSuccess, error } =
  useGetAllocatedStudents();

  useEffect(() => {
    setStudents(data?.students)
  })

  return (
    <SafeAreaView className="bg-[#FEFBFF] flex-1">
      {/* Search Bar */}
      <View className="px-3 pb-[10.6px] flex-row justify-between gap-[10px] items-center">
        <TextInput
          className="bg-gray-200 w-[85%] px-4 py-2 rounded-[8px]"
          placeholder="Search a Student"
        />
        <Image source={require('@/assets/images/filtericon.png')} className="w-[20px] h-[20px]" />
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
        <View className="flex-row justify-between items-center mb-[12px] mt-[16px]">
          <Text className="text-lg font-semibold mb-2">All Students</Text>
          <Text className="text-[16px] font-medium text-[#9654F4] mb-2">See All</Text>
        </View>

        <FlatList
          data={students}
          keyExtractor={(item) => item._id}
          className='mb-[30px]'
          renderItem={({ item }) => (
            <Link href={`/(student)/dashboard?studentId=${String(item._id)}`} asChild>
              <TouchableOpacity className={`p-4 mb-4 rounded-lg bg-green-100'`}>
                <View className="flex-row gap-[12px] items-center">
                  <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <View className="flex-col">
                    <Text className="text-lg font-bold">{item.firstname}</Text>
                    <Text className="text-gray-500">Class: {item.academic.standard}</Text>
                    <Text className="text-gray-500">Level: {item.details.level.number}</Text>
                  </View>
                  
                </View>
              </TouchableOpacity>
            </Link>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
