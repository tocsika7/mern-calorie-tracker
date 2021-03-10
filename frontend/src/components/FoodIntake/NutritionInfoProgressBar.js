import React from 'react';
import { ProgressBar, ListGroup, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const NutritionInfoProgressBar = () => {
  const reqList = useSelector((state) => state.reqList);
  const {
    dailyReq: { intake: req },
  } = reqList;

  const intakeList = useSelector((state) => state.intakeList);
  const {
    dailyIntake: { sum },
  } = intakeList;

  return (
    <Card>
      <Card.Header>Napi tápanyag szükséglet</Card.Header>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          Kalória: {sum.calories} / {req.calories} kcal
          <ProgressBar
            variant='info'
            striped
            animated
            now={(sum.calories / req.calories) * 100}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          Fehérje: {sum.protein} / {req.protein} g
          <ProgressBar
            variant='primary'
            striped
            animated
            now={(sum.protein / req.protein) * 100}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          Szénhidrát: {sum.ch} / {req.ch} g
          <ProgressBar
            variant='success'
            striped
            animated
            now={(sum.ch / req.ch) * 100}
          />
        </ListGroup.Item>
        <ListGroup.Item>
          Zsír: {sum.fat} / {req.fat} g
          <ProgressBar
            variant='warning'
            striped
            animated
            now={(sum.fat / req.fat) * 100}
          />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default NutritionInfoProgressBar;
