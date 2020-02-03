import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const loader = props => {

    if (props.isLoading) {
        return <View style={styles.mainView}>
            <ActivityIndicator size='large' color='orange' style={styles.activityIndic}></ActivityIndicator>
        </View>
    } else {
        return <View></View>
    }
}

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute', 
        width: '100%', height: '100%', 
        zIndex: 1
    },
    activityIndic: {
        flex: 1
    }
});

export default loader;