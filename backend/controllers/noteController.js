import mongoose from 'mongoose';
import {
  findNotesByUser,
  findNoteByIdAndUser,
  createNote,
  updateNoteByIdAndUser,
  deleteNoteByIdAndUser,
} from '../repositories/noteRepository.js';

export const getAll = async (req, res) => {
  try {
    const notes = await findNotesByUser(req.userId);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

export const getById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid note ID.' });
    }

    const note = await findNoteByIdAndUser(req.params.id, req.userId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};

export const create = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required.' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required.' });
    }

    const note = await createNote({
      userId: req.userId,
      title: title.trim(),
      content: content.trim(),
      tags: tags || [],
    });

    res.status(201).json(note);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error.' });
  }
};

export const update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid note ID.' });
    }

    const { title, content, tags } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Title is required.' });
    }
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Content is required.' });
    }

    const note = await updateNoteByIdAndUser(
      req.params.id,
      req.userId,
      { title: title.trim(), content: content.trim(), tags: tags || [] }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json(note);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error.' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid note ID.' });
    }

    const note = await deleteNoteByIdAndUser(req.params.id, req.userId);
    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.json({ message: 'Note deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
};
