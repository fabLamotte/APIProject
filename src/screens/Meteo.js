import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TextInput } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from './../../react-native-weather-icons/weatherIcon'
import Cloud from './../component/Cloud'
import Plain from './../component/Plain'
import moment from "moment"
import 'moment/locale/fr'

const Meteo = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [city, setCity] = useState('Amiens')
    const [research, setResearch] = useState("")
    var APIKEY = "27ad54c117528f72076b0764ebaba8f6"

    const launchResearch = () => {
        if(isLoading){
            urlLocate = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=1&appid=' + APIKEY
            // Premier fetch => localisation de la recherche
            fetch(urlLocate, {
                    method: 'GET',
                })
                .then((response) => response.json())
                .then((response) => {
                    setCity(response[0].name)
                    // Second fetch => Capture de la météo
                    let urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat='+response[0].lat+'&lon='+response[0].lon+'&appid=' +APIKEY+"&lang=fr&units=metric"
                    fetch(urlWeather, {
                            method: 'POST',
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            setData(json)
                            return json
                        } )
                        .catch((error) => console.log("Erreur : " + error))
                        .finally(() => setIsLoading(false))
    
                })
                .catch((error) => console.log("Erreur : " + error))
        }
    }

    // Lancement de la recherche de la météo au chargement...
    useEffect(() => {
        launchResearch()
    }, [isLoading])

    // Puis au clic sur la recherche
    const researchWeather = () => {
        
        if(research){
            urlLocate = 'http://api.openweathermap.org/geo/1.0/direct?q='+research+'&limit=1&appid=' + APIKEY + "&lang=fr"
        }
        // Premier fetch => localisation de la recherche
        fetch(urlLocate, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((response) => {
                // Second fetch => Capture de la météo
                if(response){
                    setCity(response[0].name)
                    let urlWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat='+response[0].lat+'&lon='+response[0].lon+'&appid=' +APIKEY+"&lang=fr&units=metric"
                    fetch(urlWeather, {
                            method: 'POST',
                        })
                        .then((response) => response.json())
                        .then((json) => {
                            setData(json)
                            return json
                        } )
                        .catch((error) => console.log("Erreur : " + error))
                        .finally(() => setIsLoading(false))
                }

            })
            .catch((error) => console.log("Erreur : " + error))
    }

    return !isLoading?(
        <View style={{ flex: 1, backgroundColor:'white' }}>
                <View style={meteo.meteo}>
                    <View style={meteo.blockTemp}>
                        <Text style={meteo.actualTemp}>{parseInt(data.daily[0].temp.day)}°C</Text>
                        <View style={meteo.row}>
                            <View style={meteo.blockEcart}>
                                <Text style={meteo.ecartText}>{parseInt(data.daily[0].temp.min)}°C </Text>
                                <FontAwesome5 name="arrow-circle-down" style={meteo.minIcon} />
                            </View>
                            <View style={meteo.blockEcart}>
                                <Text style={meteo.ecartText}>{parseInt(data.daily[0].temp.max)}°C </Text>
                                <FontAwesome5 name="arrow-circle-up" style={meteo.maxIcon} />
                            </View>
                        </View>
                        <View style={meteo.row}>
                            <Text style={meteo.blueComponent}>Ressenti</Text>
                            <Text style={meteo.blueComponent}>{parseInt(data.daily[0].feels_like.day)}°C </Text>
                        </View>
                    </View>
                    <View style={meteo.blockTemp}>
                        <Image source={{uri:"http://openweathermap.org/img/wn/"+ data.daily[0].weather[0].icon +"@2x.png"}} style={meteo.cloudIcon} />
                        <Text style={meteo.description}>{data.daily[0].weather[0].description}</Text>
                        <View style={meteo.row}>
                            <View style={meteo.block}>
                                <Icon name="wi-strong-wind" style={meteo.icon} />
                                <Text style={meteo.blueComponent}>{data.daily[0].wind_speed} km/h</Text>
                            </View>
                        </View>
                        <View style={meteo.row}>
                            <View style={meteo.block}>
                                <Icon name="wi-raindrop" style={meteo.icon} />
                                <Text style={meteo.blueComponent}>{data.daily[0].humidity} %</Text>
                            </View>
                        </View>
                        <View style={meteo.row}>
                            <View style={meteo.block}>
                                <Text style={meteo.uv}>UV</Text>
                                <Text style={meteo.blueComponent}>{data.daily[0].uvi}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    data.daily[0].weather[0].main == 'Rain' ?
                    <Cloud data={data} ville={city} research={research} setResearch={setResearch} researchWeather={researchWeather} />
                    :
                    <Plain data={data} ville={city} research={research} setResearch={setResearch} researchWeather={researchWeather} />
                }
        </View>
    ):(
        <View style={{flex:1, justifyContent:'flex-end', alignItems:'center' }}>
            <Image source={require("./../assets/image/catastrophe.jpg")} style={meteo.splashScreen} />
            <ActivityIndicator size="large" color="white" style={{position:'absolute', marginBottom:'50%'}} />
        </View>
    )
}

const meteo = StyleSheet.create({
    splashScreen:{
        height:'100%',
        width:'100%'
    },
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    meteo: {
        width: '100%',
        flexDirection: 'row',
        zIndex: 3,
        backgroundColor: 'white'
    },
    blockTemp: {
        width: '50%',
        alignItems: 'center'
    },
    actualTemp: {
        fontSize: 50,
        color: '#073161',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    blockEcart: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ecartText: {
        color: '#073161',
        fontSize: 18,
        fontWeight: 'bold'
    },
    minIcon: {
        color: '#6B5FD3',
        fontSize: 18,
        fontWeight: 'bold',
        transform: [
            { rotateZ: "-45deg" }
        ]
    },
    maxIcon: {
        color: '#BE3939',
        fontSize: 18,
        fontWeight: 'bold',
        transform: [
            { rotateZ: "45deg" }
        ]
    },
    blueComponent: {
        flexDirection: 'row',
        color: '#073161',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    cloudIcon: {
        height: 170,
        width:170,
    },
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        fontSize: 50,
        color: '#073161',
        width: 50
    },
    uv: {
        textAlign: 'center',
        width: 50,
        color: '#073161',
        fontWeight: 'bold',
        fontSize: 18
    },
    description:{
        fontSize:18,
        color: '#073161',
        fontWeight:'bold',
        textAlign:'center'
    },
})

export default Meteo
