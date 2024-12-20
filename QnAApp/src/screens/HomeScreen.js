import React, { useState } from 'react';
import { View, Text, Image, Picker, Button, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [language, setLanguage] = useState('en');

    const changeLanguage = (value) => {
        setLanguage(value);
        // Add any additional logic for changing language
    };

    const navigateToQnA = (lang) => {
        navigation.navigate('QnAScreen', { language: lang });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../images/logo-color.png')} style={styles.logo} />
                <Text style={styles.title}>Q&A</Text>
                <View style={styles.languageSelector}>
                    <Text>Language:</Text>
                    <Picker
                        selectedValue={language}
                        style={styles.picker}
                        onValueChange={(itemValue) => changeLanguage(itemValue)}
                    >
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="中文" value="zh" />
                        <Picker.Item label="日本語" value="jp" />
                    </Picker>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.welcomeMessage}>
                    <Text style={styles.welcomeTitle}>Welcome to STEMON's Q&A</Text>
                    <Text style={styles.welcomeText}>Please select a language to explore frequently asked questions.</Text>
                    <Text style={styles.additionalText}>Whether you're curious about our therapies, biotechnology, or general company information, we have answers in your preferred language.</Text>
                </View>
                <View style={styles.languageOptions}>
                    <TouchableOpacity style={styles.languageButton} onPress={() => navigateToQnA('jp')}>
                        <Image source={require('../images/japan.jpg')} style={styles.flag} />
                        <Text style={styles.textOverlay}>日本語</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.languageButton} onPress={() => navigateToQnA('en')}>
                        <Image source={require('../images/usa.jpg')} style={styles.flag} />
                        <Text style={styles.textOverlay}>English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.languageButton} onPress={() => navigateToQnA('zh')}>
                        <Image source={require('../images/china.jpg')} style={styles.flag} />
                        <Text style={styles.textOverlay}>中文</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    languageSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        height: 50,
        width: 150,
    },
    main: {
        flex: 1,
        padding: 20,
    },
    welcomeMessage: {
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 16,
        marginVertical: 10,
    },
    additionalText: {
        fontSize: 14,
        color: '#666',
    },
    languageOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    languageButton: {
        alignItems: 'center',
    },
    flag: {
        width: 100,
        height: 60,
        resizeMode: 'contain',
    },
    textOverlay: {
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;