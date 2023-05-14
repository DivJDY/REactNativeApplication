import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
    lineHeight: 22,
    textAlign: 'center',
  },
  formContainer: {
    marginLeft: 50,
    marginTop: 20,
  },
  paraContainer: {
    marginLeft: 30,
    marginRight: 10,
  },
  input: {
    height: 45,
    width: 280,
    marginBottom: 20,
  },
  outlinedBtn: {
    height: 48,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 50,
    width: 280,
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    paddingLeft: 12,
    marginBottom: 10,
    color: 'red',
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
