FROM node:18-alpine

WORKDIR /app

# Install live-server for hot-reloading static site development
RUN npm install -g live-server

# Copy web files
COPY ./src /app/src

# Create a volume mount point
VOLUME /app/src

# Expose port
EXPOSE 8080

# Start live-server with hot-reloading
CMD ["live-server", "--port=8080", "--host=0.0.0.0", "--mount=/:/app/src", "--no-browser", "--watch=/app/src", "--wait=100"]