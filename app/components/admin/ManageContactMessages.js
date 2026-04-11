"use client";

import { useState } from "react";
import { X, Mail, Phone, MessageSquare } from "lucide-react";

export default function ManageContactMessages({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/contact-messages');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-900">Contact Messages</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">View and manage contact form submissions</p>
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh Messages'}
            </button>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No contact messages found.</p>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="border rounded-lg p-6 bg-white shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">{message.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {message.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {message.topic}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">
                      {new Date(message.created_at).toLocaleDateString()} {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 whitespace-pre-wrap">{message.message}</p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Reply via Email
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                      Mark as Read
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}