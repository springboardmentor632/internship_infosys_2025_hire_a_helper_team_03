import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  List,
  CheckSquare,
  Mail,
  Laptop,
  Settings,
  Search,
  Bell,
  User,
  Menu,
  Home,
  PlusCircle,
  MoreHorizontal,
} from "lucide-react";

export default function MyTask() {
  const navigate = useNavigate();

  const tasks = [
    {
      title: "Fix Kitchen Sink",
      status: "Active",
      requests: 3,
      price: "$75",
      button1: "View",
      button2: "Edit",
    },
    {
      title: "Garden Cleanup",
      status: "In Progress",
      requests: 0,
      price: "$120",
      button1: "Track",
      button2: "Chat",
    },
    {
      title: "Move Furniture",
      status: "Completed",
      requests: "-",
      price: "$150",
      button1: "Review",
      button2: "Again",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[rgba(231,231,231,0.33)]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-[330px] text-white bg-[#5B86FF] flex-shrink-0">
        <div className="px-7 pt-11 pb-8">
          <h1 className="text-4xl font-bold mb-4">HireHelper</h1>
          <p className="text-xl">Welcome back , John</p>
        </div>

        <div className="w-full h-px bg-white"></div>

        <nav className="flex-1 pt-10 px-2">
          <div
            className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={24} />
            <span className="text-2xl">Dashboard</span>
          </div>
          <div
            className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4"
            onClick={() => navigate("/feedPage")}
          >
            <List size={24} />
            <span className="text-2xl">Feed</span>
          </div>
          <div
            className="px-6 py-3 mb-1 bg-white bg-opacity-40 rounded cursor-pointer flex items-center gap-4"
            onClick={() => navigate("/mytasks")}
          >
            <CheckSquare size={24} />
            <span className="text-2xl font-bold">My Tasks</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4">
            <Mail size={24} />
            <span className="text-2xl">Requests</span>
          </div>
          <div className="px-6 py-4 mb-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4">
            <Laptop size={24} />
            <span className="text-2xl">My Requests</span>
          </div>
          <div className="px-6 py-4 mt-1 hover:bg-white hover:bg-opacity-10 cursor-pointer flex items-center gap-4">
            <Settings size={24} />
            <span className="text-2xl">Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="hidden lg:flex items-center justify-between text-white px-14 py-6 bg-[#5B86FF]">
          <div className="flex-1 max-w-[548px] relative">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search.."
              className="w-full pl-14 pr-4 py-2 rounded-lg text-gray-600 text-xs focus:outline-none shadow-md"
            />
          </div>
          <div className="flex items-center gap-6 ml-12">
            <Bell size={40} />
            <User size={40} />
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden text-white p-4 shadow-lg bg-[#5B86FF] rounded-b-[30px]">
          <div className="flex items-center justify-between mb-4">
            <Menu size={28} />
            <h1 className="text-2xl font-bold">HireHelper</h1>
            <Bell size={24} />
          </div>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search.."
              className="w-full pl-12 pr-4 py-2 rounded-lg text-gray-600 focus:outline-none text-sm shadow-md"
            />
          </div>
        </header>

        {/* Tasks Section */}
        <section className="flex-1 p-4 lg:pt-8 lg:px-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">My Tasks</h2>
              <p className="text-gray-700">Manage all your posted tasks</p>
            </div>
            <button
              onClick={() => navigate("/posttask")}
              className="px-6 py-3 bg-[#2B5CE6] text-white rounded-xl font-bold hover:opacity-90"
            >
              Post New Task
            </button>
          </div>

          {/* Task Filters */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-10 mb-6 text-gray-800">
            <div className="text-center">
              <p className="font-bold text-lg">All Tasks</p>
              <p className="text-gray-600">(23)</p>
            </div>
            <div className="text-center text-[#2B5CE6]">
              <p className="font-bold text-lg">Active</p>
              <p className="text-gray-600">(5)</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">Completed</p>
              <p className="text-gray-600">(18)</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">Drafts</p>
              <p className="text-gray-600">(2)</p>
            </div>
          </div>

          {/* Task Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
            <table className="min-w-full text-center">
              <thead className="border-b">
                <tr className="text-gray-700">
                  <th className="py-4 px-2">Task Title</th>
                  <th className="py-4 px-2">Status</th>
                  <th className="py-4 px-2">Requests</th>
                  <th className="py-4 px-2">Price</th>
                  <th className="py-4 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-4 font-bold text-lg">{task.title}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          task.status === "Active"
                            ? "bg-blue-400"
                            : task.status === "In Progress"
                            ? "bg-green-400"
                            : "bg-gray-400"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>{task.requests}</td>
                    <td className="text-green-500 font-bold">{task.price}</td>
                    <td className="flex justify-center gap-3 py-3">
                      <button className="bg-[#2B5CE6] text-white px-4 py-1 rounded-lg">
                        {task.button1}
                      </button>
                      <button className="bg-gray-200 px-4 py-1 rounded-lg">
                        {task.button2}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 shadow-lg">
          <div className="flex items-center justify-around relative">
            <button className="flex flex-col items-center gap-1">
              <LayoutDashboard size={28} />
              <span className="text-xs">Dashboard</span>
            </button>

            <button
              className="flex flex-col items-center gap-1"
              onClick={() => navigate("/")}
            >
              <Home size={28} />
              <span className="text-xs">Home</span>
            </button>

            <button
              className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-[#2B5CE6]"
              onClick={() => navigate("/posttask")}
            >
              <PlusCircle size={36} className="text-white" />
            </button>

            <button className="flex flex-col items-center gap-1">
              <Mail size={28} />
              <span className="text-xs">Request</span>
            </button>

            <button className="flex flex-col items-center gap-1">
              <MoreHorizontal size={28} />
              <span className="text-xs">More</span>
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
