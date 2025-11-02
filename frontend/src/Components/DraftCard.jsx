import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaDollarSign, FaTrash } from 'react-icons/fa';
import { MdEdit, MdPublish } from 'react-icons/md';

const DraftCard = ({ draft, onPublish, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      plumbing: 'bg-blue-100 text-blue-700',
      electrical: 'bg-yellow-100 text-yellow-700',
      carpentry: 'bg-amber-100 text-amber-700',
      cleaning: 'bg-green-100 text-green-700',
      gardening: 'bg-emerald-100 text-emerald-700',
      painting: 'bg-purple-100 text-purple-700',
      moving: 'bg-red-100 text-red-700',
      assembly: 'bg-cyan-100 text-cyan-700',
      delivery: 'bg-pink-100 text-pink-700',
      other: 'bg-gray-100 text-gray-700'
    };
    return colors[category?.toLowerCase()] || colors.other;
  };

  const isPublishable = draft.title && draft.description && draft.category && draft.location;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
              DRAFT
            </span>
            {draft.category && (
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(draft.category)}`}>
                {draft.category.charAt(0).toUpperCase() + draft.category.slice(1)}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {draft.title || 'Untitled Draft'}
          </h3>
          {draft.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {draft.description}
            </p>
          )}
        </div>
        {draft.imageUrl && (
          <img 
            src={draft.imageUrl} 
            alt="Draft preview" 
            className="w-20 h-20 rounded-lg object-cover ml-4"
          />
        )}
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
        {draft.location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>{draft.location}</span>
          </div>
        )}
        {draft.startDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaCalendarAlt className="text-gray-400" />
            <span>{formatDate(draft.startDate)}</span>
            {draft.startTime && <span className="text-gray-400">• {draft.startTime}</span>}
          </div>
        )}
        {draft.budget && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaDollarSign className="text-gray-400" />
            <span>${draft.budget}</span>
          </div>
        )}
        {draft.urgency && (
          <div className="flex items-center gap-2 text-sm">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              draft.urgency === 'urgent' ? 'bg-red-100 text-red-700' :
              draft.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
              draft.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-green-100 text-green-700'
            }`}>
              {draft.urgency.charAt(0).toUpperCase() + draft.urgency.slice(1)}
            </span>
          </div>
        )}
      </div>

      {/* Warning for incomplete drafts */}
      {!isPublishable && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800 font-medium">
            ⚠️ Complete required fields (title, description, category, location) to publish this task
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(draft)}
          className="flex-1 min-w-[120px] px-4 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <MdEdit size={18} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onPublish(draft)}
          disabled={!isPublishable}
          className={`flex-1 min-w-[120px] px-4 py-2.5 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            isPublishable
              ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-sm hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          title={!isPublishable ? 'Complete required fields to publish' : 'Publish task'}
        >
          <MdPublish size={18} />
          <span>Publish</span>
        </button>
        <button
          onClick={() => onDelete(draft)}
          className="px-4 py-2.5 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-all duration-200 flex items-center justify-center gap-2"
          title="Delete draft"
        >
          <FaTrash size={16} />
        </button>
      </div>

      {/* Created At */}
      {draft.createdAt && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Created: {formatDate(draft.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DraftCard;
