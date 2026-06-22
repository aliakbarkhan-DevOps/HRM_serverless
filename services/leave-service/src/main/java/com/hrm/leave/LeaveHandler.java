package com.hrm.leave;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.google.gson.Gson;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

public class LeaveHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

    private final Gson gson = new Gson();

    private Connection getConnection() throws Exception {
        String dbHost = System.getenv().getOrDefault("DB_HOST", "localhost");
        String dbName = System.getenv().getOrDefault("DB_NAME", "hrm_db");
        String dbUser = System.getenv().getOrDefault("DB_USER", "hrm_user");
        String dbPassword = System.getenv().getOrDefault("DB_PASSWORD", "hrm_password");
        String url = "jdbc:postgresql://" + dbHost + ":5432/" + dbName;
        return DriverManager.getConnection(url, dbUser, dbPassword);
    }

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent request, Context context) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        response.setHeaders(headers);

        try (Connection conn = getConnection()) {
            if ("POST".equalsIgnoreCase(request.getHttpMethod()) && request.getPath().contains("/leave")) {
                Map<String, Object> body = gson.fromJson(request.getBody(), Map.class);
                String sql = "INSERT INTO leave_requests (employee_id, start_date, end_date, reason) VALUES (?, ?::date, ?::date, ?) RETURNING id";
                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    pstmt.setDouble(1, (Double) body.get("employee_id"));
                    pstmt.setString(2, (String) body.get("start_date"));
                    pstmt.setString(3, (String) body.get("end_date"));
                    pstmt.setString(4, (String) body.get("reason"));
                    
                    ResultSet rs = pstmt.executeQuery();
                    if (rs.next()) {
                        Map<String, Object> resBody = new HashMap<>();
                        resBody.put("id", rs.getInt(1));
                        resBody.put("message", "Leave requested successfully");
                        response.setStatusCode(201);
                        response.setBody(gson.toJson(resBody));
                    }
                }
            } else if ("GET".equalsIgnoreCase(request.getHttpMethod()) && request.getPath().contains("/leave")) {
                // simple health check / return empty list for brevity
                response.setStatusCode(200);
                response.setBody("{\"status\": \"Leave service is up\"}");
            } else {
                response.setStatusCode(404);
                response.setBody("{\"error\": \"Not Found\"}");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setBody("{\"error\": \"" + e.getMessage() + "\"}");
        }
        return response;
    }
}
