import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './AdminDashboard.css';
import LoadingScreen from '../Loading/LoadingPage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // 1. Import AuthContext

const AdminDashboard = () => {
    const { logout } = useAuth(); // 2. Get the logout function from Context
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users');
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch users", err);
                if (err.response?.status === 403) {
                    setError("Access Denied: You are not an Admin.");
                } else {
                    setError("Could not load user list.");
                }
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to remove this user?")) {
            try {
                await axiosPrivate.delete(`/users`, { data: { id: userId } });
                setUsers(users.filter(user => user._id !== userId));
                alert("User deleted successfully!");
            } catch (err) {
                console.error("Failed to delete user", err);
                if (err.response?.status === 403) {
                    alert("Access Denied: You don't have permission to delete users.");
                } else if (err.response?.status === 404) {
                    alert("User not found.");
                } else {
                    alert("Failed to delete user. Please try again.");
                }
            }
        }
    };

    const handleLogout = async () => {
        // 3. Use the Context logout (clears State + calls Backend)
        await logout(); 
        navigate('/login');
    };

    // Filter logic
    const filteredUsers = users.filter(user => 
        user._id.includes(searchId) || 
        user.firstname.toLowerCase().includes(searchId.toLowerCase()) ||
        user.email.toLowerCase().includes(searchId.toLowerCase())
    );

    if (loading) return <LoadingScreen />;

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Manage {users.length} registered users</p>
                </div>
                <button 
                    className="logout-btn" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>

            <div className="admin-controls">
                <input 
                    type="text" 
                    placeholder="Search by Name, Email or ID..." 
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="admin-search"
                />
            </div>

            {error && <div className="error-msg">{error}</div>}

            <div className="table-wrapper">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email / Phone</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => {
                                const isAdmin = user.roles?.Admin === 5150;
                                
                                return (
                                    <tr key={user._id}>
                                        <td className="id-col" title={user._id}>
                                            {user._id.substring(0, 8)}...
                                        </td>
                                        <td>{user.firstname} {user.lastname}</td>
                                        <td>
                                            <div style={{ fontSize: '0.9rem' }}>{user.email}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>
                                                {user.phoneNumber}
                                            </div>
                                        </td>
                                        <td>
                                            {isAdmin ? (
                                                <span className="badge badge-admin">Admin</span>
                                            ) : (
                                                <span className="badge badge-user">User</span>
                                            )}
                                        </td>
                                        <td>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(user._id)}
                                                disabled={isAdmin} 
                                                style={isAdmin ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="5" className="no-results">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;