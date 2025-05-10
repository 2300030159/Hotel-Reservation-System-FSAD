import { useState, useEffect } from 'react';
import { User, Hotel, Settings, LogOut, Calendar, FileText, Home } from 'lucide-react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  address: "123 Main St, Anytown, USA"
};

const mockHotels = [
  { id: 1, name: "Grand Plaza Hotel", location: "New York", price: 250, image: "/api/placeholder/300/200" },
  { id: 2, name: "Ocean View Resort", location: "Miami", price: 350, image: "/api/placeholder/300/200" },
  { id: 3, name: "Mountain Retreat", location: "Denver", price: 200, image: "/api/placeholder/300/200" }
];

const mockBookings = [
  { id: 1, hotelId: 1, hotelName: "Grand Plaza Hotel", checkIn: "2025-05-15", checkOut: "2025-05-20", guests: 2, totalPrice: 1250 },
  { id: 2, hotelId: 3, hotelName: "Mountain Retreat", checkIn: "2025-06-10", checkOut: "2025-06-15", guests: 1, totalPrice: 1000 }
];

// Main App Component
export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [userData, setUserData] = useState();
  const [hotels, setHotels] = useState(mockHotels);
  const [bookings, setBookings] = useState(mockBookings);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState([]);
const navigate = useNavigate()

  // Simulate API calls with axios
  const baseURL = `${config.baseURL}`;

  useEffect(() => {
    // In a real app, we would fetch data here
    const fetchData = async () => {
      try {
        // Commented out to avoid errors since we're using mock data
        // const userResponse = await axios.get(`${baseURL}/user/profile`);
        const response = JSON.parse(localStorage.getItem("user"))
        console.log(response);

        setUserData(response);
        setEditForm(response)
        console.log(userData);

        const hotelsResponse = await axios.get(`${baseURL}/api/rooms/all`);
        console.log(hotelsResponse.data);

        setHotels(hotelsResponse.data);

        const bookingsResponse = await axios.get(`${baseURL}/api/reservations/customer`, {
          params: {
            customerName: response?.username,
          },
        });
        console.log(bookingsResponse.data);

        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(`${baseURL}/api/user/update`, editForm);

      // Update state with returned data
      const updatedUser = response.data;
      setEditForm(updatedUser);
      setUserData(updatedUser);

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  const handleBookHotel = async (hotel) => {
    try {

      const reservationData = {
        customerName: userData.username, // or user.fullName
        roomType: hotel?.bedType,
        checkInDate: "2025-05-20", // You can make these dynamic with a form
        checkOutDate: "2025-05-25",
        totalPrice: hotel?.price,
      };

      const response = await axios.post(`${baseURL}/api/reservations/add`, reservationData);

      alert(`Hotel '${hotel?.bedType}' booked successfully!`);
    } catch (error) {
      console.error("Error booking hotel:", error);
      alert("Failed to book hotel.");
    }
  };

  const handleLogout = ()=>{
    localStorage.clear()
    navigate("/")
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-blue-800 text-white p-4">
        <div className="text-2xl font-bold mb-10 flex items-center">
          <Hotel className="mr-2" />
          <span>Hotel Booking</span>
        </div>

        <nav>
          <SidebarItem
            icon={<Home />}
            label="Dashboard"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <SidebarItem
            icon={<Hotel />}
            label="Book Hotel"
            active={activeTab === 'book'}
            onClick={() => setActiveTab('book')}
          />
          <SidebarItem
            icon={<Calendar />}
            label="My Bookings"
            active={activeTab === 'bookings'}
            onClick={() => setActiveTab('bookings')}
          />
          <SidebarItem
            icon={<User />}
            label="Profile"
            active={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
          <SidebarItem
            icon={<Settings />}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
          <SidebarItem
            icon={<LogOut />}
            label="Logout"
            active={false}
            onClick={() => handleLogout()}
          />
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow p-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === 'home' && 'Dashboard'}
            {activeTab === 'book' && 'Book a Hotel'}
            {activeTab === 'bookings' && 'My Bookings'}
            {activeTab === 'profile' && 'My Profile'}
            {activeTab === 'settings' && 'Settings'}
          </h1>
        </header>

        <main className="p-6">
          {/* Dashboard Home */}
          {activeTab === 'home' && (
            <div>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, {userData?.username}!</h2>
                <p className="text-gray-600">Manage your hotel reservations and profile information from this dashboard.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                  title="My Bookings"
                  value={bookings.length}
                  icon={<Calendar className="text-blue-500" />}
                  onClick={() => setActiveTab('bookings')}
                />
                <DashboardCard
                  title="Available Hotels"
                  value={hotels.length}
                  icon={<Hotel className="text-green-500" />}
                  onClick={() => setActiveTab('book')}
                />
                <DashboardCard
                  title="Profile Completion"
                  value="100%"
                  icon={<User className="text-purple-500" />}
                  onClick={() => setActiveTab('profile')}
                />
              </div>
            </div>
          )}

          {/* Book Hotel */}
          {activeTab === 'book' && (
            <div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search hotels..."
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map(hotel => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{hotel?.bedType}</h3>
                      <p className="text-gray-600 mb-2">
                        <span className="flex items-center">
                          <FileText size={16} className="mr-1" />
                          {hotel.location}
                        </span>
                      </p>
                      <p className="text-lg font-bold text-blue-600 mb-4">${hotel.price} / night</p>
                      <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        onClick={() => handleBookHotel(hotel)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Bookings */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Hotel</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-out</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings && bookings.length > 0 ? (
                    bookings.map(booking => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{booking.customerName}</td>
                        <td className="py-3 px-4">{booking.checkInDate}</td>
                        <td className="py-3 px-4">{booking.checkOutDate}</td>
                        <td className="py-3 px-4">${booking.totalPrice}</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-500">No bookings available.</td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4">
                    {userData?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{userData?.username}</h2>
                    <p className="text-gray-600">Member since 2024</p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField label="Full Name" value={userData?.username} />
                  <ProfileField label="Email" value={userData?.email} />
                  <ProfileField label="Phone" value={userData?.phoneNumber} />
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={editForm?.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={editForm?.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone</label>
                      <input
                        type="text"
                        value={editForm?.phoneNumber}
                        onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Password</label>
                      <input
                        type="password"
                        value={editForm?.password}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 mr-3"
                      onClick={() => {
                        setEditForm({ ...userData });
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <NotificationSetting label="Email notifications" defaultChecked={true} />
                  <NotificationSetting label="SMS notifications" defaultChecked={false} />
                  <NotificationSetting label="Promotional emails" defaultChecked={true} />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Security</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-3">
                  Change Password
                </button>
                <button className="block text-blue-600 hover:underline">
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Reusable Components
function SidebarItem({ icon, label, active, onClick }) {
  return (
    <div
      className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-700' : 'hover:bg-blue-700'
        }`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </div>
  );
}

function DashboardCard({ title, value, icon, onClick }) {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
      <p className="text-lg">{value}</p>
    </div>
  );
}

function NotificationSetting({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <div
        className={`w-12 h-6 rounded-full p-1 cursor-pointer ${checked ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        onClick={() => setChecked(!checked)}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'
            }`}
        />
      </div>
    </div>
  );
}