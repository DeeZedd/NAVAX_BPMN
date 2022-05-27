import nxContextPadProvider from './nxContextPadProvider';
import nxElementFactory from './nxElementFactory';
import nxOrderingProvider from './nxOrderingProvider';
import nxPalette from './nxPalette';
import nxRenderer from './nxRenderer';
import nxRules from './nxRules';
import nxUpdater from './nxUpdater';

export default {
    __init__: [
        'contextPadProvider',
        'customOrderingProvider',
        'customRenderer',
        'customRules',
        'customUpdater',
        'paletteProvider'
    ],
    contextPadProvider: [ 'type', nxContextPadProvider ],
    customOrderingProvider: [ 'type', nxOrderingProvider ],
    customRenderer: [ 'type', nxRenderer ],
    customRules: [ 'type', nxRules ],
    customUpdater: [ 'type', nxUpdater ],
    elementFactory: [ 'type', nxElementFactory ],
    paletteProvider: [ 'type', nxPalette ]
};