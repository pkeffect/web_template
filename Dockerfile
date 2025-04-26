# Use the official Python 3.12 image based on Alpine Linux
FROM python:3.12-alpine

WORKDIR /app

# 1. Update pip (comes pre-installed with the Python base image)
RUN python -m pip install --upgrade pip

# 2. Install Node.js and npm using Alpine's package manager (apk)
#    Then install live-server globally using npm
#    Using --no-cache avoids the need for cleaning up apk cache separately
RUN apk add --no-cache nodejs npm && \
    npm install -g live-server

# 3. Copy the requirements file *before* the rest of the app code
#    Leverages Docker's layer caching.
COPY requirements.txt .

# 4. Install Python dependencies specified in requirements.txt
#    Using --no-cache-dir reduces image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy web files (now after dependencies are installed)
COPY ./src /app/src

# Create a volume mount point (optional, but good for development)
VOLUME /app/src

# Expose port
EXPOSE 8080

# Start live-server with hot-reloading
# Note: --mount=/:/app/src tells live-server to serve files from /app/src at the root URL path (/)
CMD ["live-server", "--port=8080", "--host=0.0.0.0", "--mount=/:/app/src", "--no-browser", "--watch=/app/src", "--wait=100"]