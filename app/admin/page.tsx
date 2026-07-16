import './style.css';

const page = () => {
  return (
    <div>
        <div className="dashboard">

            {/* Sidebar */}

            <aside className="sidebar">

                <div className="logo">
                    <h2>EVENTIX</h2>
                    <span>Admin Panel</span>
                </div>

                <nav>

                    <a className="active">Dashboard</a>
                    <a>Events</a>
                    <a>Bookings</a>
                    <a>Users</a>
                    <a>Categories</a>
                    <a>Analytics</a>
                    <a>Settings</a>

                </nav>

                <button className="logout-btn">
                    Logout
                </button>

            </aside>

            {/* Main */}

            <main className="main-content">

                <header className="topbar">

                    <input
                        type="text"
                        placeholder="Search..."
                    />

                    <div className="admin-profile">

                        <div className="notification">
                            🔔
                        </div>

                        <div className="avatar">
                            A
                        </div>

                    </div>

                </header>

                {/* Stats */}

                <section className="stats-grid">

                    <div className="card">
                        <h4>Total Events</h4>
                        <h2>128</h2>
                    </div>

                    <div className="card">
                        <h4>Total Bookings</h4>
                        <h2>3,240</h2>
                    </div>

                    <div className="card">
                        <h4>Users</h4>
                        <h2>1,842</h2>
                    </div>

                    <div className="card">
                        <h4>Revenue</h4>
                        <h2>$12,450</h2>
                    </div>

                </section>

                {/* Content */}

                <section className="content-grid">

                    <div className="large-card">

                        <h3>Recent Events</h3>

                        <table>

                            <thead>

                                <tr>

                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td>Music Festival</td>
                                    <td>12 July</td>
                                    <td><span className="success">Live</span></td>

                                </tr>

                                <tr>

                                    <td>Gaming Expo</td>
                                    <td>16 July</td>
                                    <td><span className="pending">Pending</span></td>

                                </tr>

                                <tr>

                                    <td>Tech Summit</td>
                                    <td>20 July</td>
                                    <td><span className="success">Live</span></td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                    <div className="small-card">

                        <h3>Quick Actions</h3>

                        <button>Create Event</button>

                        <button>Add Category</button>

                        <button>View Reports</button>

                    </div>

                </section>

            </main>

        </div>
    </div>
  )
}

export default page