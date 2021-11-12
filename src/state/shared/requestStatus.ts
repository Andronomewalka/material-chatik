export enum RequestStatus {
    Idle = "Idle",
    Requesting = "Requesting",
    Succeeded = "Succeeded",
    Failed = "Failed",
  }
  
  export interface RequestStatusExtend {
    state: RequestStatus,
    text: string
  }