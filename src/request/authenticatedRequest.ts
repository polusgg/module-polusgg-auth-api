import { Request } from "./request";

export class AuthenticatedRequest<T> extends Request<T> {
  constructor(path: string, token: string) {
    super(path);

    this.setHeader("Authorization", `Bearer ${token}`);
  }
}
