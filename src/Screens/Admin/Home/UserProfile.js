import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { globalColors } from '../../../Theme/globalColors';
import { f, h, w } from 'walstar-rn-responsive';
import {
  edit,
  email,
  phone,
  upload,
  userprofileedit
} from '../../../Theme/globalImages';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from '../../../Components/ImagePickerModal';

const UserProfile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(
    'https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg',
  );
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <LinearGradient
        colors={[
          globalColors.purplemedium1,
          globalColors.purplemedium2,
          globalColors.purplemedium1,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{height: h(4)}}>
        <StatusBar backgroundColor="transparent" translucent />
      </LinearGradient>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[
            globalColors.purplemedium1,
            globalColors.purplemedium2,
            globalColors.purplemedium1,
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{flex: 1}}>
          <View style={styles.crossContainer}>
            <Text style={styles.myprofile}>My Profile</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: w(0)}}
              onPress={() =>
                navigation.navigate('bottomnavigation', {
                  screen: 'Home',
                })
              }>
              <MaterialIcons
                name="close"
                size={h(4)}
                color={globalColors.white}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: globalColors.backgroundshade,
              marginTop: h(8),
              borderTopLeftRadius: h(5),
              borderTopRightRadius: h(5),
            }}>
            <TouchableOpacity onPress={openModal}>
              <Image
                resizeMode="contain"
                source={{uri: profile}}
                style={styles.userImage}
              />
            <Image resizeMode='contain' style={{position:'absolute',left:'55%',width:w(5),height:w(5),marginTop:w(5),tintColor:globalColors.black}} source={edit}/>
            </TouchableOpacity>
            <View>
              <View style={styles.userNameContainer}>
                <Text
                  style={{
                    marginTop: h(0.5),
                    fontSize: f(2.3),
                    fontFamily: 'BaiJamjuree-Bold',
                    color: globalColors.darkblack,
                  }}>
                  Priya Gupta
                </Text>
                <Text
                  style={{
                    fontSize: f(1.55),
                    fontFamily: 'BaiJamjuree-Medium',
                    color: globalColors.navypurple,
                  }}>
                  Graphic Designer
                </Text>
              </View>
              <View style={styles.SecondRow}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    resizeMode="contain"
                    style={{
                      marginRight: w(1),
                      width: w(2.8),
                      height: w(2.8),
                      tintColor: globalColors.darkpurple,
                    }}
                    source={email}
                  />
                  <Text style={styles.Text3}>Priyagupta@gmail.com</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    resizeMode="contain"
                    style={{
                      marginRight: w(1),
                      width: w(2.45),
                      width: w(2.8),
                      height: w(2.8),
                      tintColor: globalColors.darkpurple,
                    }}
                    source={phone}
                  />
                  <Text style={styles.Text3}>+91 845754854</Text>
                </View>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '12%',
                  marginTop: h(4),
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.substxt}>100</Text>
                  <Text style={styles.substitletxt}>Portfolio</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.substxt}>100</Text>
                  <Text style={styles.substitletxt}>Followers</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.substxt}>100</Text>
                  <Text style={styles.substitletxt}>Following</Text>
                </View>
              </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: h(3),
                  justifyContent: 'space-between',
                  marginHorizontal: '07%',
                  marginBottom: h(3),
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: w(10),
                    paddingVertical: w(2),
                    backgroundColor: globalColors.white,
                    borderRadius: w(2.5),
                    elevation: 2,
                  }}>
                  <Text style={styles.btntxtes}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: w(10),
                    paddingVertical: w(2),
                    backgroundColor: globalColors.white,
                    borderRadius: w(2.5),
                    elevation: 2,
                  }}>
                  <Text style={styles.btntxtes}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: globalColors.white,
                    paddingHorizontal: w(3),
                    paddingVertical: w(2),
                    elevation: 2,
                    borderRadius: w(2.5),
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      width: w(5),
                      height: w(5),
                      tintColor: globalColors.commonpink,
                    }}
                    source={userprofileedit}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{
                  marginTop: h(1),
                  flexDirection: 'row',
                  backgroundColor: globalColors.commonlightpink,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: w(1.5),
                  marginHorizontal: w(5),
                  paddingHorizontal: w(3),
                  borderRadius: w(2),
                }}>
                <Text
                  style={{
                    fontSize: f(1.7),
                    fontFamily: 'BaiJamjuree-SemiBold',
                    color: globalColors.white,
                  }}>
                  Upload Resume
                </Text>
                <Image
                  resizeMode="contain"
                  style={{width: w(4), height: w(4)}}
                  source={upload}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'BaiJamjuree-Bold',
                  color: globalColors.black,
                  fontSize: f(1.6),
                  paddingVertical: h(0.5),
                  paddingStart: w(5.5),
                  marginTop: w(3),
                }}>
                About Me
              </Text>
              <Text
                style={{
                  fontSize: f(1.35),
                  fontFamily: 'BaiJamjuree-Regular',
                  backgroundColor: globalColors.white,
                  borderRadius: w(3),
                  marginHorizontal: w(5),
                  marginBottom: w(5),
                  elevation: 2,
                  paddingHorizontal: w(3.5),
                  paddingVertical: w(2),
                  color: globalColors.darkblack,
                }}>
                FolloweIt is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed.
              </Text>
            </View>
          </View>
          <ImagePickerModal
            visible={modalVisible}
            onClose={closeModal}
            setProfile={setProfile}
          />
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  userImage: {
    borderRadius: h(10),
    borderWidth: h(0.4),
    height: w(23),
    width: w(23),
    borderColor: globalColors.white,
    position: 'absolute',
    top: w(-11),
    alignSelf: 'center',
  },
  userNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: h(6.5),
  },

  crossContainer: {
    marginHorizontal: h(2),
    marginTop: h(2),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  myprofile: {
    fontSize: f(2.3),
    fontFamily: 'BaiJamjuree-SemiBold',
    color: globalColors.white,
  },
  SecondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: h(2),
    justifyContent: 'space-between',
    marginHorizontal: '8%',
  },
  Text3: {
    marginEnd: w(4),
    color: globalColors.darkblack,
    fontFamily: 'BaiJamjuree-Regular',
    fontSize: f(1.55),
  },
  substxt: {
    color: globalColors.darkblack,
    fontFamily: 'BaiJamjuree-SemiBold',
    fontSize: f(1.55),
  },
  substitletxt: {
    color: globalColors.suvagrey,
    fontFamily: 'BaiJamjuree-Medium',
    fontSize: f(1.55),
  },
  btntxtes: {
    fontSize: f(1.6),
    fontFamily: 'BaiJamjuree-SemiBold',
    color: globalColors.commonpink,
  },
});
