import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? `${defaultValues.amount}` : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });
  const [isValid, setIsValid] = useState({
    amount: true,
    date: true,
    description: true,
  });
  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputValues((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: enteredValue,
      };
    });
    setIsValid((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: true,
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData);
    } else {
      setIsValid({
        amount: amountIsValid,
        date: dateIsValid,
        description: descriptionIsValid,
      });
      //Alert.alert('Invalid input', 'Please check your input values');
    }
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amount'
          style={styles.rowInput}
          invalid={!isValid.amount}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount,
          }}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          invalid={!isValid.date}
          textInputConfig={{
            keyboardType: 'numeric',
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!isValid.description}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
      {(!isValid.amount || !isValid.date || !isValid.description) && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data.
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText:{
    fontSize: 16,
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    fontWeight: 'bold',
    margin:3
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
