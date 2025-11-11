import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { IUser } from "../../types"

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "12")
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
})

// Compare password
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>("User", userSchema)
