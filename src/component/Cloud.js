import React, {useEffect, useRef} from 'react'
import { View, Text, StyleSheet, Animated, TextInput, TouchableOpacity } from 'react-native'
import moment from "moment"
import 'moment/locale/fr'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Cloud = (props) => {

    const {
        data,
        ville,
        research,
        setResearch,
        researchWeather
    } = props

    const rond1 = useRef(new Animated.Value(200)).current
    const rond2 = useRef(new Animated.Value(200)).current
    moment.locale('fr')
    const now = moment(data.daily[0].dt*1000)

    useEffect(() => {
        Animated.timing(rond1, {
            toValue: 300,
            duration: 600,
            useNativeDriver: false
        }).start();
        Animated.timing(rond2, {
            toValue: 300,
            duration: 600,
            useNativeDriver: false
        }).start();
    })

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    rond.rond1,
                    {
                        height: rond1,
                        width: rond1,
                    }
                ]}
            >
            </Animated.View>
            <Animated.View
                style={[
                    rond.rond2,
                    {
                        height: rond2,
                        width: rond2,
                    }
                ]}
            >
            </Animated.View>
            <View style={local.locality}>
                <View style={local.content}>
                    <Text style={local.city}>{ville}</Text>
                    <View style={local.subContent}>
                        <Text style={local.subText}>
                            {
                                now.format('MMMM Do YYYY')
                            }
                        </Text>
                        <Text style={local.subText}>{now.format('hh:mm')}</Text>
                    </View>
                </View>
            </View>
            <View style={local.inputBlock}>
                <TextInput 
                    onChangeText={setResearch}
                    value={research}
                    style={local.input}
                />
                <TouchableOpacity style={local.iconBlock} onPress={() => researchWeather()} >
                    <FontAwesome5 name="search" style={local.researchButton} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})

const rond = StyleSheet.create({
    rond1: {
        marginTop: -240,
        marginLeft: -30,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 300,
        zIndex: 2
    },
    rond2: {
        marginTop: -180,
        marginLeft: 180,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 300,
        zIndex: 2
    },
})

const local = StyleSheet.create({
    locality: {
        flex: 1,
        backgroundColor: '#5A56CD',
    },
    content: {
        flex: 1,
        width: '70%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom:30,
        marginLeft:20
    },
    city: {
        width: '100%',
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    subContent: {
        width: '100%',
    },
    subText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    inputBlock:{
        borderWidth:1,
        borderColor:'black',
        backgroundColor:'white',
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        zIndex:5
    },
    input:{
        height:50,
        width:'80%',
    },
    iconBlock:{
        width:'20%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    researchButton:{
        borderLeftWidth:1,
        borderLeftColor:'grey',
        paddingLeft:10
    }
})

export default Cloud