export default class nxPalette {
    constructor (create, elementFactory, palette, translate) {
        this.create = create;
        this.elementFactory = elementFactory;
        this.translate = translate;

        palette.registerProvider(this);
    }

    getPaletteEntries(element) {
        console.log('getEntries: ', element);
        
        const {
            create,
            elementFactory,
            translate
        } = this;

        function createStatus(event) {
            const shape = elementFactory.createShape({type: 'nx:Status'});

            create.start(event, shape);
        }
        
        function createActivity(event) {
            const shape = elementFactory.createShape({type: 'nx:Activity'});

            create.start(event, shape);
        }
        
        function createDecision(event) {
            const shape = elementFactory.createShape({type: 'nx:Decision'});

            create.start(event, shape);
        }

        function createStart(event) {
            const shape = elementFactory.createShape({type: 'nx:Start', width: 50, height: 50});

            create.start(event, shape);
        }

        function createCheck(event) {
            const shape = elementFactory.createShape({type: 'nx:Check'});

            create.start(event, shape);
        }

        function createConnector(event) {
            const shape = elementFactory.createConnection({type: 'nx:Connector'});

            create.start(event, shape);
        }

        function createDiscarded(event) {
            const shape = elementFactory.createShape({type: 'nx:Discarded'});

            create.start(event, shape);
        }
        function createDeclined(event) {
            const shape = elementFactory.createShape({type: 'nx:Declined'});

            create.start(event, shape);
        }
        function createClosed(event) {
            const shape = elementFactory.createShape({type: 'nx:Closed'});

            create.start(event, shape);
        }

        return {
            'nx-separator': {
                group: 'navax',
                separator: true
            },
            'create.start': {
                group: 'navax',
                className: 'bpmn-icon-start-event-none',
                title: translate('Create Start'),
                action: {
                    dragstart: createStart,
                    click: createStart
                }
            },
            'create.status': {
                group: 'navax',
                className: 'bpmn-icon-task',
                title: translate('Create Status'),
                action: {
                    dragstart: createStatus,
                    click: createStatus
                }
            },
            'create.activity': {
                group: 'navax',
                className: 'bpmn-icon-gateway-none',
                title: translate('Create Activity'),
                action: {
                    dragstart: createActivity,
                    click: createActivity
                }
            },
            'create.decision': {
                group: 'navax',
                className: 'bpmn-icon-gateway-complex',
                title: translate('Create Decision'),
                action: {
                    dragstart: createDecision,
                    click: createDecision
                }
            },
            'create.check': {
                group: 'navax',
                className: 'bpmn-icon-lane',
                title: translate('Create Check'),
                action: {
                    dragstart: createCheck,
                    click: createCheck
                }
            },
            'create.connector': {
                group: 'navax',
                className: 'bpmn-icon-connection',
                title: translate('Create Connector'),
                action: {
                    dragstart: createConnector,
                    click: createConnector
                }
            },
            'create.discarded': {
                group: 'navax',
                className: 'bpmn-icon-end-event-cancel',
                title: translate('Create Discarded'),
                action: {
                    dragstart: createDiscarded,
                    click: createDiscarded
                }
            },
            'create.declined': {
                group: 'navax',
                className: 'bpmn-icon-end-event-error',
                title: translate('Create Declined'),
                action: {
                    dragstart: createDeclined,
                    click: createDeclined
                }
            },
            'create.closed': {
                group: 'navax',
                className: 'bpmn-icon-end-event-none',
                title: translate('Create Closed'),
                action: {
                    dragstart: createClosed,
                    click: createClosed
                }
            }
        }
    }
}

nxPalette.$inject = [
    'create',
    'elementFactory',
    'palette',
    'translate'
];