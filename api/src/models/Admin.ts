import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: 'Om Charitable Trust Admin',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, any>) => {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Hash password before save
AdminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

/**
 * Seed initial administrator if no admin account exists in database.
 */
export const seedInitialAdmin = async (): Promise<void> => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || 'admin@omtrust.org';
      const password = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

      await Admin.create({
        name: 'Om Charitable Trust Admin',
        email: email.toLowerCase().trim(),
        password,
      });

      console.log(`[Auth] Seeded initial admin account: ${email}`);
    }
  } catch (error) {
    console.error('[Auth] Error seeding initial admin:', error instanceof Error ? error.message : error);
  }
};
