
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { styles } from './styles';
import { GameParams } from '../../@types/@navigation';
import { THEME } from '../../theme';

import logoNlw from '../../assets/logo-nlw-esports.png';
import React, { useEffect, useState } from 'react';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';


export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }



  useEffect(() => {
    fetch(`http://192.168.0.102:3333/games/${game.id}/ads`)
      .then(Response => Response.json())
      .then(response => setDuos(response))
  }, [])


  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={logoNlw}
            style={styles.logo}
          />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />
        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => { }} />
          )}
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          horizontal
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Nao há anuncios publicados ainda.
            </Text>

          )}
        />

      </SafeAreaView>
    </Background>
  );
}