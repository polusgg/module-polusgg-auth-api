// import { GameOptionJson } from "@polusgg/plugin-polusgg-api/src/services/gameOptions/gameOption";
import { UserResponseStructure } from "../types/userResponseStructure";
import { AuthenticatedRequest } from "../request/authenticatedRequest";

export class Requester {
  private authenticationToken?: string;

  private readonly baseUrl: string;

  /**
   * @param baseUrl - The root api endpoint
   */
  constructor(baseUrl: string) {
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.substr(0, baseUrl.length - 1);
    }

    this.baseUrl = baseUrl;
  }

  async getUser(uuid: string): Promise<UserResponseStructure> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<UserResponseStructure>(`${this.baseUrl}/api-private/v1/users/${uuid}`, this.authenticationToken).get();
    }

    throw new Error("You must be authenticated to make this request");
  }

  // async setUserGameOptions(uuid: string, options: GameOptionJson): Promise<void> {
  //   if (this.authenticationToken !== undefined) {
  //     return await new AuthenticatedRequest<void>(`${this.baseUrl}/api-private/v1/users/${uuid}/options`, this.authenticationToken).put(options);
  //   }

  //   throw new Error("You must be authenticated to make this request");
  // }

  setAuthenticationToken(token: string): this {
    this.authenticationToken = token;

    return this;
  }

  deleteAuthenticationToken(): this {
    this.authenticationToken = undefined;

    return this;
  }
}
