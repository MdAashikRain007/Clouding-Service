package com.Ak.CloudService.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Base64;
import java.util.Collections;

@Component
@RequiredArgsConstructor
public class ClerkJwtAuthFilter extends OncePerRequestFilter {

    @Value("${clerk.issuer}")
    private String clerkIssuer;

    private final ClerkJwksProvider clerkJwksProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        System.out.println("REQUEST URI: " + request.getRequestURI());

        if(request.getRequestURI().contains("/webhooks") ||
                request.getRequestURI().contains("/public") ||
                request.getRequestURI().contains("/download")) {

            filterChain.doFilter(request,response);
            return;
        }

        String authHeader = request.getHeader("Authorization");
        System.out.println("AUTH HEADER: " + authHeader);

        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN,"Authorization header missing");
            return;
        }

        try {

            String token = authHeader.substring(7);

            String[] chunk = token.split("\\.");
            if(chunk.length < 3) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN,"Invalid JWT format");
                return;
            }

            String headerJson = new String(Base64.getUrlDecoder().decode(chunk[0]));
            ObjectMapper mapper = new ObjectMapper();
            JsonNode headerNode = mapper.readTree(headerJson);

            String kid = headerNode.get("kid").asText();

            PublicKey publicKey = clerkJwksProvider.getPublicKey(kid);

            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(publicKey)
                    .requireIssuer(clerkIssuer)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            System.out.println("TOKEN ISSUER: " + claims.getIssuer());
            System.out.println("EXPECTED ISSUER: " + clerkIssuer);

            String clerkId = claims.getSubject();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            clerkId,
                            null,
                            Collections.emptyList()
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request,response);

        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_FORBIDDEN,"Invalid JWT token: "+e.getMessage());
        }
    }
}