FROM python:3.11-slim

# Install compilers/interpreters
RUN apt-get update && \
    apt-get install -y gcc g++ openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

# The command will be provided at runtime (see below)
