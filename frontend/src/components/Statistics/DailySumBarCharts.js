import React from 'react';
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory';
import { Card, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const DailySumBarCharts = () => {
  const dailyNutritionSum = useSelector((state) => state.dailyNutritionSum);
  const { error, loading, dailySum } = dailyNutritionSum;

  const data = dailySum
    ? dailySum.map((sums) => {
        const date = sums._id.substr(5, 10);
        return {
          x: date,
          y: sums.sumCalories,
          label: sums.sumCalories,
        };
      })
    : [];

  return (
    <Card className='mt-5'>
      <Card.Header>
        <h4>Napi össz kalória</h4>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <Alert variant='primary'>Töltés...</Alert>
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 15, y: 15 }}
          >
            <VictoryBar data={data} />
          </VictoryChart>
        )}
      </Card.Body>
    </Card>
  );
};

export default DailySumBarCharts;
