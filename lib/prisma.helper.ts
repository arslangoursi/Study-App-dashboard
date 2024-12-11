import { NextResponse } from "next/server";
import catchBlockApi from "@/utils/catchBlockApi";

async function updateModel(
  model: any,
  where: object,
  data: object,
  successMessage: string
): Promise<NextResponse> {
  try {
    await model.updateMany({ where, data });
    return NextResponse.json({ message: successMessage });
  } catch (error: any) {
    return catchBlockApi(error);
  }
}

export async function softDelete(
  model: any,
  ids: string[]
): Promise<NextResponse> {
  return updateModel(
    model,
    { id: { in: ids } },
    { isDeleted: true, deletedAt: new Date() },
    "Successfully deleted"
  );
}

export async function softDeleteSingle(
  model: any,
  id: string
): Promise<NextResponse> {
  return updateModel(
    model,
    { id },
    { isDeleted: true, deletedAt: new Date() },
    "Successfully deleted"
  );
}

export async function restoreDeleted(
  model: any,
  ids: string[]
): Promise<NextResponse> {
  return updateModel(
    model,
    { id: { in: ids } },
    { isDeleted: false, deletedAt: null },
    "Successfully restored"
  );
}

export async function restoreDeletedSingle(
  model: any,
  id: string
): Promise<NextResponse> {
  return updateModel(
    model,
    { id },
    { isDeleted: false, deletedAt: null },
    "Successfully restored"
  );
}
