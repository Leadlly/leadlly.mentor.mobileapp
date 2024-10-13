import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { colors } from '@/constants/constants';
import DailyReport from '@/components/dashboardComponents/DailyReport';
import { useState } from 'react';
import SemiRadialChart from '@/components/charts/SemiRadialChart';
export const PlanItem = ({ title, status }: { title: string; status: string }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
        <Text style={{ fontSize: 14 }}>{title}</Text>
        <Text style={{ color: status === 'Completed' ? 'green' : 'red' }}>{status}</Text>
      </View>
    );
  };
