export const validationSchema = {
    $schema: 'http://json-schema.org/draft-04/schema#',
    description: 'AppConfig POC validator',
    type: 'object',
    properties: {
        setting_1: {
            type: 'string'
        },
        setting_2: {
            type: 'number'
        }
    },
    minProperties: 2,
    required: ['setting_1', 'setting_2']
};
