import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/outline'; // Replace with an icon library of your choice

const topicsLearntToday = [
    {
      subject: 'maths',
      chapters: [
        {
          id: 1,
          title: 'sets, relations and functions',
          topics: [
            { id: 1, title: 'sets' },
            { id: 2, title: 'relations' },
            { id: 3, title: 'functions' },
            { id: 4, title: 'operations on sets' },
          ],
        },
        {
          id: 2,
          title: 'matrices and determinants',
          topics: [
            { id: 1, title: 'introduction to matrices' },
            { id: 2, title: 'operations on matrices' },
            { id: 3, title: 'transpose of a matrix' },
            { id: 4, title: 'determinants' },
            { id: 5, title: 'inverse of a matrix' },
          ],
        },
        // ...other chapters
      ],
    },
    {
      subject: 'physics',
      chapters: [
        {
          id: 1,
          title: 'mechanics',
          topics: [
            { id: 1, title: 'kinematics' },
            { id: 2, title: 'dynamics' },
            { id: 3, title: 'work, energy and power' },
            { id: 4, title: 'momentum and collision' },
            { id: 5, title: 'rotational motion' },
          ],
        },
        {
          id: 2,
          title: 'thermodynamics',
          topics: [
            { id: 1, title: 'thermal equilibrium and temperature' },
            { id: 2, title: 'Kinetic Theory of Gases' },
            { id: 3, title: 'Laws of Thermodynamics' },
            { id: 4, title: 'Heat Engines and Refrigerators' },
            { id: 5, title: 'Entropy and Disorder' },
          ],
        },
        // ...other chapters
      ],
    },
    {
      subject: 'chemistry',
      chapters: [
        {
          id: 1,
          title: 'Atomic Structure and Periodic Table',
          topics: [
            { id: 1, title: 'Fundamental particles of an atom' },
            { id: 2, title: "Atomic models (Bohr's model, Quantum mechanical model)" },
            { id: 3, title: 'Atomic orbitals and electronic configuration' },
            { id: 4, title: 'Periodic trends (atomic radius, ionization energy)' },
          ],
        },
        {
          id: 2,
          title: 'Chemical Bonding and Molecular Structure',
          topics: [
            { id: 1, title: 'Types of chemical bonds (ionic, covalent, metallic, hydrogen)' },
            { id: 2, title: 'Lewis structures and molecular geometry (VSEPR theory)' },
            { id: 3, title: 'Hybridization of atomic orbitals' },
            { id: 4, title: 'Intermolecular forces and their effects' },
          ],
        },
      ],
    },
  ];
  

const NewTopicLearnt = ({ setNewTopicLearnt }) => {
  const [activeSubject, setActiveSubject] = useState('maths');
  const [selectedChapter, setSelectedChapter] = useState<string | undefined>(undefined); // Specify type
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [chapterModal, setChapterModal] = useState(false);
  const [topicModal, setTopicModal] = useState(false);

  const chapterModalRef = useRef(null);
  const topicModalRef = useRef(null);

  const onChapterModalClose = useCallback(() => {
    setChapterModal(false);
  }, []);

  const onTopicModalClose = useCallback(() => {
    setTopicModal(false);
  }, []);

  useEffect(() => {
    const handleChapterModalOutsideClick = (e:any) => {
      if (chapterModalRef.current && !chapterModalRef.current.contains(e.target)) {
        onChapterModalClose();
      }
    };

    // Cleanup listener (not used in this example, add if needed)
    return () => {
      // removeEventListener here if needed
    };
  }, [onChapterModalClose, chapterModalRef]);

  return (
    <View style={styles.container}>
      {/* Subjects List */}
      <ScrollView horizontal style={styles.subjectList}>
        {topicsLearntToday.map((item) => (
          <TouchableOpacity
            key={item.subject}
            style={[styles.subjectItem, activeSubject === item.subject && styles.activeSubject]}
            onPress={() => setActiveSubject(item.subject)}
          >
            <Text style={styles.subjectText}>{item.subject}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Chapter Selection */}
      <View ref={chapterModalRef} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={selectedChapter}
          placeholder="Select the chapter"
          onFocus={() => setChapterModal(true)}
        />
        <ChevronDownIcon style={styles.icon} />
        {chapterModal && (
          <ScrollView style={styles.modal}>
            {topicsLearntToday
              .find((item) => item.subject === activeSubject)
              ?.chapters.map((chapter) => (
                <TouchableOpacity
                  key={chapter.id}
                  onPress={() => {
                    setSelectedChapter(chapter.title);
                    onChapterModalClose();
                  }}
                  style={styles.modalItem}
                >
                  <Text>{chapter.title}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </View>

      {/* Topic Selection */}
      <View ref={topicModalRef} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={selectedTopic}
          placeholder="Select the topic"
          onFocus={() => {
            if (selectedChapter) {
              setTopicModal(true);
            }
          }}
        />
        <ChevronDownIcon style={styles.icon} />
        {topicModal && selectedChapter && (
          <ScrollView style={styles.modal}>
            {topicsLearntToday
              .find((item) =>
                item.chapters.some((chapter) => chapter.title === selectedChapter)
              )
              ?.chapters.find((chapter) => chapter.title === selectedChapter)
              ?.topics.map((topic) => (
                <TouchableOpacity
                  key={topic.id}
                  onPress={() => {
                    setSelectedTopic(topic.title);
                    onTopicModalClose();
                  }}
                  style={styles.modalItem}
                >
                  <Text>{topic.title}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          // Handle submit action
        }}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  subjectList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  subjectItem: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeSubject: {
    backgroundColor: '#9654F4',
  },
  subjectText: {
    color: '#6a6a6a',
    fontSize: 16,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  modal: {
    maxHeight: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#9654F4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewTopicLearnt;
