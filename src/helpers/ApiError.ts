import { HttpError } from "routing-controllers";
import type { ValidationError } from "class-validator";

interface IMessage {
  status: number;
  message?: string;
  code?: string;
  errors?: ValidationError[];
}

export class ApiError extends HttpError {
  protected error: IMessage;
  public removeLog: boolean;

  constructor(status = 500, error: Omit<IMessage, "status">) {
    super(status);

    this.error = { ...error, status, code: error.code || "INTERNAL_ERROR" };

    this.name = "ApiError";

    this.message = error.message || "";
  }
  public toJSON = (): IMessage => {
    return this.error;
  };
}
