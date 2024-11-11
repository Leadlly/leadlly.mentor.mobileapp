import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { ISubject, TTrackerProps } from '@/types/type';
import ChapterRevisionDateTable from './ChapterOverviewTable';
import SubjectOverview from './SubjectOveview';

const Loader = () => {
  const loading_animation = useRef<LottieView>(null);
  
  return (
    <View className="flex-1 justify-center items-center bg-white min-h-screen flex">
      <LottieView
        ref={loading_animation}
        source={require("@/assets/dashboard_loading.json")}
        autoPlay
        loop={true}
        style={{
          width: "100%",
          height: "10%",
        }}
      />
      <Text className="text-lg font-mada-medium text-gray-600 mt-4">
        Loading student data...
      </Text>
    </View>
  );
};

const TrackerComponent = ({
  trackerData,
  activeSubject,
  userSubjects,
}: {
  trackerData: { data: TTrackerProps[] } | null; // Adjust type if trackerData is nested
  userSubjects: ISubject[] | undefined;
  activeSubject: string;
}) => {
  useEffect(() => {
    console.log('TrackerComponent mounted');
    console.log('trackerData:', trackerData);
    console.log('activeSubject:', activeSubject);
    console.log('userSubjects:', userSubjects);
  }, [trackerData, activeSubject, userSubjects]);

  if (!trackerData || !trackerData.data) {
    console.log('No tracker data, showing loader');
    return <Loader />;
  }

  const filteredSubject = userSubjects?.find(
    (subject) => subject.name === activeSubject
  );
  
  console.log('Filtered subject:', filteredSubject);

  return (
    <View style={{ 
    }}>
      {filteredSubject && (
        <SubjectOverview subject={filteredSubject} />
      )}

      {trackerData.data.length > 0 ? (
        <View style={{}}>
          {trackerData.data.map((item) => (
            <ChapterRevisionDateTable key={item._id} item={item} />
          ))}
        </View>
      ) : (
        <View style={{ 
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          
        }}>
          <Text style={{ 
            fontSize: 18,
            color: '#666',
            fontWeight: '600'
          }}>
            No Chapter to track!
          </Text>
        </View>
      )}
    </View>
  );
};

export default TrackerComponent;
