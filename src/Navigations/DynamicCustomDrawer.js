import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { blogo1, blogo4, blogo5, educationicon, logout, save, subsmnt, suitcase,accountdrawer } from '../Theme/globalImages';
import { globalColors } from '../Theme/globalColors';
import { f, h, w } from 'walstar-rn-responsive';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePermissionCheck from '../Utils/HasPermission';
import { baseurl } from '../Utils/API';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const DynamicCustomDrawer = ({ navigation }) => {
    const { t } = useTranslation();
    const hasPermission = usePermissionCheck();

    const [showReportsSubItems, setShowReportsSubItems] = useState(false);
    const [showJobsSubItems, setShowJobsSubItems] = useState(false);

    const handleReportsItemClick = () => {
        setShowReportsSubItems(!showReportsSubItems);
    };

    const handleJobsItemClick = () => {
        setShowJobsSubItems(!showJobsSubItems);
    };

    const [user, setUser] = useState('')
    const updatedProfile = useSelector(state => state?.Profile?.updated);
    console.log("testusertest", updatedProfile)

    useEffect(() => {
        fetchuser();
    }, [updatedProfile]);

    const fetchuser = async () => {
        try {
            const usertest = await AsyncStorage.getItem('user');
            if (usertest) {
                const userData = JSON.parse(usertest);
                setUser(userData)
            }
        } catch (error) {
            console.log('Error retrieving data from AsyncStorage:', error);
            navigation.replace('Login');
        }
    };

    useFocusEffect(
        useCallback(() => {
          fetchuser();
          return () => {
          };
        }, [])
      );

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() =>
                        navigation.navigate('bottomnavigation', { screen: 'Home' })
                    }>
                    <Image resizeMode="contain" style={styles.logo} source={blogo1} />
                    <Text style={styles.drawertxt}>{t('home')}</Text>
                </TouchableOpacity>

                {hasPermission("Created Jobs View") || hasPermission("Job Type View Mobile") || hasPermission("Job Education View Mobile") || hasPermission("Job skill View Mobile") || hasPermission("Job Category View Mobile") ? (
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={handleJobsItemClick}>
                        <Image resizeMode="contain" style={[styles.logo, { height: w(3), width: w(3), }]} source={suitcase} />
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Text style={styles.drawertxt}>{t('Jobs Management')}</Text>
                            <MaterialIcons
                                name={showJobsSubItems ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                color={globalColors.darkblack}
                                size={f(2.3)}
                            />
                        </View>
                    </TouchableOpacity>) : null}
                {showJobsSubItems && (
                    <>
                        {hasPermission("Created Jobs View") && (
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate('JobsCategoryMnt'),
                                        setShowReportsSubItems(false);
                                }}>
                                <View style={{ marginStart: w(4) }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={globalColors.darkblack}
                                        size={f(2.3)}
                                    />
                                </View>
                                <Text style={styles.drawertxt}>{t('Job List')}</Text>
                            </TouchableOpacity>)}
                        {hasPermission("Job Category View Mobile") && (
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate('JobsCategoryMnt'),
                                        setShowReportsSubItems(false);
                                }}>
                                <View style={{ marginStart: w(4) }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={globalColors.darkblack}
                                        size={f(2.3)}
                                    />
                                </View>
                                <Text style={styles.drawertxt}>{t('Job Category')}</Text>
                            </TouchableOpacity>)}
                        {hasPermission("Job Type View Mobile") && (
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate('JobsCategoryMnt'),
                                        setShowReportsSubItems(false);
                                }}>
                                <View style={{ marginStart: w(4) }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={globalColors.darkblack}
                                        size={f(2.3)}
                                    />
                                </View>
                                <Text style={styles.drawertxt}>{t('Job Type')}</Text>
                            </TouchableOpacity>
                        )}
                        {hasPermission("Job skill View Mobile") && (
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate('JobsCategoryMnt'),
                                        setShowReportsSubItems(false);
                                }}>
                                <View style={{ marginStart: w(4) }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={globalColors.darkblack}
                                        size={f(2.3)}
                                    />
                                </View>
                                <Text style={styles.drawertxt}>{t('Job Skills')}</Text>
                            </TouchableOpacity>)}
                        {hasPermission("Job Education View Mobile") && (
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate('JobsCategoryMnt'),
                                        setShowReportsSubItems(false);
                                }}>
                                <View style={{ marginStart: w(4) }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={globalColors.darkblack}
                                        size={f(2.3)}
                                    />
                                </View>
                                <Text style={styles.drawertxt}>{t('Job Education')}</Text>
                            </TouchableOpacity>)}
                    </>
                )}
                {hasPermission('Created Candidates View') && (

                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => navigation.navigate('JobsCategoryMnt')}>
                        <Image resizeMode="contain" style={styles.logo} source={blogo4} />

                        <Text style={styles.drawertxt}>{t('Candidate Management')}</Text>
                    </TouchableOpacity>)}
                {hasPermission('Subscription Management') && (
                    <TouchableOpacity
                        style={styles.drawerItem}
                        onPress={() => navigation.navigate('JobsCategoryMnt')}>
                        <Image resizeMode="contain" style={styles.logo} source={subsmnt} />

                        <Text style={styles.drawertxt}>{t('Subscription Management')}</Text>
                    </TouchableOpacity>
                )}
                {hasPermission('subscription reports') || hasPermission('job reports') ? (
                    <TouchableOpacity
                        style={[
                            styles.drawerItem,
                            {
                                flexDirection: 'row',
                                alignItems: 'center',
                            },
                        ]}
                        onPress={handleReportsItemClick}>
                        <Image
                            resizeMode="contain"
                            style={[styles.logo, { height: w(2.9), width: w(2.9), }]}
                            source={educationicon}
                        />
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Text style={[styles.drawertxt]}>{t('Reports')}</Text>
                            <MaterialIcons
                                name={showReportsSubItems ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                color={globalColors.darkblack}
                                size={f(2.3)}
                            />
                        </View>
                    </TouchableOpacity>
                ) : null}
                {showReportsSubItems && (
                    <>
                        {hasPermission('subscription reports') && (
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate('JobsCategoryMnt'),
                                        setShowReportsSubItems(false);
                                }}>
                                <View style={{ marginStart: w(4) }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={globalColors.darkblack}
                                        size={f(2.3)}
                                    />
                                </View>
                                <Text style={styles.drawertxt}>{t('Subscription Reports')}</Text>
                            </TouchableOpacity>
                        )}
                        {hasPermission('job reports') && (
                            <TouchableOpacity
                                style={styles.drawerItem}
                                onPress={() => {
                                    navigation.navigate('JobsCategoryMnt'),
                                        setShowReportsSubItems(false);
                                }}>
                                <View style={{ marginStart: w(4) }}>
                                    <MaterialIcons
                                        name="keyboard-arrow-right"
                                        color={globalColors.darkblack}
                                        size={f(2.3)}
                                    />
                                </View>
                                <Text style={styles.drawertxt}>{t('Jobs Report')}</Text>
                            </TouchableOpacity>)}
                    </>
                )}
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => navigation.navigate('JobsCategoryMnt')}>
                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={accountdrawer}
                    />

                    <Text style={styles.drawertxt}>{t('User Profile')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: h(1),
                        paddingVertical: h(2),
                        marginStart: w(4.5),
                        gap: w(1.5),
                    }}
                    onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('user');
                        navigation.replace('Auth')
                    }}>
                    <Image
                        resizeMode="contain"
                        style={{ height: w(4), width: w(4) }}
                        source={logout}
                    />
                    <Text
                        style={{
                            color: globalColors.vividred,
                            fontFamily: 'BaiJamjuree-SemiBold',
                            fontSize: f(1.65),
                        }}>
                        {t('Log Out')}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: '5%',
        gap: w(5),
        paddingBottom: h(3),
        borderBottomWidth: w(0.25),
        borderColor: globalColors.purplegrey,
    },
    profileImage: {
        width: w(16),
        height: w(16),
        borderRadius: w(15),
    },
    userName: {
        marginTop: h(2.1),
        fontFamily: 'BaiJamjuree-SemiBold',
        color: globalColors.darkblack,
        fontSize: f(2),
    },
    userpost: {
        fontFamily: 'BaiJamjuree-Regular',
        color: globalColors.navypurple,
        fontSize: f(1.4),
        // marginTop: h(-1),
    },
    useremail: {
        fontFamily: 'BaiJamjuree-Regular',
        color: globalColors.commonpink,
        fontSize: f(1.4),
        marginTop: h(0.2),
    },
    drawerItem: {
        paddingVertical: h(1.7),
        marginTop: h(1.7),
        marginHorizontal: w(5),
        borderBottomWidth: w(0.25),
        borderColor: globalColors.purplegrey,
        flexDirection: 'row',
        alignItems: 'center',
        gap: w(1.5)
    },

    drawertxt: {
        fontFamily: 'BaiJamjuree-Medium',
        fontSize: f(1.61),
        color: globalColors.darkblack,
        paddingStart: w(1),
    },
    logo: {
        tintColor: globalColors.darkblack,
        height: w(3.2),
        width: w(3.2),
    },
});

export default DynamicCustomDrawer;
