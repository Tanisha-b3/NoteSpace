import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'UserId is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true,
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function (v) {
        return v.every(tag => typeof tag === 'string' && tag.trim() !== '');
      },
      message: 'Tags must be non-empty strings',
    },
  },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
