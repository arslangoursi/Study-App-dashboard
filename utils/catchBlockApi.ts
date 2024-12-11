import { NextResponse } from "next/server";

export default function catchBlockApi<T>(
  error: unknown
): NextResponse<T | { error: string; details?: string }> {
  console.error("API error:", error);

  let errorMessage = "Unexpected Error Occurred";
  let errorDetails: string | undefined;
  let statusCode = 500;

  if (error instanceof BaseCustomError) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  } else if (error instanceof ValidationError) {
    errorMessage = "Validation Error";
    errorDetails = error.message;
    statusCode = 400;
  } else if (error instanceof NetworkError) {
    errorMessage = "Network Error";
    errorDetails = error.message;
    statusCode = 502;
  } else if (error instanceof Error) {
    errorMessage =
      process.env.NODE_ENV === "development"
        ? error.message
        : "Internal Server Error";
    errorDetails =
      process.env.NODE_ENV === "development" ? error.stack : undefined;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  return NextResponse.json(
    { error: errorMessage, details: errorDetails },
    { status: statusCode }
  );
}

class BaseCustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class ValidationError extends BaseCustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

class NetworkError extends BaseCustomError {
  constructor(message: string) {
    super(message, 502);
  }
}
