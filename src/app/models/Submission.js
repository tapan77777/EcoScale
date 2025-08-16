import mongoose, { Schema } from 'mongoose'

const SubmissionSchema = new Schema(
  {
    name: String,
    phone: String,
    village: String,
    district: String,
    state: String,
    gps: { lat: Number, lng: Number },
    areaHa: Number,
    cropType: { type: String, enum: ['rice', 'agroforestry'] },
    practice: { type: String, enum: ['AWD', 'Flooded', 'NA'], default: 'NA' },
    species: [{ name: String, category: { type: String, enum: ['fast', 'fruit', 'hardwood'] }, count: Number }],
    photos: [String],
    estimate: {
      method: String,
      tCO2e: Number,
      pricePerTon: Number,
      revenueINR: Number,
      uncertainty: Number,
    },
    status: { type: String, enum: ['Submitted', 'Verified', 'Ready'], default: 'Submitted' },
  },
  { timestamps: true }
)

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema)
