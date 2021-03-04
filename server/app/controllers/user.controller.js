export const allAccess = (req, res) => {
    res.status(200).send('Public Content');
};

export const userBoard = (req, res) => {
    res.status(200).send('User Content.');
};
