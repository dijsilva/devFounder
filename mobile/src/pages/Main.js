import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import MapView, {Marker, Callout} from 'react-native-maps'
import {getCurrentPositionAsync, requestPermissionsAsync} from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons'

import api from '../services/api'

function Main({ navigation }){
    const [devs, setDevs] = useState([])
    const [currentPositon, setCurrentPositon] =  useState(null)


    function onRegionChangeComplete(region){
        setCurrentPositon(region)

    }

    async function loadDevs(){
        const { latitude, longitude } = currentPositon

        const response = await api.get('search', {
            params: {
                latitude,
                longitude,
                techs: 'React Native'
            }
        })

        console.log(response.data)
        setDevs(response.data)
    }

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
        <MapView onRegionChangeComplete={onRegionChangeComplete} initialRegion={currentPositon}  style={styles.map}>
            {devs.map(dev => (
                <Marker key={dev.id}  coordinate={{latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
                <Image source={{uri: dev.avatar_url}} style={styles.avatar} />
                <Callout onPress={() => {
                    navigation.navigate("Profile", { github_user: `${dev.github_user}` })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.name}>{dev.name}</Text>
                        <Text style={styles.bio}>{dev.bio}</Text>
                        <Text style={styles.techs}>{dev.techs}</Text>
                    </View>
                </Callout>
            </Marker>
            ))}
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
            onPress={loadDevs}
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
        marginTop: 5,
        marginBottom: 2
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