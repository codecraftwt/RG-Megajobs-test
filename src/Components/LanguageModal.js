import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { f, w } from 'walstar-rn-responsive';
import { globalColors } from '../Theme/globalColors';
import { RadioButton } from 'react-native-paper';

const LanguageModal = ({ setvisible, isVisible, onClose }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const { t, i18n } = useTranslation();

    // Function to handle language selection
    const handleLanguageSelect = async (language) => {
        try {
            await AsyncStorage.setItem('language', language);
            setSelectedLanguage(language);
            changeLanguage(language)
            onClose();
        } catch (error) {
            console.error('Error saving language preference:', error);
        }
    };

    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                const language = await AsyncStorage.getItem('language');
                if (language) {
                    handleLanguageSelect(language);
                } else {
                    setSelectedLanguage('en');
                }
            } catch (error) {
                console.error('Error fetching language:', error);
            }
        };

        fetchLanguage();
    }, []);

    const changeLanguage = async (lng) => {
        try {
            i18n.changeLanguage(lng);
        } catch (error) {
            console.error('Error setting language:', error);
        }
    };

    return (
        <Modal visible={isVisible} onBackdropPress={onClose} transparent={true}>
            <TouchableOpacity onPress={() => setvisible(false)} style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{t("Select Language")}</Text>
                    <RadioButton.Group
                        onValueChange={value => handleLanguageSelect(value)}
                        value={selectedLanguage}>
                        <RadioButton.Item style={{paddingVertical:w(3)}} labelStyle={styles.languageButton} label={t('English')} value="en" />
                        <RadioButton.Item style={{paddingVertical:w(3)}} labelStyle={styles.languageButton} label={t('Hindi')} value="hi" />
                        <RadioButton.Item style={{paddingVertical:w(3)}} labelStyle={styles.languageButton} label={t('Marathi')} value="mr" />
                    </RadioButton.Group>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: '15%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: w(5),
        paddingTop: w(3),
        borderRadius: w(2),
    },
    modalTitle: {
        fontSize: f(2.3),
        fontFamily: 'BaiJamjuree-Bold',
        color: globalColors.darkblack,
        alignSelf: 'center',
    },
    languageButton: {
        paddingVertical: w(3),
        fontSize: f(2),
        fontFamily: 'BaiJamjuree-SemiBold',
        color: globalColors.darkblack
    },
});

export default LanguageModal;
