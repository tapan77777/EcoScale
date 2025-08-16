import dbConnect from "../../../lib/db";
import Submission from "../../../models/Submission";

// GET /api/admin/submissions?limit=100
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
    console.error("API Error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
