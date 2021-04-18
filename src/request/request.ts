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
};

export class ApiError extends Error {
  constructor(
    protected readonly endpoint: URL,
    protected readonly method: string,
    protected readonly responseCode: number,
    protected readonly error?: string,
  ) {
    super(error === undefined ? `Encountered response code ${responseCode} when ${method}ing ${endpoint.href}` : `Encountered error when ${method}ing ${endpoint.href}. "${error}" (${responseCode})`);
  }
}

export class Request<T> {
  protected url: URL;
  protected headers: Record<string, string> = {};

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

  async post(): Promise<T> {
    return this.makeRequest("POST");
  }

  private async makeRequest(method: string): Promise<T> {
    const response = await fetch(this.url, { method, headers: this.headers });

    if (!response.ok) {
      throw new ApiError(this.url, method, response.status);
    }

    const body = await response.json() as ApiResponse<T>;

    if (!body.success) {
      throw new ApiError(this.url, method, response.status, body.data.message);
    }

    return body.data;
  }
}
