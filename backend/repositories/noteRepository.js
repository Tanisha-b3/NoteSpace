import Note from '../models/Note.js';

export const findNotesByUser = async (userId) => {
  return Note.find({ userId }).sort({ createdAt: -1 }).select('title content createdAt');
};

export const findNoteByIdAndUser = async (noteId, userId) => {
  return Note.findOne({ _id: noteId, userId });
};

export const createNote = async ({ userId, title, content }) => {
  return Note.create({ userId, title, content });
};

export const updateNoteByIdAndUser = async (noteId, userId, updates) => {
  return Note.findOneAndUpdate(
    { _id: noteId, userId },
    updates,
    { new: true, runValidators: true }
  );
};

export const deleteNoteByIdAndUser = async (noteId, userId) => {
  return Note.findOneAndDelete({ _id: noteId, userId });
};
