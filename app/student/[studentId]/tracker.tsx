import React from 'react';
import { useState } from 'react';
import { Text  } from 'react-native';


const Tracker = () => {
  const [activeTab, setActiveTab] = useState('All');
  return (
   <Text>Here is Tracker</Text>
  );
};

export default Tracker;
