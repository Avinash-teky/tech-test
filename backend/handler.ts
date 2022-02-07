import { Handler } from 'aws-lambda';
import { getCakes, deleteCake, createCake, uploadFile} from './functions';

export const createCakeHandler: Handler = async (event: any) => {
  console.log(event);
  const result = await createCake(event);
  const response = {
    statusCode: result.status,
    body: JSON.stringify(
      result.data,
      null,
      2
    ),
  };

  return new Promise((resolve) => {
    resolve(response)
  })
}

export const getCakesHandler: Handler = async (event: any) => {
  console.log(event);
  const result = await getCakes(event);
  const response = {
    statusCode: result.status,
    body: JSON.stringify(
      result.data,
      null,
      2
    ),
  };

  return new Promise((resolve) => {
    resolve(response)
  })
}

export const deleteCakeHandler: Handler = async (event: any) => {
  console.log(event);
  const result = await deleteCake(event);
  const response = {
    statusCode: result.status,
    body: JSON.stringify(
      result.data,
      null,
      2
    ),
  };

  return new Promise((resolve) => {
    resolve(response)
  })
}

export const uploadFileHandler: Handler = async (event: any) => {
  console.log(event);
  const result = await uploadFile(event);
  const response = {
    statusCode: result.status,
    body: JSON.stringify(
      result.data,
      null,
      2
    ),
  };

  return new Promise((resolve) => {
    resolve(response)
  })
}