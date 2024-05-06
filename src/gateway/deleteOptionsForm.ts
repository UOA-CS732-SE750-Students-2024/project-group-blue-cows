import { db } from "../config/db";
import {eq} from 'drizzle-orm';
import optionsFormSchema from "@/schemas/optionsFormSchema";

export async function deleteOptionsForm(optionsId: number) {
    const results = await db.delete(optionsFormSchema).where(eq(optionsFormSchema.id, optionsId));
}