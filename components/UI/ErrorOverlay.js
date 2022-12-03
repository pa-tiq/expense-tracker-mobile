import { View, StyleSheet, Text } from 'react-native';
import Button from './Button';
import { GlobalStyles } from '../../constants/styles';

function ErrorOverlay({message, onConfirm}) {
  return (
    <View style={styles.rootContainer}>
      <Text style={[styles.text, styles.title]}>An error occurred</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    padding:24,
    backgroundColor:GlobalStyles.colors.primary700
  },
  text:{
    textAlign:'center',
    marginBottom:8,
    color:'white'
  },
  title:{
    fontSize:20,
    fontWeight:'bold'
  }
});