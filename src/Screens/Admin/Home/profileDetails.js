import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { globalColors } from '../../../Theme/globalColors';
import { f, h, w } from 'walstar-rn-responsive';
import { edit } from '../../../Theme/globalImages';
import ApplyBtn from '../../../Components/applyBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ImagePickerModal from '../../../Components/ImagePickerModal';
import { useSelector , useDispatch } from 'react-redux';
import { fetchProfile } from '../../../Redux/Slices/ProfileSlice';
import { 
  deleteAdmin,
  deleteCandidate,
  deleteEmployer,
  deleteConsultant,
  deleteInstitute,
  deleteGram ,
  clearDeleteState 
} from '../../../Redux/Slices/deleteSlice'; // ← ADDED
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmDeleteModal from '../../../Components/SuccessModal';
import { baseurl } from '../../../Utils/API';

const ProfileDetails = () => {

    const id = useSelector(state => state?.Permissions.userId);
    const deleteState = useSelector(state => state.delete); 

      const dispatch = useDispatch();
  
      useEffect(()=>{
        if (id != null) {
          dispatch(fetchProfile(id))
        }
      },[id])
      
        const candidates = useSelector(state => state.Profile.ProfileDetails);
        const loading = useSelector(state => state.Profile.loading);
        const [deleteModalVisible, setDeleteModalVisible] = useState(false);
        const [selectedRole, setSelectedRole] = useState(null);

        const roles = [
          { role_id: 1, role: "admin", action: deleteAdmin }, 
          { role_id: 2, role: "candidate", action: deleteCandidate }, 
          { role_id: 3, role: "employer", action: deleteEmployer }, 
          { role_id: 4, role: "consultant", action: deleteConsultant }, 
          { role_id: 5, role: "institute", action: deleteInstitute },
          { role_id: 6, role: "gram", action: deleteGram } 
        ];

        const handleDeleteAccount = () => {
          const userRole = roles.find(role => role.role_id === candidates?.user?.role_id);

          if (!userRole) {
            Alert.alert("Error", "Unable to determine your account type.");
            return;
          }

          setSelectedRole(userRole);
          setDeleteModalVisible(true);
        };

        useEffect(() => {
          if (deleteState.success && deleteState.deletedRole) {
            console.log(`${deleteState.deletedRole} account deleted successfully`);

            const clearStorageAndNavigate = async () => {
              try {
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('user');
                console.log('AsyncStorage cleared successfully');

                Alert.alert(
                  "Success",
                  `Your ${deleteState.deletedRole} account has been deleted successfully.`,
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.replace('Auth');
                        dispatch(clearDeleteState()); // ✅ reset after success
                      }
                    }
                  ]
                );
              } catch (storageError) {
                console.error('Error clearing AsyncStorage:', storageError);
                navigation.replace('Auth');
                dispatch(clearDeleteState()); // ✅ reset anyway
              }
            };

            clearStorageAndNavigate();
          }

          if (deleteState.error) {
            console.log("Delete error:", deleteState.error);
            Alert.alert(
              "Error",
              `Failed to delete account: ${deleteState.error.message || deleteState.error}`
            );
            dispatch(clearDeleteState()); // ✅ reset after error
          }
        }, [deleteState.success, deleteState.error, deleteState.deletedRole, dispatch, navigation]);


  
  const buttonText = () => {
    return (
       <TouchableOpacity 
        style={styles.buttonContent}
        onPress={handleDeleteAccount}
        disabled={deleteState.loading}
      >
        <MaterialIcons
          name="delete-outline"
          size={w(6)}
          color={deleteState.loading ? globalColors.grey : globalColors.white}
          style={styles.icon}
        />
        <Text
          style={{
            fontFamily: 'BaiJamjuree-Bold',
            color: deleteState.loading ? globalColors.grey : globalColors.white,
            fontSize: f(1.8),
            textAlign: 'center',
          }}>
          {deleteState.loading ? 'Deleting...' : 'Delete Account'} 
        </Text>
      </TouchableOpacity>
    );
  };
  
  const [profile, setProfile] = useState(candidates?.user?.document?.filter(doc => doc?.document_type == "profile")?.[0]?.document_file ? `${baseurl}/${candidates?.user?.document?.filter(doc => doc.document_type == "profile")?.[0].document_file}` : null
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
          style={{height: w(25), marginBottom: h(13.5)}}>
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
              {/* Priya Gupta */}
              {candidates?.name}
            </Text>
          </View>
          <View style={styles.horizontalRule} />
        </LinearGradient>
      </View>
      <View style={styles.userDetailsContanier}>
        <Text style={styles.userDetailsText}>
          <Text>Email Address</Text>{'   '}
          <Text style={styles.semidetails}>
            {/* xyz@gmailcom */}
            {candidates?.email}
          </Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Address</Text>{'   '}
          {/* <Text style={styles.semidetails}>
            {candidates?.state?.state},{candidates?.district?.district} , {candidates?.taluka?.taluka} , {candidates?.village?.village}  , {candidates?.zipcode}
          </Text> */}
          <Text style={styles.semidetails}>
            {[
              candidates?.state?.state,
              candidates?.district?.district,
              candidates?.taluka?.taluka,
              candidates?.village?.village,
              candidates?.zipcode,
            ]
              .filter(Boolean) // remove null/undefined/empty
              .join(", ")}
          </Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Mobile No</Text>{'   '}
          <Text style={styles.semidetails}>
            {/* 7889887950 */}
            {candidates?.contact_number || candidates?.contact_number_1 || candidates?.contact_number_2}
          </Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Gst No</Text>{'   '}
          <Text style={styles.semidetails}>{candidates?.gst_no}</Text>
        </Text>
        <View style={styles.horizontalRule2} />
        <Text style={styles.userDetailsText}>
          <Text>Website</Text>{'   '}
          <Text style={styles.semidetails}>{candidates?.website_url}</Text>
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
          <ConfirmDeleteModal
            visible={deleteModalVisible}
            role={selectedRole?.role}
            loading={deleteState.loading}
            onCancel={() => setDeleteModalVisible(false)}
            onConfirm={() => {
              dispatch(selectedRole.action(id));
              setDeleteModalVisible(false);
            }}
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
    marginTop: h(0),
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
