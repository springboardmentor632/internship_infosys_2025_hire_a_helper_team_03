import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import BottomNav from "../Components/BottomNav";
import TaskCard from "../Components/TaskCard";

export default function Feed() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([false, false, false, false, false, false]);
  const [activeNav, setActiveNav] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleFavorite = (index) => {
    const newFavorites = [...favorites];
    newFavorites[index] = !newFavorites[index];
    setFavorites(newFavorites);
  };

  const tasks = [
    {
      title: "Fix Leaky Faucet",
      category: "Plumbing",
      distance: "2.3 miles",
      time: "Today",
      rating: "4.9",
      reviews: "23",
      price: "$65",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=200&fit=crop",
    },
    {
      title: "Move Apartment",
      category: "Moving",
      distance: "3.1 miles",
      time: "This Weekend",
      rating: "4.7",
      reviews: "13",
      price: "$150",
      image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=200&fit=crop",
    },
    {
      title: "Lawn Mowing Service",
      category: "Gardening",
      distance: "1.8 miles",
      time: "Today",
      rating: "4.8",
      reviews: "31",
      price: "$45",
      image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=200&fit=crop",
    },
    {
      title: "House Cleaning",
      category: "Cleaning",
      distance: "2.7 miles",
      time: "Tomorrow",
      rating: "5.0",
      reviews: "18",
      price: "$80",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
    },
    {
      title: "Furniture Assembly",
      category: "Handyman",
      distance: "4.2 miles",
      time: "This Weekend",
      rating: "4.6",
      reviews: "27",
      price: "$55",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop",
    },
    {
      title: "Paint Living Room",
      category: "Painting",
      distance: "2.5 miles",
      time: "Today",
      rating: "4.9",
      reviews: "42",
      price: "$120",
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        navigate={navigate}
      />

      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
        <Header 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Feed Content */}
        <section className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-32 lg:pb-8">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Feed
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Find tasks that match your skills in your area
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200">
              <span className="text-sm font-medium text-gray-700">Sort By</span>
              <IoIosArrowForward size={14} className="text-gray-500 rotate-90" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200">
              <span className="text-sm font-medium text-gray-700">Categories</span>
              <IoIosArrowForward size={14} className="text-gray-500 rotate-90" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 transition-all duration-200 text-white">
              <FaFilter size={14} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>

          {/* Task List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task, index) => (
              <TaskCard 
                key={index} 
                task={task} 
                index={index} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
              />
            ))}
          </div>
        </section>

        <BottomNav navigate={navigate} />
      </main>
    </div>
  );
}