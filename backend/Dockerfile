# Imagen base con JDK 21 compatible con Spring Boot 3.5
FROM eclipse-temurin:21-jdk

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar todo el backend al contenedor
COPY . .

# Dar permisos al Maven Wrapper
RUN chmod +x mvnw

# Compilar el proyecto y generar el .jar
RUN ./mvnw clean package -DskipTests

# Exponer el puerto (Spring Boot usa 8080)
EXPOSE 8080

# Arrancar la aplicación
CMD ["java", "-jar", "target/emprende-ia-backend-0.0.1-SNAPSHOT.jar"]
