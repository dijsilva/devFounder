import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import {getCurrentPositionAsync, requestPermissionsAsync} from 'expo-location'

function Main(){
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
        <MapView initialRegion={currentPositon}  style={styles.map}>
            <Marker coordinate={{latitude: -15.7542661, longitude: -47.8860943}}>
                <Image source={{uri: 'https://avatars0.githubusercontent.com/u/2254731?s=460&v=4'}} style={styles.avatar} />
            </Marker>
        </MapView>
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
    }
})


export default Main;