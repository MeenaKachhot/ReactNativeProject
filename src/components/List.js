import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ImageBackground
} from 'react-native';
import Loading from '../config/Loader';
import { environment } from '../config/constant';
import logo from '../assets/images/logo.png';

export default class List extends Component {
state = {
    processing: false,
    ListData: [],
};

constructor(props){
    super(props)
}

componentWillMount(){
    this.getList();
}


render() {
    return <View>
    <Loading isLoading={this.state.processing} />
    <SafeAreaView>
        <FlatList refreshControl={<RefreshControl refreshing={this.state.processing} onRefresh={this.reloadList}></RefreshControl>} data={this.state.ListData} renderItem={(post) => (
            <View style={styles.list}>
                <ImageBackground source={post.item.photo ? { uri: post.item.photo } : logo} style={styles.image}>
                    <View>
                        <Text style={[styles.text, styles.childText, styles.time]}>{post.item.preparationTime}</Text>
                    </View>
                </ImageBackground>
                        <View style={{alignItems: "center"}}>
                            <Text style={[styles.text, styles.mainText]}>{post.item.name}</Text>
                            <Text style={[styles.text,  styles.childText]}>Complexity: {post.item.complexity}</Text>
                        </View>
                </View>

            )}></FlatList>
    </SafeAreaView>
    </View>
}

getList = () => {
    this.setState({
        processing: true,
        ListData: []
    });
    fetch(environment.API_URL + 'recipe/cooking-list',
    {
        method: 'GET',
        headers: {
            'Authorization': this.props.authToken,
        },
    }).then((response) => {
        if (response.status == 200) {
            return response.json();
        } else {
            Alert.alert("Something went wrong");
            this.setState({
                ListData: [],
                processing: false,
            });
        }
    }).then(response => {
        this.setState({
            ListData: response,
            processing: false,
        });
    })
};

reloadList = () => {
    this.getList()
}

}

const styles = StyleSheet.create({
    list: {
        backgroundColor: "#6f4e37",
        borderRadius: 10,
        paddingBottom: 15,
        margin: 10
    },
    text: {
        color: 'orange'
    },
    mainText: {
        fontSize: 25, fontWeight: 'bold'
    },
    childText: {
        fontSize: 15,
        margin: 3
    },
    image:{
        height: 200, 
        margin: 5, 
        borderRadius: 5
    },
    time: {
        backgroundColor: "#6f4e37",
        width: 50,
        alignSelf: "flex-end"
    }
  });