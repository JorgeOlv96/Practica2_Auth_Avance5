import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { getFavoriteApi } from '../api/favorito'
import { Button } from 'react-native-paper'
import { globalStyle } from '../styles'
import HomeScreen from './HomeScreen'
import axios from 'axios'
import { ENV } from '../util/constants'
import { useFocusEffect } from '@react-navigation/native'


export default function FavoritesScreen() {
  const [personajes, setPersonajes] = useState([])
  const [characters, setCharacters] = useState([])

const fetchData = async (url) => {
  if (characters.length > 300){
    return;
  }
    try {
      const response = await axios.get(url);
      const newCharacters = response.data.results;
      setCharacters((preview) => [...preview, ...newCharacters])
      if (response.data.info.next){
          fetchData(response.data.info.next)
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }

  };
  
useEffect(()=>{fetchData(ENV.API_URL_RM)}, [] );


  useFocusEffect(
    useCallback(() => { (async () => {
        const response = await getFavoriteApi()
        console.log('FavoriteScreen',response)
        setPersonajes(response)
      })();
    }, [])
  )

  return (
    <HomeScreen characters={characters.filter((character) => personajes.includes(character.id))} title={'Favoritos'} />
  )
}