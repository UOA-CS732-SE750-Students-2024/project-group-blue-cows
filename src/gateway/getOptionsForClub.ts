import { db } from "../config/db";
import {eq} from 'drizzle-orm';
import optionsFormSchema from "@/schemas/optionsFormSchema";

export async function getOptionsForClub(clubId: number) {
    return await db.select().from(optionsFormSchema).where(eq(optionsFormSchema.clubId, clubId));
}


