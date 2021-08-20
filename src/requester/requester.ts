import { AuthenticatedRequest } from "../request/authenticatedRequest";
import { UserResponseStructure } from "../types/userResponseStructure";
import { GameOptionJson } from "@polusgg/plugin-polusgg-api/src/services/gameOptions/gameOption";
import { BanResponseStructure } from "../types/banResponseStructure";
import { MuteResponseStructure } from "../types/muteResponseStructure";
import { MuteLogStructure } from "../types/muteLogStructure";
import { BanLogStructure } from "../types/banLogStructure";
import { KickLogStructure } from "../types/kickLogStructure";

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

  async setUserGameOptions(uuid: string, options: Record<string, GameOptionJson[]> & { gamemode: GameOptionJson; version: number }): Promise<void> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<void>(`${this.baseUrl}/api-private/v1/users/${uuid}/options`, this.authenticationToken).put(options);
    }

    throw new Error("You must be authenticated to make this request");
  }

  async setUserCosmetics(uuid: string, cosmetics: { [key: string]: number }): Promise<void> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<void>(`${this.baseUrl}/api-private/v1/users/update/${uuid}/cosmetics`, this.authenticationToken).put(cosmetics);
    }

    throw new Error("You must be authenticated to make this request");
  }

  async getUser(uuid: string): Promise<UserResponseStructure> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<UserResponseStructure>(`${this.baseUrl}/api-private/v1/users/${uuid}`, this.authenticationToken).get();
    }

    throw new Error("You must be authenticated to make this request");
  }

  async getUserByDiscordId(discordId: string): Promise<UserResponseStructure> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<UserResponseStructure>(`${this.baseUrl}/api-private/v1/users/discord/${discordId}`, this.authenticationToken).get();
    }

    throw new Error("You must be authenticated to make this request");
  }

  async kickUser(uuid: string, fromGame: string, actor: string, reason: string): Promise<BanResponseStructure> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<BanResponseStructure>(`${this.baseUrl}/api-private/v1/logs/kick`, this.authenticationToken).put({
        game_uuid: fromGame,
        actor_uuid: actor,
        target_uuid: uuid,
        reason,
      });
    }

    throw new Error("You must be authenticated to make this request");
  }

  async banUser(uuid: string, fromGame: string, actor: string, reason: string, duration: `${number}${"w" | "d" | "h" | "m"}`): Promise<BanResponseStructure> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<BanResponseStructure>(`${this.baseUrl}/api-private/v1/logs/ban`, this.authenticationToken).put({
        game_uuid: fromGame,
        actor_uuid: actor,
        target_uuid: uuid,
        reason,
        duration,
      });
    }

    throw new Error("You must be authenticated to make this request");
  }

  async muteUser(uuid: string, fromGame: string, actor: string, reason: string, duration: `${number}${"w" | "d" | "h" | "m"}`): Promise<MuteResponseStructure> {
    if (this.authenticationToken !== undefined) {
      return await new AuthenticatedRequest<MuteResponseStructure>(`${this.baseUrl}/api-private/v1/logs/mute`, this.authenticationToken).put({
        game_uuid: fromGame,
        actor_uuid: actor,
        target_uuid: uuid,
        reason,
        duration,
      });
    }

    throw new Error("You must be authenticated to make this request");
  }

  async * getMuteLogsFrom(user: string): AsyncGenerator<MuteLogStructure, MuteLogStructure, never> {
    let index = 1;

    if (this.authenticationToken === undefined) {
      throw new Error("You must be authenticated to make this request");
    }

    const c = await new AuthenticatedRequest<MuteLogStructure>(`https://account.polus.gg/api-private/v1/logs/mute/${user}/from?page=${index}`, this.authenticationToken).get();

    while (c.current_page !== c.last_page) {
      index++;

      yield c;
    }

    return c;
  }

  async * getMuteLogsAgainst(user: string): AsyncGenerator<MuteLogStructure, MuteLogStructure, never> {
    let index = 1;

    if (this.authenticationToken === undefined) {
      throw new Error("You must be authenticated to make this request");
    }

    const c = await new AuthenticatedRequest<MuteLogStructure>(`https://account.polus.gg/api-private/v1/logs/mute/${user}/against?page=${index}`, this.authenticationToken).get();

    while (c.current_page !== c.last_page) {
      index++;

      yield c;
    }

    return c;
  }

  async * getBanLogsFrom(user: string): AsyncGenerator<BanLogStructure, BanLogStructure, never> {
    let index = 1;

    if (this.authenticationToken === undefined) {
      throw new Error("You must be authenticated to make this request");
    }

    const c = await new AuthenticatedRequest<BanLogStructure>(`https://account.polus.gg/api-private/v1/logs/ban/${user}/from?page=${index}`, this.authenticationToken).get();

    while (c.current_page !== c.last_page) {
      index++;

      yield c;
    }

    return c;
  }

  async * getBanLogsAgainst(user: string): AsyncGenerator<BanLogStructure, BanLogStructure, never> {
    let index = 1;

    if (this.authenticationToken === undefined) {
      throw new Error("You must be authenticated to make this request");
    }

    const c = await new AuthenticatedRequest<BanLogStructure>(`https://account.polus.gg/api-private/v1/logs/ban/${user}/against?page=${index}`, this.authenticationToken).get();

    while (c.current_page !== c.last_page) {
      index++;

      yield c;
    }

    return c;
  }

  async * getKickLogsFrom(user: string): AsyncGenerator<KickLogStructure, KickLogStructure, never> {
    let index = 1;

    if (this.authenticationToken === undefined) {
      throw new Error("You must be authenticated to make this request");
    }

    const c = await new AuthenticatedRequest<KickLogStructure>(`https://account.polus.gg/api-private/v1/logs/kick/${user}/from?page=${index}`, this.authenticationToken).get();

    while (c.current_page !== c.last_page) {
      index++;

      yield c;
    }

    return c;
  }

  async * getKickLogsAgainst(user: string): AsyncGenerator<KickLogStructure, KickLogStructure, never> {
    let index = 1;

    if (this.authenticationToken === undefined) {
      throw new Error("You must be authenticated to make this request");
    }

    const c = await new AuthenticatedRequest<KickLogStructure>(`https://account.polus.gg/api-private/v1/logs/kick/${user}/against?page=${index}`, this.authenticationToken).get();

    while (c.current_page !== c.last_page) {
      index++;

      yield c;
    }

    return c;
  }

  setAuthenticationToken(token: string): this {
    this.authenticationToken = token;

    return this;
  }

  deleteAuthenticationToken(): this {
    this.authenticationToken = undefined;

    return this;
  }
}
