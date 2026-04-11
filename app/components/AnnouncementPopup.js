"use client";

import { useEffect, useState } from "react";
import { X, Bell } from "lucide-react";

export default function AnnouncementPopup() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [shownAnnouncements, setShownAnnouncements] = useState(new Set());

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/public/announcements');
        const data = await response.json();
        setAnnouncements(data.announcements || []);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 0) {
      const unseenAnnouncements = announcements.filter(
        (ann) => !shownAnnouncements.has(ann.id)
      );

      if (unseenAnnouncements.length > 0) {
        // Show first unseen announcement after a delay
        const timer = setTimeout(() => {
          setCurrentAnnouncement(unseenAnnouncements[0]);
        }, 2000); // Show after 2 seconds

        return () => clearTimeout(timer);
      }
    }
  }, [announcements, shownAnnouncements]);

  const closeAnnouncement = () => {
    if (currentAnnouncement) {
      setShownAnnouncements(prev => new Set([...prev, currentAnnouncement.id]));
    }
    setCurrentAnnouncement(null);
  };

  if (!currentAnnouncement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={closeAnnouncement}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-blue-100">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            {currentAnnouncement.title}
          </h3>
        </div>

        {currentAnnouncement.message && (
          <p className="text-slate-700 mb-4">
            {currentAnnouncement.message}
          </p>
        )}

        {currentAnnouncement.highlightMessage && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-yellow-800 text-sm">
              {currentAnnouncement.highlightMessage}
            </p>
          </div>
        )}

        <button
          onClick={closeAnnouncement}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}