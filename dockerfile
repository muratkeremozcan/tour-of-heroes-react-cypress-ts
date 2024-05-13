# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /src

# Copy the current directory contents into the container at /app
COPY . /src

# Install any needed packages specified in package.json
RUN yarn install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variables
ENV CI=true
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true

# Run start and start:api when the container launches
CMD ["yarn", "dev"]