import { ApiClient, Resource, RequestResponse} from "./api"
import { BotService } from "@/models/botService/types";

export class VirtualMachineService {
    public static startVirtualMachine(serviceId: string): Promise<RequestResponse<Resource<BotService>>> {
       return ApiClient.post<Resource<BotService>>({
            url: `/service/${serviceId}/start`,
          })
    }

    public static stopVirtualMachine(serviceId: string): Promise<RequestResponse<Resource<BotService>>> {
        return ApiClient.post<Resource<BotService>>({
            url: `/service/${serviceId}/stop`,
          })
    }

    public static getVirtualMachineState(serviceId: string): Promise<RequestResponse<Resource<BotService>>> {
        return ApiClient.get<Resource<BotService>>({
            url: `/service/${serviceId}/state`,
          })
    }
}
