import React from 'react';
import { VictoryPie } from 'victory';
import { Card, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const MealAvgPieChart = () => {
  const avgMealNutrition = useSelector((state) => state.avgMealNutrition);
  const { error, loading, avgNutData } = avgMealNutrition;
  const { avgCalories, avgProtein, avgCarbs, avgFat } = avgNutData;

  console.log(avgCalories);
  console.log(avgFat);
  console.log(avgProtein);
  console.log(avgCarbs);

  const data = [
    {
      x: avgCalories,
      y: avgProtein * 4,
      label:
        'fehérje ' + Math.round(((avgProtein * 4) / avgCalories) * 100) + '%',
    },
    {
      x: avgCalories,
      y: avgCarbs * 4,
      label: 'ch ' + Math.round(((avgCarbs * 4) / avgCalories) * 100) + '%',
    },
    {
      x: avgCalories,
      y: avgFat * 8,
      label: 'zsír ' + Math.round(((avgFat * 8) / avgCalories) * 100) + '%',
    },
  ];

  return (
    <Card className='mt-5'>
      <Card.Header>
        <h4>Makrotápanyagok ételenkénti eloszlása</h4>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <Alert variant='primary'>Töltés...</Alert>
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <VictoryPie
            padding={{ left: 100, right: 100 }}
            colorScale={['#158cba', '#28b62c', '#ff8c29']}
            data={data}
          />
        )}
      </Card.Body>
    </Card>
  );
};
