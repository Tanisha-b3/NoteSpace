import { Calendar, Edit2, Trash2, Clock, MoreVertical } from 'lucide-react';
import { useState } from 'react';



const NoteCard = ({ note, onEdit, onDelete, viewMode = 'grid' }) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (date) => {
    // Handle various date formats and invalid dates
    if (!date) return 'No date';
    
    let dateObj;
    try {
      // Check if it's a valid date string or timestamp
      if (typeof date === 'string' || typeof date === 'number') {
        dateObj = new Date(date);
      } else if (date instanceof Date) {
        dateObj = date;
      } else {
        return 'Invalid date';
      }
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        return 'Invalid date';
      }
      
      const now = new Date();
      const diffDays = Math.floor((now - dateObj) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      return dateObj.toLocaleDateString();
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  const getPreviewText = (content, maxLength = 100) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // Get the correct date field (try multiple common field names)
  const getNoteDate = () => {
    // Try different possible date field names
    const dateField = note.updatedAt || note.updated_at || note.updated || note.date || note.createdAt;
    return dateField;
  };

  const noteDate = getNoteDate();
  const formattedDate = formatDate(noteDate);

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{note.title || 'Untitled'}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formattedDate}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-1">
              {getPreviewText(note.content, 80)}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onEdit(note)}
              className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(note)}
              className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-lg">
              {note.title || 'Untitled'}
            </h3>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                <button
                  onClick={() => {
                    onEdit(note);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(note);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 mb-4">
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 whitespace-pre-wrap">
            {note.content || 'No content'}
          </p>
        </div>

 <div className="flex-1 mb-4">
  <div className="flex flex-wrap gap-2">
    {note.tags?.length > 0 ? (
      note.tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full border border-indigo-200 shadow-sm hover:scale-105 transition-transform"
        >
          #{tag}
        </span>
      ))
    ) : (
      <span className="text-gray-400 text-sm italic">
        No tags added
      </span>
    )}
  </div>
</div>
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(note)}
              className="text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors flex items-center gap-1"
            >
              <Edit2 className="w-3 h-3" />
              Edit
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => onDelete(note)}
              className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;