# Stage 1: Build the Go binary
FROM golang:1.24-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum to download dependencies first
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Run go mod tidy to ensure module consistency
RUN go mod tidy

# Build the application
# -o /app/server: output the binary to /app/server
# CGO_ENABLED=0: disable CGO to create a static binary
# GOOS=linux: specify the target OS
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./server

# Stage 2: Create the final lightweight image
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/server .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./server"]