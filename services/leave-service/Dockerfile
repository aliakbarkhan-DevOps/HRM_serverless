FROM maven:3.8.8-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/leave-service-1.0-SNAPSHOT.jar ./leave-service.jar
EXPOSE 3005
ENV PORT=3005
CMD ["java", "-cp", "leave-service.jar", "com.hrm.leave.LocalServer"]
