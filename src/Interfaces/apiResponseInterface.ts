export default interface apiResponseInterface {
  data?: {
    statusCode?: number;
    isSuccess?: boolean;
    errorMessages?: Array<string>;
    result: {
      // this will not give you suggestions
      [key: string]: string;
    };
  };
  error?: any;
}
