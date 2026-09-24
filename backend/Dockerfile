# Part 1: build your project into a single .jar file
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn -q -DskipTests package

# Part 2: run that .jar file
FROM eclipse-temurin:17-jre
COPY --from=build /app/target/*.jar /app.jar
ENTRYPOINT ["java", "-Xmx300m", "-jar", "/app.jar"]