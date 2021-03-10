import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { weightListToGraphData } from '../../utils/weightListToGraphData';

const WeightChangeLineChart = () => {
  const weightList = useSelector((state) => state.weightList);
  const { error, loading, weightList: weights } = weightList;
  const { weightChange } = weights;

  const data = weightChange ? weightListToGraphData(weightChange) : [];
  console.log(data);

  return (
    <Card className='mt-5 '>
      <Card.Header>
        <h4>Súly változás</h4>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <Alert variant='primary'>Töltés</Alert>
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          weightChange && (
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine data={data} labels={({ data }) => data.y} />
            </VictoryChart>
          )
        )}
      </Card.Body>
    </Card>
  );
};

export default WeightChangeLineChart;
