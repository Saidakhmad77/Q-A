import React from 'react';
import { View, Text, Image, Picker, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const QnAScreen = ({ navigation }) => {
    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../images/logo-color.png')} style={styles.logo} />
                <Text style={styles.title}>Q&A</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={navigateToHome}>
                        <Image source={require('../images/home.png')} style={styles.homeIcon} />
                    </TouchableOpacity>
                    <View style={styles.languageSelector}>
                        <Text>Language:</Text>
                        <Picker style={styles.picker}>
                            <Picker.Item label="English" value="en" />
                            <Picker.Item label="中文" value="zh" />
                            <Picker.Item label="日本語" value="jp" />
                        </Picker>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Exosome</Text>
                <View style={styles.questionsContainer} id="exosome-questions"></View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>STEMON</Text>
                <View style={styles.questionsContainer} id="stemon-questions"></View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reprosome</Text>
                <View style={styles.questionsContainer} id="reprosome-questions"></View>
            </View>
        </ScrollView>
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
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    homeIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    languageSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        height: 50,
        width: 150,
    },
    section: {
        padding: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    questionsContainer: {
        marginTop: 10,
    },
});

export default QnAScreen;