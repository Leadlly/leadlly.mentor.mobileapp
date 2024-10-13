import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { colors } from '@/constants/constants';
import DailyReport from '@/components/dashboardComponents/DailyReport';
import { useState } from 'react';
import SemiRadialChart from '@/components/charts/SemiRadialChart';
import { PlanItem } from '@/components/dashboardComponents/PlanItem';
import { WeeklyMood } from '@/components/dashboardComponents/WeeklyMood';
import { StreakTabs } from '@/components/dashboardComponents/StreakTabs';


const planItems = [
  { title: 'Limits', status: 'Completed' },
  { title: 'Continuity', status: 'Completed' },
  { title: 'Differentiability', status: 'Completed' },
  { title: 'Electromagnetic Induction', status: 'Incomplete' },
  { title: 'Chemical Bonding', status: 'Incomplete' },
];

const StudentDashboard = () => {
  return (
    <ScrollView style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 16 , marginBottom: 50}} className=''>
      {/* Today's Plan */}
      <View style={{ marginVertical: 20, padding: 16, backgroundColor: '#f5eafe', borderRadius: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Today’s Plan</Text>
          <Pressable>
            <Text style={{ color: colors.primary }}>View all</Text>
          </Pressable>
        </View>
        <Text style={{ fontSize: 14, color: '#666' }}>
           {new Date().toLocaleDateString('en-US', {
             weekday: 'long',
             day: 'numeric',
             month: 'short',
             year: 'numeric',
           })}
         </Text>
        <View style={{ marginTop: 10 }}>
          {planItems.map((item, index) => (
            <PlanItem key={index} title={item.title} status={item.status} />
          ))}
        </View>
      </View>

      <DailyReport />

      {/* Weekly Mood */}
      <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 16, borderColor: '#ddd', borderWidth: 1, marginBottom: 20 }}>
        <WeeklyMood />
      </View>

      {/* Streak Questions */}
      <View style={{ padding: 16, backgroundColor: '#fff', borderRadius: 16, borderColor: '#ddd', borderWidth: 1, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Streak Questions</Text>
          <Text style={{ color: colors.primary }}>Total: 30</Text>
        </View>
        <StreakTabs />
      </View>
    </ScrollView>
  );
};


export default StudentDashboard;
