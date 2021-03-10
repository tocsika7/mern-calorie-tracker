import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listReq } from '../../actions/requirementActions';
import { Alert, ListGroup } from 'react-bootstrap';

const NutritionInfoList = () => {
  const dispatch = useDispatch();

  const reqList = useSelector((state) => state.reqList);
  const {
    loading,
    error,
    dailyReq: { intake: req },
  } = reqList;

  const reqUpdate = useSelector((state) => state.reqUpdate);
  const { reset } = reqUpdate;

  useEffect(() => {
    dispatch(listReq());
  }, [dispatch, reset]);

  return (
    <>
      {loading ? (
        <Alert variant='primary'>Töltés...</Alert>
      ) : error ? (
        <Alert variant='danger'>{error}</Alert>
      ) : (
        <ListGroup>
          <h3>Napi tápanyag szükséglet</h3>
          <ListGroup.Item>Kalória: {req.calories} kcal</ListGroup.Item>
          <ListGroup.Item>Fehérje: {req.protein} g</ListGroup.Item>
          <ListGroup.Item>Szénhidrát: {req.ch} g</ListGroup.Item>
          <ListGroup.Item>Zsír: {req.fat} g</ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default NutritionInfoList;
