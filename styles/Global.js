import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#FFE082',
  },
  brand: {
    textAlign: 'center',
    fontFamily: 'caveat-regular',
    fontSize: 44,
  },
  hr: {
    borderBottomColor: '#FFCD41',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  titleText: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  textCredentialsInput: {
    marginTop: 15,
  },
  socialNetwork: {
    marginVertical: 5,
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  socialNetworkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});
