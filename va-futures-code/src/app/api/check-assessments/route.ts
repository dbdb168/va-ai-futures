import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 500 });
  }

  const sql = neon(url);
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || new Date().toISOString().slice(0, 10);

  const rows = await sql`
    SELECT id, created_at, name, email, region, company_size, industry,
           score_overall, current_mode, primary_scenario, strongest_d, weakest_d
    FROM assessments
    WHERE created_at::date = ${date}
    ORDER BY created_at DESC
  `;

  const total = await sql`SELECT count(*) as total FROM assessments`;

  return NextResponse.json({
    date,
    count: rows.length,
    total_all_time: total[0].total,
    assessments: rows,
  });
}
