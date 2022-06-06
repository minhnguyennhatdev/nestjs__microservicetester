import { ErrorMessage } from '../error/error.type';

type inputResponse<T = any> = {
  statusCode?: number;
  message?: string | ErrorMessage[];
  data?: T;
};

export class ResponseHandler<T = any> {
  statusCode?: number;
  message?: string | ErrorMessage[];
  data?: T;

  constructor(input: inputResponse<T>) {
    this.statusCode = input.statusCode;
    this.message = input.message;
    this.data = input.data;
  }

  public SuccessResponse = () => {
    return new ResponseHandler({
      statusCode: this.statusCode ? this.statusCode : 200,
      message: this.message ? this.message : 'Successfully!',
      data: this.data ? this.data : undefined,
    });
  };

  public ErrorResponse = () => {
    return new ResponseHandler({
      statusCode: this.statusCode ? this.statusCode : 400,
      message: this.message ? this.message : 'Bad Request',
      data: this.data ? this.data : undefined,
    });
  };
}
