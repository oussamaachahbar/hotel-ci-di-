package com.HotelManagement.HotelManagement.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomType;
    private BigDecimal roomPrice;

    // Champ pour stocker l'image directement dans la base de données
    @Lob
    @Column(name = "room_photo", columnDefinition = "BLOB")
    private byte[] roomPhoto;

    private String roomDescription;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    // Setter pour l'image
    public void setRoomPhoto(byte[] roomPhoto) {
        this.roomPhoto = roomPhoto;
    }

    // Getter pour l'image
    public byte[] getRoomPhoto() {
        return roomPhoto;
    }

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", roomType='" + roomType + '\'' +
                ", roomPrice=" + roomPrice +
                ", roomDescription='" + roomDescription + '\'' +
                '}';
    }
}
