import { AuthenticatedRequest } from "../request/authenticatedRequest";
import { UserResponseStructure } from "../types/userResponseStructure";

export class Requester {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  #authenticationToken?: string;

  async getUser(uuid: string): Promise<UserResponseStructure> {
    if (this.isAuthenticated()) {
      return await new AuthenticatedRequest<UserResponseStructure>(`/some/path/${uuid}`, this.#authenticationToken!).get();
    }

    throw new Error("You must be authenticated to make this request");
  }

  isAuthenticated(): boolean {
    return this.#authenticationToken === undefined;
  }

  setAuthenticationToken(token: string): this {
    this.#authenticationToken = token;

    return this;
  }

  deleteAuthenticationToken(): this {
    this.#authenticationToken = undefined;

    return this;
  }
}
