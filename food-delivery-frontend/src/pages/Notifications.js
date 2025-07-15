// src/pages/Notifications.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft,
  FaBell,
  FaTrashAlt,
  FaCircle,
  FaCheckCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// initial mock
const initialNotifications = [
  {
    id: 1,
    text: 'Your order #1234 is out for delivery.',
    date: dayjs().subtract(2, 'hour').toISOString(),
    isRead: false
  },
  {
    id: 2,
    text: 'New offer: 30% off on orders above ₹500.',
    date: dayjs().subtract(1, 'day').toISOString(),
    isRead: false
  },
  {
    id: 3,
    text: 'Your order #1233 has been delivered. Enjoy!',
    date: dayjs().subtract(3, 'day').toISOString(),
    isRead: true
  }
];

export default function Notifications() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');

  // load initial + simulate real-time pushes
  useEffect(() => {
    setNotes(initialNotifications);
    const timer = setInterval(() => {
      const id = Date.now();
      setNotes(prev => [
        {
          id,
          text: `Mock push: New discount arrived!`,
          date: new Date().toISOString(),
          isRead: false
        },
        ...prev
      ]);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // filters
  const visibleNotes = notes.filter(n => filter === 'All' || !n.isRead);

  // actions
  const markAllRead = () => setNotes(prev => prev.map(n => ({ ...n, isRead: true })));
  const toggleRead  = id => setNotes(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  const deleteNote  = id => setNotes(prev => prev.filter(n => n.id !== id));

  // Motion variants
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { when: 'beforeChildren', staggerChildren: 0.08 } 
    }
  };
  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300 } },
    exit:   { opacity: 0, x: 20, transition: { duration: 0.2 } },
    hover:  { scale: 1.02 }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#1e1e1e] text-[#212529] dark:text-white">
      {/* Header */}
      <motion.header
        className="flex items-center justify-between px-4 py-3 shadow bg-white dark:bg-[#2a2a2a]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <h1 className="flex items-center gap-2 text-lg font-semibold">
          <FaBell /> Notifications
        </h1>

        <button
          onClick={markAllRead}
          disabled={!notes.some(n => !n.isRead)}
          className="flex items-center text-green-500 hover:text-green-600 transition disabled:opacity-50"
        >
          <FaCheckCircle className="mr-1" />
          Mark All Read
        </button>
      </motion.header>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mt-4">
        {['All', 'Unread'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              filter === tab
                ? 'bg-[#FF914D] text-white'
                : 'bg-gray-200 dark:bg-[#333] text-gray-700 dark:text-gray-300 hover:bg-orange-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <motion.main
        className="max-w-md mx-auto px-4 py-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {visibleNotes.length ? (
          <AnimatePresence>
            {visibleNotes.map(note => (
              <motion.li
                key={note.id}
                className="list-none flex items-center justify-between bg-white dark:bg-[#2a2a2a] p-4 rounded-lg shadow mb-3"
                variants={item}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
              >
                <div className="flex items-center gap-3">
                  {!note.isRead && <FaCircle className="text-[#FF914D] text-xs" />}
                  <span>{note.text}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {dayjs(note.date).fromNow()}
                  </span>
                  <button
                    onClick={() => toggleRead(note.id)}
                    className="text-blue-500 hover:text-blue-600 transition"
                  >
                    {note.isRead ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-600 transition ml-2"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        ) : (
          <motion.p
            className="text-center text-gray-500 dark:text-gray-400 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No notifications to show.
          </motion.p>
        )}
      </motion.main>
    </div>
  );
}
