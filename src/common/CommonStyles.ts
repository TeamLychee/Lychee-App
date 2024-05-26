// CommonStyles.ts
import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

const CommonStyles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  safearea: {
    alignItems: 'center',
    flex: 1,
  },

  section: {
    zIndex: 2,
    width: '100%',
  },

  generalBox: {
    backgroundColor: Colors.white,
    marginHorizontal: '5%',
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowColor: '#000000',
    elevation: 8,
    maxHeight: '91%',
  },

  shadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
    shadowColor: '#000000',
  }
});

export default CommonStyles;
