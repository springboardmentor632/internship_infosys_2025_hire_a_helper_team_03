import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  Menu,
  Bell,
  User,
  Home,
  PlusCircle,
  MoreHorizontal,
  LayoutDashboard,
  List,
  CheckSquare,
  Mail,
  Laptop,
  Settings,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

export default function Feed() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

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
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&h=300&fit=crop",
    },
    {
      title: "Move Apartment",
      category: "Moving",
      distance: "3.1 miles",
      time: "This Weekend",
      rating: "4.7",
      reviews: "13",
      price: "$150",
      image:
        "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=300&fit=crop",
    },
    {
      title: "Lawn Mowing Service",
      category: "Gardening",
      distance: "1.8 miles",
      time: "Today",
      rating: "4.8",
      reviews: "31",
      price: "$45",
      image:
        "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=300&fit=crop",
    },
    {
      title: "House Cleaning",
      category: "Cleaning",
      distance: "2.7 miles",
      time: "Tomorrow",
      rating: "5.0",
      reviews: "18",
      price: "$80",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=300&fit=crop",
    },
    {
      title: "Furniture Assembly",
      category: "Handyman",
      distance: "4.2 miles",
      time: "This Weekend",
      rating: "4.6",
      reviews: "27",
      price: "$55",
      image:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=300&fit=crop",
    },
    {
      title: "Paint Living Room",
      category: "Painting",
      distance: "2.5 miles",
      time: "Today",
      rating: "4.9",
      reviews: "42",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=300&fit=crop",
    },
  ];

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen"
      style={{ backgroundColor: "rgba(231, 231, 231, 0.33)" }}
    >
      {/* Sidebar - Desktop */}
      <aside
        className="hidden lg:flex flex-col w-[330px] text-white flex-shrink-0"
        style={{ backgroundColor: "#5B86FF" }}
      >
        <div className="px-7 pt-11 pb-8">
          <h1 className="text-4xl font-bold leading-[44px] mb-4">HireHelper</h1>
          <p className="text-xl font-normal">Welcome back , John</p>
        </div>

        <div
          className="w-full h-px"
          style={{ backgroundColor: "#FFFFFF" }}
        ></div>

        <nav className="flex-1 pt-10 px-2">
          <div
            className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 transition cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <div className="flex items-center gap-4">
              <LayoutDashboard size={24} strokeWidth={2} />
              <span className="text-2xl font-normal leading-7">Dashboard</span>
            </div>
          </div>

          <div
            className="px-6 py-3 mb-1"
            style={{
              backgroundColor: "rgba(251, 251, 251, 0.4)",
              borderRadius: "4px",
            }}
            onClick={() => navigate("/feedPage")}
          >
            <div className="flex items-center gap-4">
              <List size={20} strokeWidth={2.5} />
              <span className="text-2xl font-bold leading-7">Feed</span>
            </div>
          </div>

          <div
            className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 transition cursor-pointer"
            onClick={() => navigate("/mytasks")}
          >
            <div className="flex items-center gap-4">
              <CheckSquare size={20} strokeWidth={2} />
              <span className="text-2xl font-normal leading-7">My Tasks</span>
            </div>
          </div>

          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <Mail size={18} strokeWidth={2} />
              <span className="text-2xl font-normal leading-7">Requests</span>
            </div>
          </div>

          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <Laptop size={24} strokeWidth={2} />
              <span className="text-2xl font-normal leading-7">
                My Requests
              </span>
            </div>
          </div>

          <div className="px-6 py-4 mt-1 hover:bg-white hover:bg-opacity-10 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <Settings size={24} strokeWidth={2} />
              <span className="text-2xl font-normal leading-7">Settings</span>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar - Desktop */}
        <header
          className="hidden lg:flex items-center justify-between text-white px-14 py-6 h-[85px]"
          style={{ backgroundColor: "#5B86FF", borderRadius: "" }}
        >
          <div className="flex-1 max-w-[548px]">
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search.."
                className="w-full pl-14 pr-4 py-2 rounded-lg text-gray-600 text-xs focus:outline-none shadow-md"
              />
            </div>
          </div>
          <div className="flex items-center gap-6 ml-12">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
              <Bell size={40} />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
              <User size={40} />
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header
          className="lg:hidden text-white p-4 shadow-lg"
          style={{ backgroundColor: "#5B86FF", borderRadius: "0 0 30px 30px" }}
        >
          <div className="flex items-center justify-between mb-4">
            <button className="p-2">
              <Menu size={28} />
            </button>
            <h1 className="text-2xl font-bold">HireHelper</h1>
            <button className="p-2">
              <Bell size={24} />
            </button>
          </div>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search.."
              className="w-full pl-12 pr-4 py-2 rounded-lg text-gray-600 focus:outline-none text-sm shadow-md"
            />
          </div>
        </header>

        {/* Feed Content */}
        <section className="flex-1 p-4 lg:p-0 lg:pt-8 lg:px-12 overflow-y-auto pb-24 lg:pb-8">
          {/* Page Title */}
          <div className="mb-6 lg:mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-2">
              Task Feed
            </h2>
            <p className="text-sm lg:text-base font-normal text-black">
              Find tasks that match your skills in your area
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col lg:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search tasks..."
              className="flex-1 px-6 py-3 font-medium text-xl lg:text-2xl rounded-3xl focus:outline-none"
              style={{
                backgroundColor: "#E7E7E7",
                color: "rgba(0, 0, 0, 0.72)",
              }}
            />
            <select
              className="px-6 py-3 font-medium text-xl lg:text-2xl text-black rounded-3xl focus:outline-none appearance-none cursor-pointer"
              style={{ backgroundColor: "#E7E7E7" }}
            >
              <option>All Categories</option>
              <option>Home Repairs</option>
              <option>Moving & Delivery</option>
              <option>Gardening</option>
              <option>Cleaning</option>
              <option>Handyman</option>
            </select>
            <button
              className="flex items-center justify-center gap-3 px-8 py-3 text-white font-medium rounded-3xl transition hover:opacity-90"
              style={{ backgroundColor: "#2B5CE6" }}
            >
              <Filter size={27} strokeWidth={3} />
              <span className="text-xl lg:text-2xl">Filters</span>
            </button>
          </div>

          {/* Task List */}
          <div className="space-y-5">
            {tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white shadow-lg overflow-hidden"
                style={{ borderRadius: "31px" }}
              >
                <div className="flex flex-col md:flex-row gap-4 p-5">
                  {/* Task Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={task.image}
                      alt={task.title}
                      className="w-full md:w-36 h-44 object-cover rounded-2xl"
                    />
                  </div>

                  {/* Task Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-medium text-black mb-2">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block px-4 py-1 text-white text-base lg:text-xl font-medium rounded-full"
                            style={{
                              backgroundColor: "rgba(243, 172, 71, 0.99)",
                            }}
                          >
                            {task.category}
                          </span>
                          <span
                            className="inline-block px-3 py-1 text-black text-sm font-normal rounded"
                            style={{
                              backgroundColor: "rgba(43, 230, 87, 0.52)",
                            }}
                          >
                            {task.price}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(index)}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition hover:opacity-80 flex-shrink-0"
                        style={{
                          backgroundColor: "#FFDCDB",
                          border: "1px solid #E51C1C",
                        }}
                      >
                        <Heart
                          size={20}
                          fill={favorites[index] ? "#FF0D0D" : "none"}
                          style={{ color: "#FF0D0D" }}
                        />
                      </button>
                    </div>

                    {/* Location and Time */}
                    <div
                      className="flex flex-col gap-1 text-sm lg:text-base mb-3"
                      style={{ color: "rgba(0, 0, 0, 0.72)" }}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-gray-700" />
                        <span className="font-normal">{task.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 pl-7">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.61)" }}
                        ></span>
                        <span className="font-normal">{task.time}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      <Star
                        size={17}
                        className="text-yellow-400"
                        fill="#facc15"
                      />
                      <span
                        className="text-sm lg:text-base font-normal"
                        style={{ color: "rgba(0, 0, 0, 0.72)" }}
                      >
                        {task.rating} ({task.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-5 pb-5">
                  <button
                    className="w-full py-3 text-white font-bold text-base rounded-3xl transition hover:opacity-90"
                    style={{ backgroundColor: "#2B5CE6" }}
                  >
                    Request Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile Bottom Navigation */}
        <nav
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 shadow-lg"
          style={{ borderColor: "#E0E0E0" }}
        >
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1">
              <LayoutDashboard
                size={28}
                style={{ color: "rgba(0, 0, 0, 0.47)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(0, 0, 0, 0.47)" }}
              >
                Dashboard
              </span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <Home size={28} style={{ color: "rgba(0, 0, 0, 0.47)" }} />
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(0, 0, 0, 0.47)" }}
              >
                Home
              </span>
            </button>

            <button
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition hover:opacity-90"
              style={{ backgroundColor: "#2B5CE6" }}
            >
              <PlusCircle size={36} className="text-white" />
            </button>

            <button className="flex flex-col items-center gap-1">
              <Mail size={28} style={{ color: "rgba(0, 0, 0, 0.47)" }} />
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(0, 0, 0, 0.47)" }}
              >
                Request
              </span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <MoreHorizontal
                size={28}
                style={{ color: "rgba(0, 0, 0, 0.47)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: "rgba(0, 0, 0, 0.47)" }}
              >
                More
              </span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
