package com.project.back_end.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class TokenService {

    // Secret key for signing the token (in real apps, load from config!)
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Generate token based on user email and role
    public String generateToken(String email, String role) {
        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + 1000 * 60 * 60; // 1 hour expiration

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(expMillis))
                .signWith(key)
                .compact();
    }

    // Validate token and role
    public boolean validateToken(String token, String expectedRole) {
        try {
            String role = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("role", String.class);

            return expectedRole.equals(role);
        } catch (Exception e) {
            return false;
        }
    }

    // Get email from token
    public String getEmailFromToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
