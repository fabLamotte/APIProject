import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import Meteo from './src/screens/Meteo'

const App = () => {

  return (
    <PaperProvider>
      <Meteo />
    </PaperProvider>
  )
}

export default App
