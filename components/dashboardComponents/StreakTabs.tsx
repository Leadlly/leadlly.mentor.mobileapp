import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';
import SemiRadialChart from '@/components/charts/SemiRadialChart';

interface Subject {
    name: string;
    color: string;
    streakQuestions: number;
  }
  
 export const StreakTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Maths');
    const subjects: Subject[] = [
      { name: 'Maths', color: '#E3F2FD', streakQuestions: 75 },
      { name: 'Physics', color: '#E0F7FA', streakQuestions: 50 },
      { name: 'Chemistry', color: '#F3E5F5', streakQuestions: 60 },
    ];
  
    const getActiveSubject = (): Subject | undefined => {
      return subjects.find((subject) => subject.name === activeTab);
    };
  
    const activeSubject = getActiveSubject();
  
    return (
      <View className="bg-white p-4 rounded-lg">
        <View className="flex-row justify-between mb-4">
          {subjects.map((subject) => (
            <Pressable
              key={subject.name}
              onPress={() => setActiveTab(subject.name)}
              className={`py-2 px-4 rounded-full ${
                activeTab === subject.name ? 'border-2 border-blue-400' : ''
              }`}
              style={{ backgroundColor: subject.color }}
            >
              <Text className={`${activeTab === subject.name ? 'font-bold' : ''}`}>
                {subject.name}
              </Text>
            </Pressable>
          ))}
        </View>
  
        {/* SemiRadialChart displaying the active subject's streak */}
        {activeSubject && (
          <View className="items-center mt-4">
            <SemiRadialChart
              data={activeSubject.streakQuestions}
              color="#2196F3"
              bgColor="#E0E0E0"
              legendText={`${activeTab} Streak`}
            />
          </View>
        )}
      </View>
    );
  };