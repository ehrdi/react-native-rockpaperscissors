import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Switch,
  TouchableOpacity,
  ActionSheetIOS,
  PixelRatio,
  ToastAndroid,
  Platform,
  Picker,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import SegmentedControlIOS from '@react-native-community/segmented-control';
import DateTimePicker from '@react-native-community/datetimepicker';

const Toast = props => {
  if (Platform.OS === 'android') {
    console.log('this is style: ', props.tStyle);
    if (props.tStyle === '') {
      return ToastAndroid.show('Hello toast', ToastAndroid.SHORT);
    }
    if (props.tStyle === 'gravity') {
      return ToastAndroid.showWithGravity(
        'Hello gravity toast',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    if (props.tStyle === 'gravityOffset') {
      return ToastAndroid.showWithGravityAndOffset(
        'Hello gravity and offset toast',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }
  return null;
};

export default function Profile() {
  // use route Hook to get the route params
  const route = useRoute();
  // use navigation Hook to get the navigation object
  const navigation = useNavigation();

  // use state Hook to define state for component
  const [name, setName] = useState('NO-NAME');
  const [email, setEmail] = useState('NO-EMAIL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [happy, setHappy] = useState(false);
  const [toastStyle, setToastStyle] = useState('gravity');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setName(route.params.name);
    setEmail(route.params.email);
    if (name === 'NO-NAME' && route.params.name.length <= 0) {
      navigation.navigate('Home');
    }
  });

  const onGoToGame = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Yes, go to Game!'],
          destructiveButtonIndex: 1,
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            navigation.navigate('Game');
          }
        },
      );
    } else {
      navigation.navigate('Game');
    }
  };

  const onShowShareSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showShareActionSheetWithOptions(
        {
          url: 'localhost:8081/Profile',
          message: 'This is the share message',
        },
        error => {
          if (error) console.log('error', error);
        },
        success => {
          if (success) console.log('success', success);
        },
      );
    }
  };

  const onChange = (e, selectedDate) => {
    if (selectedDate) setDate(selectedDate);
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <SegmentedControlIOS
        tintColor="green"
        style={{height: 30, width: '80%', marginBottom: 10}}
        values={['Show Name', 'Show Email']}
        selectedIndex={selectedIndex}
        onChange={event => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
      {selectedIndex === 0 && <Text>{name}</Text>}
      {selectedIndex === 1 && <Text>{email}</Text>}
      <Text>{happy ? 'Happy!' : 'Not Happy...'}</Text>
      <Switch
        value={happy}
        onValueChange={happy => setHappy(happy)}
        trackColor={{false: 'red', true: 'green'}}
      />

      <TouchableOpacity
        style={{
          height: 30,
          width: '80%',
          backgroundColor: 'red',
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => onGoToGame()}>
        <Text style={{fontSize: 16, textTransform: 'capitalize'}}>
          Go to Game
        </Text>
      </TouchableOpacity>

      <Button title="Show share sheet" onPress={() => onShowShareSheet()} />
      <Text>PixelRatio: {PixelRatio.get().toString()}</Text>

      <Button
        onPress={() => setShowDatePicker(!showDatePicker)}
        title={showDatePicker ? 'Hide Date Picker' : 'Show Date Picker'}
      />
      {showDatePicker && (
        <View style={{width: '100%'}}>
          <DateTimePicker
            testID="datePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </View>
      )}
      <Picker
        selectedValue="js"
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) =>
          console.log(itemIndex, itemValue)
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </ScrollView>
  );
}
