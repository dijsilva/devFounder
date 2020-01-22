import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import {getCurrentPositionAsync, requestPermissionsAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

function Main({ navigation }){
    const [currentPositon, setCurrentPositon] =  useState(null)

    useEffect(() => {
        async function loadPosition(){
            const {granted} = await requestPermissionsAsync()

            if (granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })

                const {latitude, longitude } = coords 

                setCurrentPositon({
                    latitude,
                    longitude, 
                    latitudeDelta: 0.06,
                    longitudeDelta: 0.06,
                })
        

            }
        }
        loadPosition()
    })

    if (!currentPositon){
        return null
    }

    return (
        <>
        <MapView initialRegion={currentPositon}  style={styles.map}>
            <Marker coordinate={{latitude: -15.7542661, longitude: -47.8860943}}>
                <Image source={{uri: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4'}} style={styles.avatar} />
                <Callout onPress={() => {
                    navigation.navigate("Profile", { github_user: 'diego3g' })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.name}>Diego Fernandes</Text>
                        <Text style={styles.bio}>CTO na RocketSeat</Text>
                        <Text style={styles.techs}>ReactJS, React Native e Node.js</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
        <View style={styles.buttonView}>
            <TextInput style={styles.searchInput}
            placeholder="Buscar devs por tecnologias"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            ></TextInput>
            <TouchableOpacity
            style={styles.touchButton}
            onPress={() => {}}
            >
            <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: "#fff",
    },
    callout: {
        width: 260,
    },
    name: {
        fontWeight: "bold",
        fontSize: 16,
    },
    bio: {
        color: "#666",
        marginTop: 5,
    },
    techs: {
        marginTop: 5
    }, 
    buttonView: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2,
    },
    touchButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#8e4dff",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15,
    }

})


export default Main;