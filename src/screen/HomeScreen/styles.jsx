import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'


const styles = StyleSheet.create({
    bottomContainer:{
        height :100,
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems :'center',
        padding: 15,

    },
    bottomText:{
        fontSize :22,
        color: '#4a4a4a'
    },
    roundButoon:{
        position:'absolute',
        backgroundColor:'white',
        padding:10,
        borderRadius:25
    },
    goButtton :{
        position: 'absolute',
        backgroundColor:'#1495ff',
        width:75,
        height:75,
        padding: 10,
        borderRadius : 50,
        justifyContent:'center',
        alignItems: 'center',
        bottom:110,
        left : Dimensions.get('window').width / 2 -37

    },
    goText:{
        fontSize:20,
        color:'white',
        fontWeight: 'bold'
    },
    balanceButton:{
        position: 'absolute',
        backgroundColor:'#1c1c1c',
        width:100,
        height:50,
        padding: 10,
        borderRadius : 50,
        justifyContent:'center',
        alignItems: 'center',
        top:10,
        left : Dimensions.get('window').width / 2 - 50
    },
    balanceText :{
        fontSize:20,
        color:'white',
        fontWeight:'bold'
    }
})

export default styles