import React from 'react';
import { useState } from 'react';
import { Text  } from 'react-native';


const ErrorBook = () => {
  const [activeTab, setActiveTab] = useState('All');
  return (
   <Text>Here is Errorbook</Text>
  );
};

export default ErrorBook;
