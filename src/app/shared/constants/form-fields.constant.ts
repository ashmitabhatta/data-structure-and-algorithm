export type AttributeKeys = keyof typeof ATTRIBUTES_CONSTANT;

export const ATTRIBUTES_CONSTANT = {
    username: {
        key: 'username',
        label: 'Username',
        placeholder: 'Enter username',
        type: 'text',
        value: null,
        maxLength: 50,
    },
    password: {
        key: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        type: 'text',
        value: null,
        maxLength: 50,
    },
}