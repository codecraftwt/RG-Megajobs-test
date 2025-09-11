import React from 'react';
import {PaperProvider} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigations/index';
import i18n from './src/Utils/i18n.config';
import Toast, { BaseToast } from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store from './src/Redux/store/store';
import { h, w } from 'walstar-rn-responsive';
import { globalColors } from './src/Theme/globalColors';

const App = () => {
  
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{pointerEvents: 'none',borderLeftWidth:w(2),borderRightWidth:w(2),borderColor:globalColors.green,width:'90%'
        }}
      />
    ),
    error: (props) => (
      <BaseToast
        {...props}
        style={{pointerEvents: 'none',borderLeftWidth:w(2),borderRightWidth:w(2),borderColor:globalColors.red,width:'90%' 
        }}
      />
    )
  }

  return (
    <Provider store={store}>
      <PaperProvider>
          <NavigationContainer>
            <Navigation />
            <Toast config={toastConfig}/>
          </NavigationContainer>
      </PaperProvider>
    </Provider>

    //    -------import navigations like bellow-- so you can access all navigations------
    //     <>
    //         <NavigationContainer>
    //             <Navigation/>
    //         </NavigationContainer>
    //     <Toast />
    //     </>
  );
};

export default App;
