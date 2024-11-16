package com.HotelManagement.HotelManagement.service.interfac;

import com.HotelManagement.HotelManagement.dto.LoginRequest;
import com.HotelManagement.HotelManagement.dto.Response;
import com.HotelManagement.HotelManagement.entity.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
