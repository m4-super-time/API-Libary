import { ICreateSessionRequest, ICreateSessionResponse } from "../../interfaces";

const createSessionService = async (body:ICreateSessionRequest):Promise<ICreateSessionResponse> => {

    return {token: "Teste de Configuração Base"}
}

export { createSessionService };