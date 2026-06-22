package com.hrm.recruitment;

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
import java.util.ArrayList;
import java.util.List;

public class RecruitmentHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {

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
            if ("POST".equalsIgnoreCase(request.getHttpMethod()) && request.getPath().contains("/jobs")) {
                Map<String, Object> body = gson.fromJson(request.getBody(), Map.class);
                String sql = "INSERT INTO jobs (title, description) VALUES (?, ?) RETURNING id";
                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    pstmt.setString(1, (String) body.get("title"));
                    pstmt.setString(2, (String) body.get("description"));
                    ResultSet rs = pstmt.executeQuery();
                    if (rs.next()) {
                        Map<String, Object> resBody = new HashMap<>();
                        resBody.put("id", rs.getInt(1));
                        resBody.put("message", "Job created");
                        response.setStatusCode(201);
                        response.setBody(gson.toJson(resBody));
                    }
                }
            } else if ("GET".equalsIgnoreCase(request.getHttpMethod()) && request.getPath().contains("/jobs")) {
                String sql = "SELECT * FROM jobs";
                try (PreparedStatement pstmt = conn.prepareStatement(sql)) {
                    ResultSet rs = pstmt.executeQuery();
                    List<Map<String, Object>> jobs = new ArrayList<>();
                    while (rs.next()) {
                        Map<String, Object> job = new HashMap<>();
                        job.put("id", rs.getInt("id"));
                        job.put("title", rs.getString("title"));
                        job.put("description", rs.getString("description"));
                        job.put("status", rs.getString("status"));
                        jobs.add(job);
                    }
                    response.setStatusCode(200);
                    response.setBody(gson.toJson(jobs));
                }
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
