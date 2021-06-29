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

    moment.locale('fr')
    const br = useRef(new Animated.Value(0)).current
    const now = moment(data.daily[0].dt*1000)

    useEffect(() => {
        Animated.timing(br, {
            toValue: 300,
            duration: 600,
            useNativeDriver: false
        }).start();
    })

    return (
        <Animated.View
            style={[
                local.locality,
                {
                    borderTopRightRadius: br,
                    borderTopLeftRadius: br,
                }
            ]}
        >
            <View style={local.content}>
                <Text style={local.city}>{ville}</Text>
                <View style={local.subContent}>
                    <Text style={local.subText}>
                        {
                            now.format('Do MMMM YYYY')
                        }
                    </Text>
                    <Text style={local.subText}>{now.format('hh:mm')}</Text>
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
        </Animated.View>
    )
}


const local = StyleSheet.create({
    locality: {
        flex: 1,
        backgroundColor: '#52C622',
    },
    content: {
        flex: 1,
        width: '70%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft:20
    },
    city: {
        fontSize: 50,
        color: 'white',
        fontWeight: 'bold',
        width:'100%'
    },
    subContent: {
        width: '100%',
        marginLeft: 60
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
        alignItems:'center'
    },
    input:{
        height:50,
        width:'80%',
    },
    iconBlock:{
        width:'20%',
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