import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ApiService from '../../service/ApiService';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const isAdmin = ApiService.isAdmin();
    
    // État pour gérer la modal et les détails de la chambre sélectionnée
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fonction pour ouvrir la modal avec les détails de la chambre sélectionnée
    const openModal = (room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    // Fonction pour fermer la modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRoom(null);
    };

    return (
        <section className="room-results">
            {roomSearchResults && roomSearchResults.length > 0 ? (
                <div className="room-list">
                    {roomSearchResults.map(room => (
                        <div key={room.id} className="room-list-item">
                            {/* Vérification de la présence de l'image */}
                            {room.roomPhoto ? (
                                <img 
                                    className='room-list-item-image' 
                                    src={`data:image/jpeg;base64,${room.roomPhoto}`} // Conversion en base64
                                    alt={room.roomType} 
                                    style={{
                                        maxWidth: '100%', // Max width pour éviter le débordement
                                        maxHeight: '200px', // Hauteur maximum pour garder l'image dans les limites
                                        objectFit: 'cover', // Garde les proportions de l'image
                                        borderRadius: '8px', // Coins arrondis pour un look élégant
                                        marginBottom: '10px',
                                        cursor: 'pointer' // Curseur pointer pour indiquer que l'image est cliquable
                                    }} 
                                    onClick={() => openModal(room)} // Ouvre la modal au clic sur l'image
                                />
                            ) : (
                                <div className="room-placeholder" style={{
                                    width: '100%', 
                                    height: '200px', 
                                    backgroundColor: '#ccc', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    borderRadius: '8px', 
                                    marginBottom: '10px'
                                }}>
                                    No Image Available
                                </div>
                            )}
                            <div className="room-details" style={{ marginBottom: '10px' }}>
                                <h3>{room.roomType}</h3>
                                <p>Price: ${room.roomPrice} / night</p>
                                <p>Description: {room.roomDescription}</p>
                            </div>

                            <div className='book-now-div'>
                                {isAdmin ? (
                                    <button
                                        className="edit-room-button"
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)} // Navigate to edit room with room ID
                                    >
                                        Edit Room
                                    </button>
                                ) : (
                                    <button
                                        className="book-now-button"
                                        onClick={() => navigate(`/room-details-book/${room.id}`)} // Navigate to book room with room ID
                                    >
                                        View/Book Now
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No rooms available.</div> // Message si aucune chambre n'est disponible
            )}

            {/* Modal pour afficher les détails de la chambre */}
            {isModalOpen && selectedRoom && (
                <div className="modal" style={modalStyle} onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{selectedRoom.roomType}</h2>
                        {selectedRoom.roomPhoto && (
                            <img 
                                src={`data:image/jpeg;base64,${selectedRoom.roomPhoto}`} 
                                alt={selectedRoom.roomType} 
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                            />
                        )}
                        <p>Price: ${selectedRoom.roomPrice} / night</p>
                        <p>Description: {selectedRoom.roomDescription}</p>
                        <button onClick={closeModal} style={{ marginTop: '10px' }}>Close</button>
                    </div>
                </div>
            )}
        </section>
    );
}

// Styles pour le modal
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

export default RoomResult;
