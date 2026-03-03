# Accessing Services

This project is a URCap Web Contribution example demonstrating how to access and monitor Universal Robots' Tool I/O signals in real-time.

## SDK Compatibility

This URCap is developed using **URCap SDK v0.20.19** with the following key dependencies:
- Angular 21.0.8
- Universal Robots UI Components 21.2.25
- Universal Robots Contribution API 21.2.25

## Project Structure

```
accessing_services_tool_outputs/
├── manifest.yaml                   # URCap manifest configuration
├── package.json                    # Root build scripts and tools
├── README.md
├── LICENSE
├── resources/                      # URCap resources (icons, images)
└── accessing-services-frontend/    # Angular frontend application
    ├── src/                        # Angular source code
    │   ├── app/                    # Application components
    │   ├── assets/                 # Static assets
    │   └── ...
    ├── package.json                # Frontend dependencies
    ├── angular.json                # Angular configuration
    ├── tsconfig.json               # TypeScript configuration
    └── ...
```

## Build and Deploy Sample

To build and deploy this sample, use the commands below. A rebuild of the project is required to see any changes made 
to the source code. If you are deploying the URCap to URSim, ensure that you have started the simulator.

### Dependencies

Run this command to install the dependencies of the project.

```shell
npm install
```

### Build

Run this command to build the contribution type.

```shell
npm run build
```

### Installation

Run this command to install the built URCap to the simulator.

```shell
npm run install-urcap
```

Run this command to install the built URCap to the robot.

```shell
npm run install-urcap -- --host <robot_ip_address>
```

## Further help

Get more help from the included SDK documentation.
