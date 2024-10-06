
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';


const StudentDashboard = () => {
  const { name } = useLocalSearchParams();

  return (
    <View>
      <Text>Welcome to {name}'s Dashboard</Text>
    </View>
  );
};

export default StudentDashboard;
