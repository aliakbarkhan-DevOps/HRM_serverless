FROM maven:3.8.8-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/recruitment-service-1.0-SNAPSHOT.jar ./recruitment-service.jar
EXPOSE 3006
ENV PORT=3006
CMD ["java", "-cp", "recruitment-service.jar", "com.hrm.recruitment.LocalServer"]
