export const deleteSuccess = {
  message: 'DELETE_SUCCESS',
  data: null,
  statusCode: 204
};

export const authorizationRequired = {
  message: 'AUTHORIZATION_REQUIRED',
  error: 'UNAUTHORIZED',
  statusCode: 401
};


/**
 * @param name string
 * @param id string
 * @returns an object with a internal server error message and status code
 */
export const internalServerError = (name: string, id: string): object => {
  return  {
    message: `NO_${name.toUpperCase()}_WITH_THIS_ID_${id}`,
    error: 'INTERNAL_SERVER_ERROR',
    statusCode: 500
  };
};