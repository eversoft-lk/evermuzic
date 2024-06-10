FROM oven/bun:latest

# Define Working Directory
WORKDIR /usr/share/app

# Copy all codes
COPY . ./

# Install dependencies
RUN bun install

# Expose Running Port
EXPOSE 3000

# Start Application
CMD ["bun", "run", "dev"]