import dbConnect from "../../../lib/db";
import Submission from "../../../models/Submission";

// GET /api/submissions?limit=100
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const rows = await Submission.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return Response.json({ ok: true, rows });
  } catch (e) {
    console.error("API Error (GET):", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/submissions
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // ✅ Validation
    if (!body.name || !body.areaHa || !body.cropType) {
      return Response.json(
        { error: "Missing required fields (name, areaHa, cropType)" },
        { status: 400 }
      );
    }

    // ✅ Carbon credit calculation
    let result = {};
    if (body.cropType === "rice") {
      result = {
        method: "Rice Methane Reduction",
        tCO2e: Number(body.areaHa) * 2.5,
        pricePerTon: 1200,
      };
    } else if (body.cropType === "agroforestry") {
      const species = body.species || [];
      result = {
        method: "Agroforestry Sequestration",
        tCO2e: species.reduce(
          (sum, s) => sum + (Number(s.count) || 0) * 0.5,
          0
        ),
        pricePerTon: 1200,
      };
    } else {
      return Response.json(
        { error: "Invalid cropType. Must be 'rice' or 'agroforestry'." },
        { status: 400 }
      );
    }

    result.revenueINR = result.tCO2e * result.pricePerTon;
    result.uncertainty = 0.15;

    // ✅ Save into MongoDB
    const submission = new Submission({
      ...body,
      result,
    });

    await submission.save();

    return Response.json({ ok: true, submission });
  } catch (e) {
    console.error("API Error (POST):", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
