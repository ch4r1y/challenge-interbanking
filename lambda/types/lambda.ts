export interface LambdaEvent {
  resource: string;
  path: string;
  httpMethod: string;
  headers?: Record<string, string>;
  queryStringParameters?: Record<string, string>;
  body: string | null;
  isBase64Encoded: boolean;
}

export interface LambdaResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: unknown;
}
