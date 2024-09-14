import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [input, setInput] = useState(''); 
  const [history, setHistory] = useState<string[]>([]); 

 
  const handlePress = (value: string) => { 
    if (value === '=') {
      try {
        if (input.includes('/0')) {
          setInput('Error');
        } else {
          const result = eval(input).toString();
          setInput(result);
          setHistory([...history, `${input} = ${result}`]); 
        }
      } catch (error) {
        setInput('Error');
      }
    } else if (value === 'C') {
      setInput(''); 
    } else if (value === '√') {
      try {
        const result = Math.sqrt(parseFloat(input));
        if (isNaN(result)) {
          setInput('Error');
        } else {
          setInput(result.toString());
          setHistory([...history, `√(${input}) = ${result}`]); 
        }
      } catch (error) {
        setInput('Error');
      }
    } else if (value === '^') {
      setInput((prev) => prev + '**'); 
    } else if (value === 'Clear History') {
      setHistory([]); 
      setInput(''); 
    } else {
      setInput((prev) => prev + value); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{input || '0'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Fila de botones 1 */}
        <CalculatorButton value="7" onPress={handlePress} />
        <CalculatorButton value="8" onPress={handlePress} />
        <CalculatorButton value="9" onPress={handlePress} />
        <CalculatorButton value="+" onPress={handlePress} />

        {/* Fila de botones 2 */}
        <CalculatorButton value="4" onPress={handlePress} />
        <CalculatorButton value="5" onPress={handlePress} />
        <CalculatorButton value="6" onPress={handlePress} />
        <CalculatorButton value="-" onPress={handlePress} />

        {/* Fila de botones 3 */}
        <CalculatorButton value="1" onPress={handlePress} />
        <CalculatorButton value="2" onPress={handlePress} />
        <CalculatorButton value="3" onPress={handlePress} />
        <CalculatorButton value="*" onPress={handlePress} />

        {/* Fila de botones 4 */}
        <CalculatorButton value="0" onPress={handlePress} />
        <CalculatorButton value="C" onPress={handlePress} />
        <CalculatorButton value="=" onPress={handlePress} />
        <CalculatorButton value="/" onPress={handlePress} />

        {/* Fila de botones para raíz cuadrada y potencia */}
        <CalculatorButton value="√" onPress={handlePress} />
        <CalculatorButton value="^" onPress={handlePress} />
        
        {/* Botón para borrar el historial */}
        <CalculatorButton value="Elim" onPress={handlePress} />
      </View>
      <ScrollView style={styles.historyContainer}>
        {history.length > 0 && <Text style={styles.historyTitle}>Historial:</Text>}
        {history.map((entry, index) => (
          <Text key={index} style={styles.historyEntry}>{entry}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const CalculatorButton = ({ value, onPress }: { value: string, onPress: (value: string) => void }) => (
  <TouchableOpacity style={styles.button} onPress={() => onPress(value)}>
    <Text style={styles.buttonText}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', 
    padding: 20,
  },
  displayContainer: {
    width: '100%',
    marginBottom: 10,
  },
  display: {
    fontSize: 48,
    color: '#333333',
    backgroundColor: '#ffffff',
    width: '100%',
    textAlign: 'right',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#007aff', 
    width: '20%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop: 20,
    flex: 1,
    width: '100%',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyEntry: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 5,
  },
});
