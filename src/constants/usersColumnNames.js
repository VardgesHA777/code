export const usersColumnNames = [
    {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
        sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',

    },
];
