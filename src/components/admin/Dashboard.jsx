import { useState, useEffect } from 'react';
import { User, Hotel, Settings, LogOut, Calendar, FileText, Home, Plus, DollarSign, Users, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

// Main App Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [adminData, setAdminData] = useState();
  const [userData,setUserData] = useState()
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [newHotel, setNewHotel] = useState({
    roomType: '',
    roomNumber: '',
    bedType: '',
    price: '',
    availability: 'Available',
    location: ''
  });
  const [editingHotel, setEditingHotel] = useState(null);
  const navigate = useNavigate();

  // Simulate API calls with axios
  const baseURL = `${config.baseURL}`;

  useEffect(() => {
    // In a real app, we would fetch data here
    const fetchData = async () => {
      try {
        const response = JSON.parse(localStorage.getItem("user"));
        setAdminData(response);
        fetchUsers();
        fetchHotels();
        fetchBookings();
        fetchPayments();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


 const fetchUsers = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/user/all`);
    const customers = response.data.filter(user => user.role === "CUSTOMER");
    setUserData(customers);
  } catch (error) {
    console.log(error);
  }
};


  const fetchHotels = async () => {
    try {
      const hotelsResponse = await axios.get(`${baseURL}/api/rooms/all`);
      setHotels(hotelsResponse.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookingsResponse = await axios.get(`${baseURL}/api/reservations/all`);
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      // Assuming there's an API endpoint for payments
      const paymentsResponse = await axios.get(`${baseURL}/api/payments/all`);
      setPayments(paymentsResponse.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      // Mock data for demonstration
      setPayments([
        { id: 1, bookingId: 1, customerName: "John Doe", amount: 1250, status: "Paid", date: "2025-05-12" },
        { id: 2, bookingId: 2, customerName: "Jane Smith", amount: 1000, status: "Pending", date: "2025-05-11" }
      ]);
    }
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/rooms/add`, newHotel);
      
      // Clear form and refresh hotel list
      setNewHotel({
        roomType: '',
        roomNumber: '',
        bedType: '',
        price: '',
        availability: 'Available',
        location: ''
      });
      
      fetchHotels();
      alert("Hotel room added successfully!");
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Failed to add hotel room.");
    }
  };

  const handleUpdateHotel = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/api/rooms/update`, editingHotel);
      
      // Clear editing state and refresh hotel list
      setEditingHotel(null);
      fetchHotels();
      alert("Hotel room updated successfully!");
    } catch (error) {
      console.error("Error updating hotel:", error);
      alert("Failed to update hotel room.");
    }
  };

  const handleDeleteHotel = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel room?")) {
      try {
        await axios.delete(`${baseURL}/api/rooms/delete/${id}`);
        fetchHotels();
        alert("Hotel room deleted successfully!");
      } catch (error) {
        console.error("Error deleting hotel:", error);
        alert("Failed to delete hotel room.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-indigo-900 text-white p-4">
        <div className="text-2xl font-bold mb-10 flex items-center">
          <Hotel className="mr-2" />
          <span>Admin Dashboard</span>
        </div>

        <nav>
          <SidebarItem
            icon={<Home />}
            label="Dashboard"
            active={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <SidebarItem
            icon={<Plus />}
            label="Add Hotel"
            active={activeTab === 'add-hotel'}
            onClick={() => setActiveTab('add-hotel')}
          />
          <SidebarItem
            icon={<Hotel />}
            label="All Hotels"
            active={activeTab === 'hotels'}
            onClick={() => setActiveTab('hotels')}
          />
          <SidebarItem
            icon={<Calendar />}
            label="All Bookings"
            active={activeTab === 'bookings'}
            onClick={() => setActiveTab('bookings')}
          />
          <SidebarItem
            icon={<DollarSign />}
            label="Payments"
            active={activeTab === 'payments'}
            onClick={() => setActiveTab('payments')}
          />
          <SidebarItem
            icon={<Users />}
            label="Users"
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
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
            {activeTab === 'home' && 'Admin Dashboard'}
            {activeTab === 'add-hotel' && 'Add New Hotel Room'}
            {activeTab === 'hotels' && 'All Hotel Rooms'}
            {activeTab === 'bookings' && 'All Bookings'}
            {activeTab === 'payments' && 'Payment Management'}
            {activeTab === 'users' && 'User Management'}
            {activeTab === 'settings' && 'Admin Settings'}
          </h1>
        </header>

        <main className="p-6">
          {/* Dashboard Home */}
          {activeTab === 'home' && (
            <div>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Welcome, Admin {adminData?.username || "Administrator"}!</h2>
                <p className="text-gray-600">Manage hotel rooms, bookings, payments and users from this dashboard.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <DashboardCard
                  title="Total Hotels"
                  value={hotels.length}
                  icon={<Hotel className="text-indigo-500" />}
                  onClick={() => setActiveTab('hotels')}
                />
                <DashboardCard
                  title="Total Bookings"
                  value={bookings.length}
                  icon={<Calendar className="text-blue-500" />}
                  onClick={() => setActiveTab('bookings')}
                />
                <DashboardCard
                  title="Payments"
                  value={`$${payments.reduce((sum, payment) => sum + (payment.amount || 0), 0)}`}
                  icon={<DollarSign className="text-green-500" />}
                  onClick={() => setActiveTab('payments')}
                />
                <DashboardCard
                  title="Total Users"
                  value={userData.length}
                  icon={<Users className="text-purple-500" />}
                  onClick={() => setActiveTab('users')}
                />
              </div>
            </div>
          )}

          {/* Add Hotel */}
          {activeTab === 'add-hotel' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Add New Hotel Room</h2>
              
              <form onSubmit={handleAddHotel}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Room Type</label>
                    <input
                      type="text"
                      value={newHotel.roomType}
                      onChange={(e) => setNewHotel({ ...newHotel, roomType: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Room Number</label>
                    <input
                      type="text"
                      value={newHotel.roomNumber}
                      onChange={(e) => setNewHotel({ ...newHotel, roomNumber: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Bed Type</label>
                    <input
                      type="text"
                      value={newHotel.bedType}
                      onChange={(e) => setNewHotel({ ...newHotel, bedType: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Price per Night</label>
                    <input
                      type="text"
                      value={newHotel.price}
                      onChange={(e) => setNewHotel({ ...newHotel, price: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={newHotel.location}
                      onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Availability</label>
                    <select
                      value={newHotel.availability}
                      onChange={(e) => setNewHotel({ ...newHotel, availability: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="Available">Available</option>
                      <option value="Booked">Booked</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Add Hotel Room
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* All Hotels */}
          {activeTab === 'hotels' && (
            <div>
              {editingHotel ? (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Edit Hotel Room</h2>
                    <button 
                      onClick={() => setEditingHotel(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <form onSubmit={handleUpdateHotel}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Room Type</label>
                        <input
                          type="text"
                          value={editingHotel.roomType}
                          onChange={(e) => setEditingHotel({ ...editingHotel, roomType: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Room Number</label>
                        <input
                          type="text"
                          value={editingHotel.roomNumber}
                          onChange={(e) => setEditingHotel({ ...editingHotel, roomNumber: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Bed Type</label>
                        <input
                          type="text"
                          value={editingHotel.bedType}
                          onChange={(e) => setEditingHotel({ ...editingHotel, bedType: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Price per Night</label>
                        <input
                          type="text"
                          value={editingHotel.price}
                          onChange={(e) => setEditingHotel({ ...editingHotel, price: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={editingHotel.location}
                          onChange={(e) => setEditingHotel({ ...editingHotel, location: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Availability</label>
                        <select
                          value={editingHotel.availability}
                          onChange={(e) => setEditingHotel({ ...editingHotel, availability: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        >
                          <option value="Available">Available</option>
                          <option value="Booked">Booked</option>
                          <option value="Maintenance">Maintenance</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Update Hotel Room
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">All Hotel Rooms</h2>
                  <button 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
                    onClick={() => setActiveTab('add-hotel')}
                  >
                    <Plus size={18} className="mr-1" /> Add New
                  </button>
                </div>
                <table className="min-w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Room Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Room #</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Bed Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotels && hotels.length > 0 ? (
                      hotels.map(hotel => (
                        <tr key={hotel.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{hotel.roomType}</td>
                          <td className="py-3 px-4">{hotel.roomNumber}</td>
                          <td className="py-3 px-4">{hotel.bedType}</td>
                          <td className="py-3 px-4">${hotel.price}</td>
                          <td className="py-3 px-4">{hotel.location}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              hotel.availability === 'Available' ? 'bg-green-100 text-green-800' :
                              hotel.availability === 'Booked' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {hotel.availability}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => setEditingHotel(hotel)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteHotel(hotel.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4 text-gray-500">No hotel rooms available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* All Bookings */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-lg font-semibold">All Bookings</h2>
              </div>
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Room Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-in</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Check-out</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings && bookings.length > 0 ? (
                    bookings.map(booking => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{booking.id}</td>
                        <td className="py-3 px-4">{booking.customerName}</td>
                        <td className="py-3 px-4">{booking.roomType}</td>
                        <td className="py-3 px-4">{booking.checkInDate}</td>
                        <td className="py-3 px-4">{booking.checkOutDate}</td>
                        <td className="py-3 px-4">${booking.totalPrice}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-gray-500">No bookings available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Payments */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-lg font-semibold">Payment Management</h2>
              </div>
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Booking ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments && payments.length > 0 ? (
                    payments.map(payment => (
                      <tr key={payment.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{payment.id}</td>
                        <td className="py-3 px-4">{payment.bookingId}</td>
                        <td className="py-3 px-4">{payment.customerName}</td>
                        <td className="py-3 px-4">${payment.amount}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">No payments available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Management */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-lg font-semibold">User Management</h2>
              </div>
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Username</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map(user => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user.id}</td>
                      <td className="py-3 px-4">{user.username}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.phone}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Edit size={18} />
                          </button>
                          {user.role !== 'Admin' && (
                            <button className="text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Admin Settings</h2>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Admin Username</label>
                    <input
                      type="text"
                      value={adminData?.username || "admin"}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={adminData?.email || "admin@hotel.com"}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Change Password
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                    Update Profile
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">System Settings</h3>
                <div className="space-y-3">
                  <NotificationSetting label="Email notifications for new bookings" defaultChecked={true} />
                  <NotificationSetting label="SMS alerts for payment issues" defaultChecked={false} />
                  <NotificationSetting label="Daily booking reports" defaultChecked={true} />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Security</h3>
                <div className="space-y-3">
                  <NotificationSetting label="Two-factor authentication" defaultChecked={true} />
                  <NotificationSetting label="Login activity notifications" defaultChecked={true} />
                </div>
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
      className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-indigo-800' : 'hover:bg-indigo-800'
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

function NotificationSetting({ label, defaultChecked }) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{label}</span>
      <div
        className={`w-12 h-6 rounded-full p-1 cursor-pointer ${checked ? 'bg-indigo-600' : 'bg-gray-300'
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