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
import { edit } from '../../../Theme/globalImages';
import ApplyBtn from '../../../Components/applyBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from '../../../Components/ImagePickerModal';

const ProfileDetails = () => {
  const buttonText = () => {
    return (
      <View style={styles.buttonContent}>
        <MaterialIcons
          name="delete-outline"
          size={w(6)}
          color={globalColors.white}
          style={styles.icon}
        />
        <Text
          style={{
            fontFamily: 'BaiJamjuree-Bold',
            color: globalColors.white,
            fontSize: f(1.8),
            textAlign: 'center',
          }}>
          Delete Account
        </Text>
      </View>
    );
  };

  const [profile, setProfile] = useState(
    'https://i.pinimg.com/564x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg',
  );
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:globalColors.backgroundshade,flex:1}}>
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
      <View style={styles.profileImgContainer}>
        <LinearGradient
          colors={[
            globalColors.purplemedium1,
            globalColors.purplemedium2,
            globalColors.purplemedium1,
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{height: w(25), marginBottom: h(18.5)}}>
          <View style={styles.crossContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('bottomnavigation', {screen: 'Home'})}>
              <MaterialIcons
                name="close"
                size={h(4)}
                color={globalColors.white}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignItems: 'center', justifyContent: 'space-between'}} onPress={openModal}>
            <Image
              resizeMode="contain"
              source={{uri: profile}}
              style={styles.userImage}
            />
           <Image resizeMode='contain' style={{position:'absolute',left:'55%',top:'55%',height:w(5),marginTop:w(5),tintColor:globalColors.black}} source={edit}/>
          </TouchableOpacity>
          <View style={styles.userNameContainer}>
            <Text
              style={{
                marginTop: h(1),
                fontSize: f(2),
                fontFamily: 'BaiJamjuree-Bold',
                color: globalColors.darkblack,
              }}>
              Priya Gupta
            </Text>
            <Text
              style={{
                fontSize: f(1.25),
                fontFamily: 'BaiJamjuree-Medium',
                color: globalColors.navypurple,
              }}>
              Graphic Designer
            </Text>
          </View>
          <View style={styles.horizontalRule} />
        </LinearGradient>
      </View>
      <View style={styles.userDetailsContanier}>
        <Text style={styles.userDetailsText}>
          <Text>Email Address</Text>{'   '}
          <Text style={styles.semidetails}>xyz@gmailcom</Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Address</Text>{'   '}
          <Text style={styles.semidetails}>kolhapur</Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Mobile No</Text>{'   '}
          <Text style={styles.semidetails}>7889887950</Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Text</Text>{'   '}
          <Text style={styles.semidetails}>Lorem12jsdhfijasiufauifh</Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Text</Text>{'   '}
          <Text style={styles.semidetails}>kjsdfhjadfidjk</Text>
        </Text>
        <View style={styles.horizontalRule2} />
      </View>
      <View style={styles.btnContainer}>
        <ApplyBtn buttonText={buttonText()} />
      </View>
      <ImagePickerModal
            visible={modalVisible}
            onClose={closeModal}
            setProfile={setProfile}
          />
    </ScrollView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  userImage: {
    borderRadius: h(10),
    borderWidth: h(0.4),
    height: w(27),
    width: w(27),
    borderColor: globalColors.white,
  },
  userNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  semidetails: {    fontSize: f(1.6),
    color: globalColors.grey, fontFamily: 'BaiJamjuree-Medium'},
  horizontalRule: {
    borderBottomColor: globalColors.purplegrey,
    borderBottomWidth: h(0.1),
    marginTop: h(2),
    marginBottom: h(1),
    marginHorizontal: h(3),
  },
  userDetailsContanier: {
    marginTop: h(2),
    marginHorizontal: h(2),
  },
  horizontalRule2: {
    borderBottomColor: globalColors.purplegrey,
    borderBottomWidth: h(0.1),
    marginVertical: h(1),
  },
  userDetailsText: {
    fontSize: f(1.6),
    fontFamily: 'BaiJamjuree-SemiBold',
    color: globalColors.darkblack,
    marginTop: h(2),
  },
  btnContainer: {
    marginHorizontal: w(20),
    marginVertical: h(3),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: w(2),
  },
  crossContainer: {
    alignItems: 'flex-end',
    marginHorizontal: h(2),
    marginTop: h(2),
  },
});
