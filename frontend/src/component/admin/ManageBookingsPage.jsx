import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []); // Cette useEffect se lance au premier rendu pour récupérer les données des réservations

    useEffect(() => {
        filterBookings(searchTerm); // Le deuxième useEffect va filtrer les réservations à chaque changement de 'searchTerm' ou 'bookings'
    }, [searchTerm, bookings, filterBookings]);  // Ajout de 'filterBookings' ici

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1); // Réinitialiser la page courante à 1 après chaque recherche
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Mettre à jour le terme de recherche à chaque frappe de l'utilisateur
    };

    // Calculer l'index de la première et de la dernière réservation sur la page courante
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking); // Paginer les réservations

    const paginate = (pageNumber) => setCurrentPage(pageNumber); // Mettre à jour la page courante

    return (
        <div className='bookings-container'>
            <h2>All Bookings</h2>
            <div className='search-div'>
                <label>Filter by Booking Number:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter booking number"
                />
            </div>

            <div className="booking-results">
                {currentBookings.map((booking) => (
                    <div key={booking.id} className="booking-result-item">
                        <p><strong>Booking Code:</strong> {booking.bookingConfirmationCode}</p>
                        <p><strong>Check In Date:</strong> {booking.checkInDate}</p>
                        <p><strong>Check out Date:</strong> {booking.checkOutDate}</p>
                        <p><strong>Total Guests:</strong> {booking.totalNumOfGuest}</p>
                        <button
                            className="edit-room-button"
                            onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                        >Manage Booking</button>
                    </div>
                ))}
            </div>

            <Pagination
                roomsPerPage={bookingsPerPage}
                totalRooms={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageBookingsPage;
