import { NextResponse } from "next/server";
import dbConnect from "../../lib/db"; // adjust path if needed
import Submission from "../../models/Submission";

const EF_BASE_RICE = 1.5; // tCO2e/ha/season (demo)
const RF_AWD = 0.30; // 30% reduction (demo)
const PRICE_PER_TON = 600; // INR per tCO2e (demo)

function calcEstimate(input) {
  const { cropType, areaHa = 0, practice = "NA", species = [] } = input;
  let method = "";
  let tCO2e = 0;
  let uncertainty = 0.2; // 20% demo uncertainty

  if (cropType === "rice") {
    method = "Rice AWD vs Flooded (demo)";
    const efProj = practice === "AWD" ? EF_BASE_RICE * (1 - RF_AWD) : EF_BASE_RICE;
    const delta = (EF_BASE_RICE - efProj) * Number(areaHa);
    tCO2e = Math.max(0, Number(delta.toFixed(3)));
  } else if (cropType === "agroforestry") {
    method = "Tree biomass proxy (demo)";
    let totalKg = 0;
    for (const s of species) {
      const count = Number(s.count || 0);
      const cat = s.category || "hardwood";
      const factor = cat === "fast" ? 25 : cat === "fruit" ? 15 : 20;
      totalKg += factor * count;
    }
    tCO2e = Number((totalKg / 1000).toFixed(3));
  }

  const revenueINR = Number((tCO2e * PRICE_PER_TON).toFixed(0));
  return { method, tCO2e, pricePerTon: PRICE_PER_TON, revenueINR, uncertainty };
}

// 👇 App Router style POST
export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.cropType) {
      return NextResponse.json({ error: "cropType is required" }, { status: 400 });
    }

    await dbConnect();
    const estimate = calcEstimate(body);

    const doc = await Submission.create({
      ...body,
      estimate,
      status: "Submitted",
    });

    return NextResponse.json(
      { ok: true, submissionId: doc._id, estimate },
      { status: 200 }
    );
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
