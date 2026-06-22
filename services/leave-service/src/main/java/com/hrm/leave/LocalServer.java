package com.hrm.leave;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class LocalServer {
    public static void main(String[] args) throws Exception {
        int port = Integer.parseInt(System.getenv().getOrDefault("PORT", "8080"));
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        LeaveHandler handler = new LeaveHandler();

        server.createContext("/", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                InputStream is = exchange.getRequestBody();
                String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);

                APIGatewayProxyRequestEvent requestEvent = new APIGatewayProxyRequestEvent();
                requestEvent.setHttpMethod(exchange.getRequestMethod());
                requestEvent.setPath(exchange.getRequestURI().getPath());
                requestEvent.setBody(body);

                Map<String, String> headers = new HashMap<>();
                exchange.getRequestHeaders().forEach((k, v) -> {
                    if (v != null && !v.isEmpty()) {
                        headers.put(k, v.get(0));
                    }
                });
                requestEvent.setHeaders(headers);

                APIGatewayProxyResponseEvent responseEvent = handler.handleRequest(requestEvent, null);

                if (responseEvent.getHeaders() != null) {
                    responseEvent.getHeaders().forEach((k, v) -> exchange.getResponseHeaders().set(k, v));
                }
                
                byte[] responseBytes = responseEvent.getBody() != null ? 
                    responseEvent.getBody().getBytes(StandardCharsets.UTF_8) : new byte[0];
                
                int statusCode = responseEvent.getStatusCode() != null ? responseEvent.getStatusCode() : 200;
                exchange.sendResponseHeaders(statusCode, responseBytes.length);

                OutputStream os = exchange.getResponseBody();
                os.write(responseBytes);
                os.close();
            }
        });

        System.out.println("Java local server started on port " + port);
        server.start();
    }
}
