import { URL } from "url";
import fetch from "node-fetch";

export type ApiResponse<T> = {
  success: false;
  data: {
    [key: string]: unknown;
    message: string;
  };
} | {
  success: true;
  data: T;
} | {
  [key: string]: unknown;
};

export class ApiError extends Error {
  public isApiError: true = true;

  constructor(
    public readonly endpoint: URL,
    public readonly method: string,
    public readonly responseCode: number,
    public readonly response?: any,
    public readonly error?: string,
  ) {
    super(error === undefined ? `Encountered response code ${responseCode} when ${method}ing ${endpoint.href}` : `Encountered error when ${method}ing ${endpoint.href}. "${error}" (${responseCode})`);
  }
}

export class Request<T> {
  protected url: URL;
  protected headers: Record<string, string> = {};
  protected body: any;

  constructor(path: string) {
    this.url = new URL(path);

    this.setHeader("Accept", "application/json");
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value;
  }

  async get(): Promise<T> {
    return this.makeRequest("GET");
  }

  async post(body: any): Promise<T> {
    this.body = body;

    return this.makeRequest("POST");
  }

  async put(body: any): Promise<T> {
    this.body = body;

    return this.makeRequest("PUT");
  }

  private async makeRequest(method: string): Promise<T> {
    const response = await fetch(this.url, { method, headers: this.headers, body: this.body ? JSON.stringify(this.body) : undefined });

    if (!response.ok) {
      let err2: string;

      try {
        err2 = await response.text();
      } catch (err) {
        throw new ApiError(this.url, method, response.status, undefined, err);
      }

      throw new ApiError(this.url, method, response.status, JSON.parse(err2));
    }

    const body = await response.json() as ApiResponse<T>;

    if (body.success === undefined) {
      return body as any as T;
    }

    if (!body.success) {
      console.log(body);

      throw new ApiError(this.url, method, response.status, body.data, (body.data as any).message);
    }

    return body.data as T;
  }
}
