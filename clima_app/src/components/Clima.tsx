import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import api from '../api/api';

interface ClimaData {
  nomeCidade: string;
  temp: string;
  description: string;
  icon: string;
  temp_max: string;
  temp_min: string;
}

const largura  = Dimensions.get('window').width;
const comprimento = Dimensions.get('window').height;

function Botao_clima() {
  const [temptotal, setTemptotal] = useState<ClimaData[]>([]);
  const [erro, setErro] = useState<string>('');

  const CIDADES_URL = [
    { nome: "Campinas", url: "data/2.5/weather?lat=-22.90556&lon=-47.06083&appid=c83107cc92e47690be618bd479756564" },
    { nome: "Vinhedo", url: "data/2.5/weather?lat=-23.0298535&lon=-46.9749847&appid=c83107cc92e47690be618bd479756564" },
    { nome: "Bauru", url: "data/2.5/weather?lat=-22.31472&lon=-49.05889&appid=c83107cc92e47690be618bd479756564" },
    { nome: "Valinhos", url: "data/2.5/weather?lat=-22.97056&lon=-46.99583&appid=c83107cc92e47690be618bd479756564" }
  ];

  useEffect(() => {
    const buttonClima = async () => {
      try {
        const responses = await Promise.all(
          CIDADES_URL.map((cidade) => api.get(cidade.url))
        );

        const data = responses.map((response, index) => ({
          nomeCidade: CIDADES_URL[index].nome,
          temp: `${parseFloat((response.data.main.temp - 273.15).toFixed(0))}°C`,
          description: response.data.weather[0].main,
          icon: response.data.weather[0]?.icon || "01d",
          temp_max: `${parseFloat((response.data.main.temp_max - 273.15).toFixed(0))}°C`,
          temp_min: `${parseFloat((response.data.main.temp_min - 273.15).toFixed(0))}°C`,
        }));

        setTemptotal(data);
        setErro('');
        console.log(data);

      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setErro("Não foi possível obter os dados. Verifique e tente novamente.");
      }
    };

    buttonClima();
  }, []);

  return (
    <View>
      <View style={[styles.container ]}>

        {erro ? (
          <View>
            <Text style={styles.textErro}>{erro}</Text>
          </View>
        ) : (
          
          //<View style={styles.box}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              {temptotal.map((cidade, index) => (
   
                <View key={index} style={styles.boxClima}>
                  <Text style={styles.textCidade}>{cidade.nomeCidade}</Text>
                  <Text style={styles.textTemp}>
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${cidade.icon}.png`,
                    }}
                    style={styles.icon}
                  />
                  {cidade.temp}
                  </Text>

                  <Text style={styles.textClima}>{cidade.description}</Text>
                  <Text style={styles.textClima}>Máx {cidade.temp_max}   |   Mín {cidade.temp_min}</Text>

                </View>
              ))}
            </ScrollView>

           // </View>
        )}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    width: largura,
    height: comprimento,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textCidade: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e0fbfc',
    margin: 10,
  },

  textTemp: {
    fontSize: 35,
    color: '#e0fbfc',
    marginTop: 10,
    fontWeight: 'bold',
  },

  textClima: {
    fontSize: 20,
    color: '#e0fbfc',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: 'bold',
  },

  textErro: {
    fontSize: 16,
    color: '#FF5733',
    textAlign: 'center',
  },

  box: {
    backgroundColor: '#91B4C6',
    borderRadius: 50,
    height: '60%',
    padding: 20,
  },

  boxClima: {
    backgroundColor: '#AED5E4',
    margin: 20,
    borderRadius: 20,
    width: 350,
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 60,
    height: 30,
  },


});

export default Botao_clima;