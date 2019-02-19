export interface IConfig {
    secretJWT: string,
    serverPort: number
}

export const config: IConfig = {
    secretJWT: "superSecretLOL",
    serverPort: 9090
}