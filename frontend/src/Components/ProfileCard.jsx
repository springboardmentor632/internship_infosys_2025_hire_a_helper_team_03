import React from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

export default function ProfileCard({ profile, onClose, onMessage }) {
  if (!profile) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        {/* Header with Close Button */}
        <div className="relative bg-sky-600 p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-sky-600 text-3xl font-bold shadow-lg mb-4">
              {profile.profilePic ? (
                <img 
                  src={profile.profilePic} 
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`
              )}
            </div>
            
            {/* Name */}
            <h3 className="text-2xl font-bold text-white mb-1">
              {`${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Unknown User'}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <FaStar className="text-yellow-300" />
              <span className="text-white font-semibold">{profile.rating || '4.8'}</span>
              <span className="text-white/80 text-sm">({profile.reviewCount || '23'} reviews)</span>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Bio Section */}
          {profile.bio && (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">About</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Skills Section */}
          {profile.skills && profile.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-sky-50 text-sky-700 rounded-full text-sm font-medium border border-sky-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3">Experience</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <p className="text-2xl font-bold text-gray-900">{profile.tasksCompleted || '12'}</p>
                <p className="text-sm text-gray-600">Tasks Completed</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-gray-900">{profile.successRate || '98'}%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          {profile.createdAt && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 text-center">
                Member since {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              Close
            </button>
            {onMessage && (
              <button
                onClick={() => {
                  onMessage(profile._id);
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-sky-800 transition-all shadow-md"
              >
                Message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
