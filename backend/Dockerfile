FROM maven:3.9.16-eclipse-temurin-25-alpine AS build
WORKDIR /backend
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:25
WORKDIR /backend
COPY --from=build /backend/target/backend.jar ./backend.jar
ENTRYPOINT ["java", "-jar", "backend.jar"]