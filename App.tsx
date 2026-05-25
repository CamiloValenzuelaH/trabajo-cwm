import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TextInput, 
  Button, 
  Switch, 
  StyleSheet, 
  Keyboard 
} from 'react-native';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [inputValue, setInputValue] = useState('');
  const [savedData, setSavedData] = useState<string[]>([]);

  const toggleTheme = () => setIsDarkMode(previousState => !previousState);

  const handleSave = () => {
    if (inputValue.trim() !== '') {
      setSavedData([...savedData, inputValue]);
      setInputValue('');
      Keyboard.dismiss();
    }
  };

  const currentTheme = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, currentTheme.background]}>
      <View style={styles.header}>
        <Text style={[styles.title, currentTheme.text]}>
          Tema: {isDarkMode ? 'Oscuro' : 'Claro'}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={isDarkMode}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={[styles.label, currentTheme.text]}>Ingresa un dato:</Text>
        <TextInput
          style={[styles.input, currentTheme.input, currentTheme.text]}
          onChangeText={setInputValue}
          value={inputValue}
          placeholder="Escribe cualquier cosa..."
          placeholderTextColor={isDarkMode ? '#999' : '#666'}
        />
        <Button 
          title="Guardar en Memoria" 
          onPress={handleSave} 
          color={isDarkMode ? '#f5dd4b' : '#007AFF'} 
        />
      </View>

      <View style={styles.dataContainer}>
        <Text style={[styles.subtitle, currentTheme.text]}>Datos Guardados:</Text>
        {savedData.length === 0 ? (
          <Text style={[styles.emptyText, currentTheme.text]}>No hay datos aún.</Text>
        ) : (
          savedData.map((item, index) => (
            <View key={index} style={[styles.dataItem, currentTheme.dataItem]}>
              <Text style={currentTheme.text}>
                {index + 1}. {item}
              </Text>
            </View>
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  dataContainer: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  emptyText: {
    fontStyle: 'italic',
  },
  dataItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  }
});

const lightStyles = StyleSheet.create({
  background: {
    backgroundColor: '#F5F5F5',
  },
  text: {
    color: '#333333',
  },
  input: {
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  dataItem: {
    backgroundColor: '#E0E0E0',
  }
});

const darkStyles = StyleSheet.create({
  background: {
    backgroundColor: '#121212',
  },
  text: {
    color: '#FFFFFF',
  },
  input: {
    borderColor: '#333333',
    backgroundColor: '#1E1E1E',
  },
  dataItem: {
    backgroundColor: '#1E1E1E',
  }
});