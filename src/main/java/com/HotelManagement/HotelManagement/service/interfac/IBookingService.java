package com.HotelManagement.HotelManagement.service.interfac;

import com.HotelManagement.HotelManagement.dto.Response;
import com.HotelManagement.HotelManagement.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}
