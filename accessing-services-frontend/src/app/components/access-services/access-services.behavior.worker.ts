/// <reference lib="webworker" />
import {
    ApplicationBehaviors,
    ApplicationNode,
    OptionalPromise,
    registerApplicationBehavior,
    ScriptBuilder,
    ToolControl,
    ToolControllers,
    ToolController,
    BaudRateEnum,
    ParityEnum,
    StopBitsEnum,
    SignalAnalogDomainValueEnum,
    PowerOutputEnum,
} from '@universal-robots/contribution-api';
import { AccessServicesNode } from './access-services.node';

// factory is required
const createApplicationNode = (): OptionalPromise<AccessServicesNode> => ({
    type: 'urcaps-r-us-accessing-services-access-services',    // type is required
    version: '1.0.0'     // version is required
});

// generatePreamble is optional
const generatePreambleScriptCode = (node: AccessServicesNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    return builder;
};
// Define tool controller ID constants to ensure consistency across usage
const TOOL_CONTROLLER_12V = 'accessing-services-12v';
const TOOL_CONTROLLER_24V = 'accessing-services-24v';



const behaviors: ApplicationBehaviors = {
    factory: createApplicationNode,
    generatePreamble: generatePreambleScriptCode,
    toolControllers: (node): OptionalPromise<ToolController[]> => {
        return [
            { id: TOOL_CONTROLLER_12V, name: 'URCap Tool 12V' },
            { id: TOOL_CONTROLLER_24V, name: 'URCap Tool 24V'}
        ];
    },
    toolControlInfo: (node, toolController): OptionalPromise<ToolControl> => {
        console.log('toolControlInfo called with toolController:', toolController);
        
        // 12V controller: configure tool output and digital outputs only
        if (toolController.id === TOOL_CONTROLLER_12V) {
            console.log('Configuring 12V tool controller');
            return {
                toolOutput: { 
                    dualPinPower: false,           
                    voltage: { value: 12, unit: 'V' },
                    powerOutput: {
                        'DO 0': PowerOutputEnum.SOURCING,
                        'DO 1': PowerOutputEnum.PUSH_PULL,
                    },
                },
            };
        }
        
        // 24V controller: configure tool output, digital outputs, and analog inputs
        // Note: toolCommunication is disabled because it conflicts with toolAnalogDomainMap (shared pins)
        if (toolController.id === TOOL_CONTROLLER_24V) {
            console.log('Configuring 24V tool controller with analog inputs');
            return {
                toolOutput: { 
                    dualPinPower: false,           
                    voltage: { value: 24, unit: 'V' },
                    powerOutput: {
                        'DO 0': PowerOutputEnum.SOURCING,    // DO0: Sourcing mode
                        'DO 1': PowerOutputEnum.PUSH_PULL    // DO1: Push-Pull mode
                    }
                },
                toolAnalogDomainMap: {
                    'AI 0': SignalAnalogDomainValueEnum.VOLTAGE,   // AI0: Voltage mode
                    'AI 1': SignalAnalogDomainValueEnum.CURRENT    // AI1: Current mode
                }
                // Note: toolCommunication is commented out because it conflicts with toolAnalogDomainMap (shared pins)
                // toolCommunication: {
                //     enabled: true,
                //     baudRate: BaudRateEnum.BAUD_115200,
                //     parity: ParityEnum.NONE,
                //     stopBits: StopBitsEnum.ONE,
                //     rxIdleChars: 1.5,
                //     txIdleChars: 3.5
                // }
            };
        }
    }
        
}

registerApplicationBehavior(behaviors);
