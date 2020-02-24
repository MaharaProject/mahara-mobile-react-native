import {faHistory} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import styles from '../../../assets/styles/variables';
import {RootState} from '../../../reducers/rootReducer';
import {selectNumOfFiles} from '../../../reducers/uploadFilesReducer';
import {selectNumOfJEntries} from '../../../reducers/uploadJEntriesReducer';

/**
 * Used for PendingItems count
 */
const IconWithBadge = () => {
  const numOfJEntries = useSelector((state: RootState) =>
    selectNumOfJEntries(state)
  );
  const numOfFiles = useSelector((state: RootState) => selectNumOfFiles(state));
  const badgeCount = numOfFiles + numOfJEntries;
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <FontAwesomeIcon icon={faHistory} color={styles.colors.light} />
      {badgeCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
};

// TODO: example to use
// function HomeIconWithBadge(props) {
//   // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
//   return <IconWithBadge {...props} badgeCount={3} />;
// }

export default IconWithBadge;
