import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { globalColors } from '../Theme/globalColors';
import { Image, Text, View } from 'react-native';
import { h } from 'walstar-rn-responsive';
import usePermissionCheck from '../Utils/HasPermission';
const styles = require('../Theme/globalStyles');
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DynamicBottomNav() {
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
  const hasPermission = usePermissionCheck();
    const insets = useSafeAreaInsets(); 

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: globalColors.commonpink,
        tabBarInactiveTintColor: globalColors.cloudygrey,
        tabBarIconStyle: {display:'none'},
        tabBarStyle: { backgroundColor: globalColors.white, height: Math.round(h(7.5)) + Math.max(insets.bottom, 0) ,paddingBottom: insets.bottom,},
      })}
    >
      <Tab.Screen
        name="Home"
        component={
          hasPermission('Admin Home') ? Home :
          hasPermission('Employer Home') ? EmployerHome :
          hasPermission('Institute Home') ? InstitutionsHome : UserHome
        }
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={{height: h(7), flexDirection: 'column', justifyContent: 'center', alignItems: 'center' ,gap:h(1)}}>
              <Image style={[styles.bottomlogo,{ tintColor: focused ? globalColors.commonpink: null}]} resizeMode='contain' source={blogo1}/>
              <Text style={[styles.bottomnavlabel, { color: focused ? globalColors.commonpink : globalColors.black }]}>{t('home')}</Text>
            </View>
          ),
        }}
      />
            
      {hasPermission('Candidates List') && (
         <Tab.Screen
         name="bottomnavigation"
         component={Candidate}
         options={{
           tabBarLabel: ({ focused }) => (
             <View style={{height: h(7), flexDirection: 'column', justifyContent: 'center', alignItems: 'center' ,gap:h(1)}}>
               <Image style={[styles.bottomlogo,{ tintColor: focused ? globalColors.commonpink: null}]} resizeMode='contain' source={blogo4}/>
               <Text style={[styles.bottomnavlabel, { color: focused ? globalColors.commonpink : globalColors.black }]}>{t('candidate')}</Text>
             </View>
           ),
         }}
       />
      )}
      {hasPermission('Consultants List') && (
        <Tab.Screen
        name="bottomnavigation"
        component={Consultant}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={{ height: h(7),flexDirection: 'column', justifyContent: 'center', alignItems: 'center',gap:h(1) }}>
              <Image style={[styles.bottomlogo,{ tintColor: focused ? globalColors.commonpink: null}]} resizeMode='contain' source={blogo5}/>
              <Text style={[styles.bottomnavlabel, { color: focused ? globalColors.commonpink : globalColors.black }]}>{t('consultant')}</Text>
            </View>
          ),
        }}
      />
      )}
    </Tab.Navigator>
  );
}


