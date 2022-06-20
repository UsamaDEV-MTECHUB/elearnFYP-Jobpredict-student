import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  Image,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  Snackbar,
  Headline,
  Paragraph,
  FAB,
  Dialog,
} from 'react-native-paper';
import COLORS from '../../../consts/colors';
import base_url from '../../../consts/base_url';
import image_url from '../../../consts/image_url';
import STYLES from '../../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function ClassDetailScreen({route, navigation}) {
  const {item} = route.params;
  // console.log(item);

  // fabs
  const [state, setState] = useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
  // fabs end
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');
  const [userList, setUserList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [displayEmail, setdisplayEmail] = useState('none');

  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  // snackbar

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  // login api call
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  // check logins
  const [login, setlogin] = useState(1);

  // check logins end

  // rb sheets
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  // get object values from async storage
  const getData = async () => {
    await AsyncStorage.getItem('resturantDetail').then(value => {
      var x = JSON.parse(value);

      // splitString(x.fullname);
      setUsername(x.fullname);
      setUserid(x.id);
    });
  };
  // store objcet values in async storage end
  

  
  // add Video
  const apply = () => {
   
      setloading(1);
      setdisable(1);
      var InsertAPIURL = base_url + '/student/apply.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        j_id: item.id,
        student_id: userid,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setloading(0);
          setdisable(0);
          if(response[0].message=='already_applied') {
            alert('You have already applied for this job');
            navigation.navigate('MyTabs');
          }
          else {
            alert('You have successfully applied for this job');
            navigation.navigate('MyTabs');
          }
        
        })
        .catch(error => {
          alert('error' + error);
        });
    
  };
  useEffect(() => {
    getData()
  }, []);
  return (
    // <ScrollView>
    <View
      style={{
        // marginHorizontal: '4%',
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        height={400}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <Headline>Add User</Headline>
          <Icon
            name="close"
            onPress={() => {
              refRBSheet.current.close();
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <TextInput
            label="Full Name"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setFullname(e);
            }}
          />
          <TextInput
            label="Email"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setEmail(e);
            }}
          />
          <TextInput
            label="Password"
            mode="flat"
            activeOutlineColor={COLORS.primary}
            style={{backgroundColor: COLORS.white}}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setPassword(e);
            }}
          />
          <Button
            mode="contained"
            color={COLORS.primary}
            contentStyle={{
              padding: 9,
              paddingHorizontal: 100,
            }}
            style={{
              alignSelf: 'center',
              borderRadius: 40,
              top: 30,
            }}
            onPress={() => {
              addUser();
            }}
            loading={loading}
            disabled={disable}>
            Add
          </Button>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
        height={300}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
          }}>
          <Headline>Add Video</Headline>
          <Icon
            name="close"
            onPress={() => {
              refRBSheet2.current.close();
            }}
            size={24}
            color={COLORS.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <TextInput
            label="Add link"
            mode="flat"
            style={{backgroundColor: COLORS.white, borderRadius: 40}}
            activeOutlineColor={COLORS.primary}
            activeUnderlineColor={COLORS.primary}
            onChangeText={e => {
              setLink(e);
            }}
          />

          <Button
            mode="contained"
            color={COLORS.primary}
            contentStyle={{
              padding: 9,
              paddingHorizontal: 100,
            }}
            style={{
              alignSelf: 'center',
              borderRadius: 40,
              top: 30,
            }}
            onPress={() => {
              addVideo();
            }}
            loading={loading}
            disabled={disable}>
            Add
          </Button>
        </View>
      </RBSheet>
    

<SafeAreaView>
            <Snackbar
              duration={200}
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={
                {
                  // label: 'Undo',
                  // onPress: () => {
                  //   // Do something
                  // },
                }
              }
              style={{
                backgroundColor: snackbarValue.color,
                marginBottom: height / 4,
                zIndex: 999,
              }}>
              {snackbarValue.value}
            </Snackbar>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: '4%',
                marginHorizontal: '4%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                >
               
                <Icon
            name="arrow-left"
            
            size={24}
            color={COLORS.primary}
          /> 
                </TouchableOpacity>
              
              <Text
                style={{
                  fontSize: 17,
                
                }}>
                 Job Detail
              </Text>
            </View>
            <View
              style={{
                felxDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  width: '90%',
                }}>
                <FastImage
                  style={{
                    width: '100%',
                    height: 200,
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                    borderRadius: 10,
                    
                  }}

                  source={{
                    uri: image_url + '/' + item.image,

                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: 'column',
                // marginHorizontal: '5%',
                justifyContent: 'center',
              }}>
              <TextInput
                label="Class Name"
                mode="flat"
                style={{backgroundColor: COLORS.white, borderRadius: 40}}
                activeOutlineColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                value={item.name}
                disabled={true}
                onChangeText={e => {
                  setclassName(e);
                }}
              />
              <TextInput
                label="Class Description"
                mode="flat"
                style={{
                  backgroundColor: COLORS.white,
                  borderRadius: 40,
                  textAlignVertical: 'top',
                }}
                activeOutlineColor={COLORS.primary}
                activeUnderlineColor={COLORS.primary}
                multiline={true}
                clearTextOnFocus={true}
                value={item.description}
                disabled={true}
                onChangeText={e => {
                  setDescription(e);
                }}
              />
            </View>
            <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              marginBottom: 20,
              marginHorizontal: '5%',
              height: height / 2.7,
            }}>
            <Button
              mode="contained"
              color={COLORS.primary}
              contentStyle={{
                padding: 9,
                paddingHorizontal: 100,
              }}
              style={{
                alignSelf: 'center',
                borderRadius: 40,
              
                
              }}
              onPress={() => {
                // checkValue();
                apply();
              }}
              loading={loading}
              disabled={disable}>
              <Text style={{color: 'white', fontSize: 15,
            
            }}>Apply </Text>
            </Button>
            
          </View>
          </SafeAreaView>
    </View>
  );
}

export default ClassDetailScreen;
