import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors } from '@/constants/constants';
import { PlanItem } from './PlanItem';

const planItems = [
  { title: 'Complete Math Assignment', status: 'completed' },
  { title: 'Read Science Chapter', status: 'in-progress' },
  { title: 'Practice Piano', status: 'not-started' },
];

const TodaysPlan = () => {
  return (
    <View
      style={{
        marginVertical: 20,
        padding: 16,
        backgroundColor: "#f5eafe",
        borderRadius: 16,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Today's Plan</Text>
        <Pressable>
          <Text style={{ color: colors.primary }}>View all</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 14, color: "#666" }}>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>
      <View style={{ marginTop: 10 }}>
        {planItems.map((item, index) => (
          <PlanItem key={index} title={item.title} status={item.status} />
        ))}
      </View>
    </View>
  );
};

export default TodaysPlan;
