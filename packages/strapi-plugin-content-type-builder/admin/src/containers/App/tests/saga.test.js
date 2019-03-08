/**
 * Test  sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, fork, takeLatest, put } from 'redux-saga/effects';
import defaultSaga, { deleteModel, getData } from '../saga';

import { deleteModelSucceeded, getDataSucceeded } from '../actions';
import { DELETE_MODEL, GET_DATA } from '../constants';

const response = {
  models: [
    { icon: 'fa-cube', name: 'permission', description: '', fields: 6, source: 'users-permissions' },
  ],
  allModels: [
    {
      collectionName: 'users-permissions_permission',
      connection: 'default',
      description: '',
      mainField: '',
      name: 'permission',
      attributes: [
        {
          name: 'type',
          params: { type: 'string', required: true, configurable: false },
        },
        {
          name: 'controller',
          params: { type: 'string', required: true, configurable: false },
        },
      ],
    },
  ],
};

describe('CTB <App /> DeleteModel saga', () => {
  let deleteModelGenerator;

  beforeEach(() => {
    deleteModelGenerator = deleteModel({ modelName: 'test' });
    const callDescriptor = deleteModelGenerator.next({ ok: true }).value;

    expect(callDescriptor).toMatchSnapshot();
  });

  it('should not dispatch the deleteModelSucceeded action if the server didn\'t restart', () => {
    deleteModelGenerator.next({ ok: false }).value;

    expect(strapi.notification.success).not.toHaveBeenCalled();
  });

  it('should dispatch the deleteModelSucceeded action if it requests the data successfully', () => {
    const putDescriptor = deleteModelGenerator.next({ ok: true }).value;

    expect(putDescriptor).toEqual(put(deleteModelSucceeded('test')));
    expect(strapi.notification.success).toHaveBeenCalled();
  });

  it('should call the strapi.notification if the request fails', () => {
    const response = new Error('Some Error');
    deleteModelGenerator.throw(response).value;

    expect(strapi.notification.error).toHaveBeenCalled();
  });
});

describe('CTB <App /> GetData saga', () => {
  let getDataGenerator;

  beforeEach(() => {
    getDataGenerator = getData();
    const callDescriptor = getDataGenerator.next(response).value;

    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getDataSucceeded action if it requests the data successfully', () => {
    const putDescriptor = getDataGenerator.next(response).value;

    expect(putDescriptor).toEqual(put(getDataSucceeded(response)));
  });

  it('should call the strapi.notification if the request fails', () => {
    const response = new Error('Some Error');
    getDataGenerator.throw(response).value;

    expect(strapi.notification.error).toHaveBeenCalled();
  });
});

describe('defaultSaga Saga', () => {
  const defaultSagaSaga = defaultSaga();

  it('should start a task to watch for GET_DATA', () => {
    const forkDescriptor = defaultSagaSaga.next().value;

    expect(forkDescriptor)
      .toEqual(
        all([
          fork(takeLatest, GET_DATA, getData),
          fork(takeLatest, DELETE_MODEL, deleteModel),
        ]));
  });
});