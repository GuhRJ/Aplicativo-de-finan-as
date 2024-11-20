import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  const data = [
    { name: 'Alimentação', amount: 400, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Transporte', amount: 300, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Entretenimento', amount: 200, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo Financeiro</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <Button title="Gerenciar Transações" onPress={() => navigation.navigate('Transactions')} />
    </View>
  );
}

