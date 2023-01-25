package com.idle.imfine.service.user.Impl;

import com.idle.imfine.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        LOGGER.info("[loadUserByUsername] loadUserByUsername 수행. username : {}", username);
        return userRepository.getByUid(username);
    }

}